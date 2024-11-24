import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('public_place', 254).notNullable()
      table.string('number', 6).notNullable()
      table.string('neighborhood', 49).notNullable()
      table.string('city', 49).notNullable()
      table.string('state', 49).notNullable()
      table.string('complement', 254).nullable()
      table.string('zip_code', 14).notNullable()

      table
        .string('customer_id')
        .unsigned()
        .references('customers.id')
        .onDelete('CASCADE')
        .notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
