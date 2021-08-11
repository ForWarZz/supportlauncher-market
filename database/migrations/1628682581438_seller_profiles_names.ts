import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SellerProfiles extends BaseSchema {
  protected tableName = 'seller_profiles'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('custom_name', 200).nullable()
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumns('custom_name')
    })
  }
}
