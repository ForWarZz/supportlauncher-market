import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async profile({ view }: HttpContextContract) {
    return view.render('pages/user/profile')
  }
}
