import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'MyServicesController.home').as('home')
  Route.post('/description', 'MyServicesController.updateBio').as('update-bio')
})
  .as('my-services')
  .prefix('/mes-services')
  .middleware(['auth', 'permission:seller_canSell'])
