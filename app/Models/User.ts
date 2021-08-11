import { DateTime } from 'luxon'
import { column, BaseModel, manyToMany, ManyToMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Permission, { PermsType } from './Permission'
import SellerProfile from './SellerProfile'

export default class User extends BaseModel {
  /**
   * User ID
   */
  @column({ isPrimary: true })
  public id: string

  /**
   * User username (private, at look the getter below)
   */
  @column({ columnName: 'username' })
  private _username: string

  /**
   * User username
   * Will return the username depend on if the user is a seller
   * and if he has a custom name
   */
  public get username(): string {
    if (this.sellerProfile && this.sellerProfile.customName) {
      return this.sellerProfile.customName
    } else {
      return this._username
    }
  }

  public set username(username: string) {
    this._username = username
  }

  /**
   * User email
   */
  @column()
  public email: string

  /**
   * User avatar
   */
  @column()
  public avatar: string

  /**
   * Datetime of the last time the user logged-in.
   */
  @column.dateTime({ autoCreate: true })
  public lastLogin: DateTime

  /**
   * Datetime of the account creation
   */
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  /**
   * If the user is banned from the platform
   */
  @column()
  public banned: boolean

  /**
   * Datetime of the last account update
   *
   * _Warning_:
   * Since the `lastLogin` is updated every time the user login,
   * this value will be updated too. Take this information into account when operating.
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * User's roles relation
   */
  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @hasOne(() => SellerProfile)
  public sellerProfile: HasOne<typeof SellerProfile>

  /**
   * User's permissions relation
   */
  public async hasPermission(name: PermsType) {
    const perm = await Permission.query()
      .where('slug', name)
      .andWhereHas('roles', (roleQuery) => {
        roleQuery.where('active', true).andWhereHas('users', (userQuery) => {
          userQuery.where('id', this.id)
        })
      })
      .first()
    return perm !== null
  }

  public async hasRole(name: string) {
    const role = await Role.query()
      .whereHas('users', (query) => {
        query.where('id', this.id)
      })
      .andWhere('active', true)
      .andWhere('slug', name)
      .first()

    return role !== null
  }
}
