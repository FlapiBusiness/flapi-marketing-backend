import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Messages extends BaseSchema {
  protected tableName = 'messages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('sender_id').unsigned().notNullable() 
      table.integer('receiver_id').unsigned().notNullable() 
      table.text('content').notNullable() 
      table.timestamp('timestamp', { useTz: true }).defaultTo(this.now()) 
      table.enu('status', ['envoyé', 'lu']).defaultTo('envoyé') 

      table.foreign('sender_id').references('id').inTable('users').onDelete('CASCADE') 
      table.foreign('receiver_id').references('id').inTable('users').onDelete('CASCADE') 
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
