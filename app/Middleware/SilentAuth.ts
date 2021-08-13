import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * Silent auth middleware can be used as a global middleware to silent check
 * if the user is logged-in or not.
 *
 * The request continues as usual, even when the user is not logged-in.
 */
export default class SilentAuthMiddleware {
  /**
   * Handle request
   */
  public async handle(
    { auth, view, response, route }: HttpContextContract,
    next: () => Promise<void>
  ) {
    /**
     * Check if user is logged-in or not. If yes, then `ctx.auth.user` will be
     * set to the instance of the currently logged in user.
     */
    await auth.check()
    if (auth.isLoggedIn) {
      await auth.user!.load('sellerProfile')
      if (auth.user!.banned && route?.name !== 'auth.logout') {
        return response.ok(await view.render('errors/banned'))
      }
    }
    return await next()
  }
}
