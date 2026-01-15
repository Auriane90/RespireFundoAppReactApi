import type { HttpContext } from '@adonisjs/core/http'
import Sugestao from '#models/sugestao'

export default class SugestaosController {
    // LISTAR TODAS AS SUGESTÕES
  async index() {
    return Sugestao.all()
  }

  // BUSCAR UMA SUGESTÃO
  async show({ params }: HttpContext) {
    return Sugestao.findOrFail(params.id)
  }

  // CRIAR SUGESTÃO
  async store({ request, response }: HttpContext) {
    const dados = request.only(['pergunta', 'resposta'])

    const sugestao = await Sugestao.create(dados)

    return response.created(sugestao)
  }

  // ATUALIZAR SUGESTÃO
  async update({ params, request }: HttpContext) {
    const sugestao = await Sugestao.findOrFail(params.id)

    const dados = request.only(['pergunta', 'resposta'])

    sugestao.merge(dados)
    await sugestao.save()

    return sugestao
  }

  // DELETAR SUGESTÃO
  async destroy({ params, response }: HttpContext) {
    const sugestao = await Sugestao.findOrFail(params.id)
    await sugestao.delete()

    return response.ok({ message: 'Sugestão removida com sucesso' })
  }
}