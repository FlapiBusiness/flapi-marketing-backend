import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary().unique()
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.text('message').notNullable()
      table.enu('status', ['lu', 'non-lu']).defaultTo('non-lu')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
