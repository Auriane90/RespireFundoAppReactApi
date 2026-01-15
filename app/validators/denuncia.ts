import vine from '@vinejs/vine'

export const denunciaValidator = vine.compile(
  vine.object({
    titulo: vine.string().minLength(3),
    image: vine.string().optional(),
    descricao: vine.string().minLength(5),
  })
)