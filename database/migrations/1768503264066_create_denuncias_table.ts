import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'denuncias'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('titulo', 255).notNullable()

      table.text('descricao').notNullable()

      table.string('imagem_url', 500).nullable()

      table.string('localizacao_texto', 255).nullable()

      table.decimal('latitude', 10, 7).nullable()
      table.decimal('longitude', 10, 7).nullable()

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE')

      table
        .enu('status_moderacao', ['pendente', 'aprovado', 'resolvido'])
        .defaultTo('pendente')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}