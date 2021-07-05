import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/link-stripe', 'SellersController.linkStripe').as('linkStripe')
  Route.get('/stripe-callback', 'SellersController.stripeCallback').as('stripeCallback')
  Route.get('/unlink-stripe', 'SellersController.unlinkStripe').as('unlinkStripe')
})
  .as('seller')
  .prefix('seller')
  .middleware(['auth', 'role:seller'])
