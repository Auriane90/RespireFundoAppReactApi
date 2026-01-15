import type { HttpContext } from '@adonisjs/core/http'
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
    const dados = request.only(['titulo', 'image', 'descricao'])

    const denuncia = await Denuncia.create(dados)

    return response.created(denuncia)
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