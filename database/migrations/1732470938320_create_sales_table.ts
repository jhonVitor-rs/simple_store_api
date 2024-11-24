import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sales'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('amount').notNullable()
      table.float('unit_price').notNullable()
      table.float('total_price').notNullable()

      table
        .integer('customer_id')
        .unsigned()
        .references('customers.id')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('product_id')
        .unsigned()
        .references('products.id')
        .onDelete('CASCADE')
        .notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
