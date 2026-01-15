import type { HttpContext } from '@adonisjs/core/http'
import Evento from '#models/evento'
import app from '@adonisjs/core/services/app'

export default class EventosController {
  // LISTAR TODOS
  async index() {
    return Evento.all()
  }

  // BUSCAR POR ID
  async show({ params }: HttpContext) {
    return Evento.findOrFail(params.id)
  }

  // CRIAR
  async store({ request, response }: HttpContext) {
    const titulo = request.input('titulo')
    const descricao = request.input('descricao')

    const image = request.file('image', {
      size: '5mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp'],
    })

    let imagePath: string | null = null

    if (image) {
      const fileName = `${Date.now()}.${image.extname}`

      await image.move(app.makePath('uploads/eventos'), {
        name: fileName,
      })

      imagePath = `uploads/eventos/${fileName}`
    }

    const evento = await Evento.create({
      titulo,
      descricao,
      image: imagePath,
    })

    return response.created(evento)
  }

  // ATUALIZAR
  async update({ params, request }: HttpContext) {
    const evento = await Evento.findOrFail(params.id)

    const dados = request.only(['titulo', 'image', 'descricao'])

    evento.merge(dados)
    await evento.save()

    return evento
  }

  // DELETAR
  async destroy({ params, response }: HttpContext) {
    const evento = await Evento.findOrFail(params.id)
    await evento.delete()

    return response.ok({ message: 'Evento removido com sucesso' })
  }
}