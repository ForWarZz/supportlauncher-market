import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PermsType } from 'App/Models/Permission'

export default class CheckPermission {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    permission: string[]
  ) {
    /**
     * Check if user is logged-in or not. If yes, then `ctx.auth.user` will be
     * set to the instance of the currently logged in user.
     */
    if (auth.user) {
      let state = false
      for (const p of permission) {
        state = await auth.user.hasPermission(p.replace('_', ':') as PermsType)
        if (!state) break
      }

      if (state) {
        return await next()
      }
    }

    return response.redirect().back()
  }
}
