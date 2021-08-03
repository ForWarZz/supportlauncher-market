import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/authenticate', 'AuthController.redirect').as('redirect')
  Route.get('/discord/callback', 'AuthController.callback').as('callback')
  Route.get('/deconnexion', 'AuthController.logout').as('logout').middleware(['auth'])
}).as('auth')
