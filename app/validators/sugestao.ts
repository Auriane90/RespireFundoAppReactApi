import vine from '@vinejs/vine'

export const sugestaoValidator = vine.compile(
  vine.object({
    titulo: vine.string().minLength(3),
    descricao: vine.string().minLength(5),
  })
)
