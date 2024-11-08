import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateChatsTable extends BaseSchema {
  protected tableName = 'chats'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() 
      table.integer('user_id').unsigned().nullable() 
      table.integer('admin_id').unsigned().nullable() 
      table.timestamp('started_at').notNullable() 
      table.enum('status', ['ouverte', 'fermée']).defaultTo('ouverte') 
      table.timestamp('updated_at').nullable() 

      table.foreign('user_id').references('id').inTable('users').onDelete('SET NULL') 
      table.foreign('admin_id').references('id').inTable('users').onDelete('SET NULL') 
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
