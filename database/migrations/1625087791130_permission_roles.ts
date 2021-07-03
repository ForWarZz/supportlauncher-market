import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PermissionRoles extends BaseSchema {
  protected tableName = 'permission_role'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('role_id').notNullable().unsigned()
      table.integer('permission_id').notNullable().unsigned()

      table.foreign('role_id').references('id').inTable('roles').onDelete('cascade')
      table.foreign('permission_id').references('id').inTable('permissions').onDelete('cascade')

      table.unique(['role_id', 'permission_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
