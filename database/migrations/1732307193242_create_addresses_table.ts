import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('public_place', 255).notNullable()
      table.string('number', 7).notNullable()
      table.string('neighborhood', 50).notNullable()
      table.string('city', 50).notNullable()
      table.string('state', 50).notNullable()
      table.string('complement', 255).nullable()
      table.string('zip_code', 15).notNullable()

      table
        .integer('customer_id')
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
