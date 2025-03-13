import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Messages extends BaseSchema {
  protected tableName = 'messages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary().unique()
      table.integer('sender_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('receiver_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.text('content').notNullable()
      table.timestamp('timestamp', { useTz: true }).defaultTo(this.now())
      table.enu('status', ['envoyé', 'lu']).defaultTo('envoyé')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
