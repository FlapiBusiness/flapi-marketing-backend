import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'payments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary().unique()
      table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('subscription_id').notNullable().references('id').inTable('subscriptions').onDelete('CASCADE')
      table.string('payment_method')
      table.decimal('amount', 12, 2).notNullable()
      table.timestamp('payment_date').notNullable()
      table.enu('status', ['succeeded', 'failed', 'pending']).defaultTo('pending')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
