import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    const tableExists = await this.schema.hasTable(this.tableName)

    if (!tableExists) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('id').notNullable().primary().unique()
        table.string('full_name').nullable()
        table.string('email', 254).notNullable().unique()
        table.string('password').notNullable()
        table.timestamp('created_at').notNullable().defaultTo(this.now())
        table.timestamp('updated_at').nullable()

        table.integer('role_id').nullable().references('id').inTable('roles').onDelete('SET NULL')
      })
    }
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
