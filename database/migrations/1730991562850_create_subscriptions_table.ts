import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'subscriptions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') 
      table.string('name').notNullable() 
      table.decimal('price', 10, 2).notNullable() 
      table.integer('duration').notNullable() 
      table.text('description').nullable() 

      // Timestamps automatiques pour created_at et updated_at
      table.timestamp('created_at').notNullable().defaultTo(this.now()) 
      table.timestamp('updated_at').nullable().defaultTo(this.now()) 
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
