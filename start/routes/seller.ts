import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/link-stripe', 'SellersController.linkStripe').as('linkStripe')
  Route.get('/stripe-callback', 'SellersController.stripeCallback').as('stripeCallback')

  Route.group(() => {
    Route.post('/update-status', 'SellersController.updateStatus').as('update-status')
    Route.get('/unlink-stripe', 'SellersController.unlinkStripe').as('unlinkStripe')

    Route.post('/update-username', 'SellersController.updateUsername').as('update-username')
    Route.get('/reset-username', 'SellersController.resetUsername').as('reset-username')
  }).middleware(['permission:seller_canSell'])
})
  .as('seller')
  .prefix('seller')
  .middleware(['auth'])
