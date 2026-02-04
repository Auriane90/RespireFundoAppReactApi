import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'interacao_evento_usuarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table
        .integer('evento_id')
        .unsigned()
        .references('id')
        .inTable('eventos')
        .onDelete('CASCADE')

      table.boolean('favorito').defaultTo(false)
      table.boolean('notificacao_ativa').defaultTo(false)

      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}