/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')

router.get('/', async () => {
  return { hello: 'Bienvenue sur FlapiCMS' }
})

router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
    router
      .get('admin', async () => {
        return { hello: 'Bienvenue sur la page Admin' }
      })
      .use(middleware.auth())
    router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix('user')
