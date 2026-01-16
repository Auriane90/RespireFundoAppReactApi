import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import Denuncia from '#models/denuncia'

export default class DenunciasController {
  // LISTAR TODAS AS DENÚNCIAS
  async index() {
    return Denuncia.all()
  }

  // BUSCAR UMA DENÚNCIA
  async show({ params }: HttpContext) {
    return Denuncia.findOrFail(params.id)
  }

  // CRIAR DENÚNCIA
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

      await image.move(app.makePath('uploads/denuncias'), {
        name: fileName,
      })

      imagePath = `uploads/denuncias/${fileName}`
    }

    const evento = await Denuncia.create({
      titulo,
      descricao,
      image: imagePath,
    })

    return response.created(evento)
  }

  // ATUALIZAR DENÚNCIA
  async update({ params, request }: HttpContext) {
    const denuncia = await Denuncia.findOrFail(params.id)

    const dados = request.only(['titulo', 'image', 'descricao'])

    denuncia.merge(dados)
    await denuncia.save()

    return denuncia
  }

  // DELETAR DENÚNCIA
  async destroy({ params, response }: HttpContext) {
    const denuncia = await Denuncia.findOrFail(params.id)
    await denuncia.delete()

    return response.ok({ message: 'Denúncia removida com sucesso' })
  }
}