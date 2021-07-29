import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { SellerStatus } from 'App/Models/SellerProfile'

export default class SellerProfiles extends BaseSchema {
  protected tableName = 'seller_profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .string('user_id', 24)
        .references('id')
        .inTable('users')
        .onDelete('cascade')
        .notNullable()
      table
        .enum('status', ['available', 'unavailable', 'vacation'] as SellerStatus[])
        .notNullable()
        .defaultTo('available')
      table.text('bio').nullable()
      table.string('stripe_account_id').nullable().unique()
      table.boolean('certified').defaultTo(false).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
