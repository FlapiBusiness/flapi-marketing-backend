import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'invoices'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('payment_id').unsigned().references('id').inTable('payments').onDelete('CASCADE')
      table.timestamp('invoice_date').notNullable()
      table.decimal('total_amount', 12, 2).notNullable()
      table.enu('status', ['paid', 'pending', 'cancelled']).defaultTo('pending')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
