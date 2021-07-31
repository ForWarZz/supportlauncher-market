import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MyServicesController {
  public async home({ view, auth }: HttpContextContract) {
    await auth.user!.load('sellerProfile')
    return view.render('pages/my-services/home')
  }
}
