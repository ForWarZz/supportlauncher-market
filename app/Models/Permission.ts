import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'

export type PermsType =
  // ADMIN
  | 'admin:accessPanel'
  // Admin: users CRUD
  | 'admin:addUser'
  | 'admin:viewUser'
  | 'admin:updateUser'
  | 'admin:deleteUser'
  // Admin: roles CRUD
  | 'admin:addRole'
  | 'admin:viewRole'
  | 'admin:updateRole'
  | 'admin:deleteRole'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public slug: PermsType

  @column()
  public description: string

  @column()
  public active: boolean

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>
}
