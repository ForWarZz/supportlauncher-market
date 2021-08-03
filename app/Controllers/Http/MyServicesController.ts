import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import SellerProfile from 'App/Models/SellerProfile'

export default class MyServicesController {
  public async home({ view, auth }: HttpContextContract) {
    await auth.user!.load('sellerProfile')
    return view.render('pages/my-services/home')
  }
  public async updateBio({ request, response, auth }: HttpContextContract) {
    const data = await request.validate({
      schema: schema.create({
        content: schema.string.optional(
          {
            escape: true,
            trim: true,
          },
          [rules.maxLength(4000)]
        ),
      }),
    })

    console.log(data.content)

    let content
    if (data.content !== undefined && data.content.length > 0) {
      content = data.content
    } else {
      content = null
    }

    await SellerProfile.query().where('user_id', auth.user!.id).update({
      bio: content,
    })

    return response.redirect().toRoute('my-services.home')
  }
}
