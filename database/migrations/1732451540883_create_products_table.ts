import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 100).notNullable()
      table.string('description', 255).nullable()
      table.string('image_url', 255).nullable()
      table.string('sku', 50).unique().notNullable()
      table.float('price').notNullable()
      table.integer('amount').notNullable()
      table.boolean('is_deleted').defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
