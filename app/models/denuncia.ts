import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Denuncia extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare titulo: string

  @column()
  declare descricao: string

  @column({ columnName: 'imagem_url' })
  declare imagemUrl: string | null

  @column({ columnName: 'localizacao_texto' })
  declare localizacaoTexto: string | null

  @column()
  declare latitude: number | null

  @column()
  declare longitude: number | null

  @column({ columnName: 'usuario_id' })
  declare userId: number

  @column()
  declare status_moderacao: 'pendente' | 'aprovado' | 'resolvido'

  // 🔗 Relacionamento
  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}