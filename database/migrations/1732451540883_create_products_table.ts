import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name', 99).notNullable()
      table.string('description', 254).nullable()
      table.string('image_url', 254).nullable()
      table.string('sku', 49).unique().notNullable()
      table.float('price').notNullable()
      table.integer('amount').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
