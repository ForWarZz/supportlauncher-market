import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserRoles extends BaseSchema {
  protected tableName = 'role_user'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('role_id').notNullable().unsigned()
      table.string('user_id').notNullable()

      table.foreign('role_id').references('id').inTable('roles').onDelete('cascade')
      table.foreign('user_id').references('id').inTable('users').onDelete('cascade')

      table.unique(['role_id', 'user_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
