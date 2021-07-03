import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BasesController {
  public async home({ view }: HttpContextContract) {
    return view.render('pages/home')
  }
}
