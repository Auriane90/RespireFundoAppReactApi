import router from '@adonisjs/core/services/router'
import EventosController from '#controllers/eventos_controller'
import DenunciasController from '#controllers/denuncias_controller'
import SugestaosController from '#controllers/sugestaos_controller'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import fs from 'fs'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('eventos', EventosController).apiOnly()

router.get('/uploads/*', async ({ request, response }: HttpContext) => {
  const filePath = request.params()['*'].join('/')
  const absolutePath = app.makePath('uploads', filePath)

  if (fs.existsSync(absolutePath)) {
    return response.download(absolutePath)
  }

  return response.notFound()
})

router.resource('denuncias', DenunciasController).apiOnly()

router.resource('sugestoes', SugestaosController).apiOnly()