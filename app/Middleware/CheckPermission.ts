import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PermsType } from 'App/Models/Permission'

export default class CheckPermission {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    permissions: string[]
  ) {
    if (auth.user) {
      let state = false
      for (const p of permissions) {
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
