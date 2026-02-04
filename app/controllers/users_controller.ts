import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {
  async index() {
    return User.query().select('id', 'name', 'email', 'admin', 'created_at')
  }

  async show({ params }: HttpContext) {
    return User.query()
      .where('id', params.id)
      .select('id', 'name', 'email', 'admin', 'created_at')
      .firstOrFail()
  }

  async store({ request, response }: HttpContext) {
    const dados = request.only(['name', 'email', 'password', 'admin'])

    const user = await User.create({
      name: dados.name,
      email: dados.email,
      password: await hash.make(dados.password),
      admin: dados.admin ?? false,
    })

    return response.created({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: 1,
    })
  }

  async update({ params, request }: HttpContext) {
    const user = await User.findOrFail(params.id)

    const dados = request.only(['name', 'email', 'password', 'admin'])

    if (dados.password) {
      dados.password = await hash.make(dados.password)
    }

    user.merge(dados)
    await user.save()

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    }
  }

  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()

    return response.ok({ message: 'Usuário removido com sucesso' })
  }


  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findByOrFail('email', email)

    await hash.verify(user.password, password)

    const token = Buffer.from(`${email}:${password}`).toString('base64')

    return response.ok({
      token,
      type: 'Basic',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
      },
    })
  }



}