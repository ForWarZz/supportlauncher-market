import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Permission from './Permission'
import User from './User'

export type RoleType = 'superadmin' | 'admin' | 'vendeur' | string

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public slug: string

  @column()
  public description: string

  @column()
  public active: boolean

  @column()
  public editable: boolean

  /**
   * Number is inverted: the lower the value is, the more important it is
   */
  @column()
  public level: number

  @manyToMany(() => User, {
    relatedKey: 'id',
  })
  public users: ManyToMany<typeof User>

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>
}
