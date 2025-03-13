import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateChatsTable extends BaseSchema {
  protected tableName = 'chats'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary().unique()
      table.integer('user_id').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.integer('admin_id').nullable()
      table.timestamp('started_at').notNullable()
      table.enum('status', ['ouverte', 'fermée']).defaultTo('ouverte')
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
