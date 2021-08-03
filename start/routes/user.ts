import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/profil', 'UsersController.profile').as('profile')
})
  .as('user')
  .middleware(['auth'])
