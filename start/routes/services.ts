import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'MyServicesController.home').as('home')
})
  .as('my-services')
  .prefix('/mes-services')
  .middleware(['auth', 'permission:seller_canSell'])
