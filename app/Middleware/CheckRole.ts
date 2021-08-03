import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Role {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    roles: string[]
  ) {
    if (auth.user) {
      let state = false
      for (const r of roles) {
        state = await auth.user.hasRole(r)
        if (!state) break
      }
      if (state) {
        return await next()
      }
    }
    return response.redirect().back()
  }
}
