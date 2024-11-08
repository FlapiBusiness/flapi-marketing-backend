import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_subscriptions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') 
      table.integer('user_id').unsigned().notNullable()
      table.integer('subscription_id').unsigned().notNullable() 
      table.date('start_date').notNullable() 
      table.date('end_date').notNullable() 
      table.timestamp('created_at').notNullable().defaultTo(this.now()) 
      table.timestamp('updated_at').nullable().defaultTo(this.now()) 

      table.foreign('user_id').references('users.id').onDelete('CASCADE') 
      table.foreign('subscription_id').references('subscriptions.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
