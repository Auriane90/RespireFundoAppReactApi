import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Evento from './evento.js'

export default class InteracaoEventoUsuario extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'user_id' })
  declare userId: number

  @column({ columnName: 'evento_id' })
  declare eventoId: number

  @column()
  declare favorito: boolean

  @column({ columnName: 'notificacao_ativa' })
  declare notificacaoAtiva: boolean

  // Relacionamentos
  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Evento, {
    foreignKey: 'eventoId',
  })
  declare evento: BelongsTo<typeof Evento>
}