import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class BasesController {
  public async home({ view }: HttpContextContract) {
    return view.render('pages/home')
  }

  public async sellers({ view, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const search = request.input('search')

    let sellersQuery = User.query()
      .preload('sellerProfile')
      .whereNot('banned', true)
      .has('sellerProfile')
      .whereHas('roles', (roleQuery) => {
        roleQuery.where('slug', 'seller')
      })

    if (search) {
      sellersQuery = sellersQuery.where('username', 'like', `%${search}%`)
    }

    const sellers = await sellersQuery.paginate(page, 20)

    return view.render('pages/sellers', {
      sellers,
    })
  }
}
