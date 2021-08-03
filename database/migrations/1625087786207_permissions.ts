import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Permissions extends BaseSchema {
  protected tableName = 'permissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique()
      table.string('slug').unique().notNullable()
      table.text('description').nullable()
      table.boolean('active').defaultTo(false).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
