import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Roles extends BaseSchema {
  protected tableName = 'roles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique()
      table.string('name').notNullable()
      table.string('slug').unique().notNullable()
      table.text('description').nullable()
      table.boolean('active').defaultTo(false).notNullable()
      table.integer('level').defaultTo(99).notNullable()
      table.boolean('editable').defaultTo(true).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
