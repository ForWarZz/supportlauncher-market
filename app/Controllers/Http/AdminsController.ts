import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AdminsController {
  public async home({ view }: HttpContextContract) {
    // Fetch users count
    const usersCount = await User.query().count('*', 'total').first()
    const sellersCount = await User.query()
      .whereHas('roles', (query) => query.where('slug', 'seller'))
      .count('*', 'total')
      .first()

    return view.render('pages/admin/home', {
      usersCount: usersCount ? usersCount.$extras.total : 'error',
      sellersCount: sellersCount ? sellersCount.$extras.total : 'error',
      commandsCount: 0,
    })
  }

  public async users({ view, request, logger }: HttpContextContract) {
    const page = request.input('page', 1)
    const search = request.input('search', null)

    try {
      let usersQuery = User.query().preload('roles', (role) => {
        role.select('name')
      })

      if (search) {
        usersQuery = usersQuery
          .where('username', 'like', `%${search}%`)
          .orWhere('email', 'like', `%${search}%`)
      }
      const users = await usersQuery.paginate(page, 20)

      users.baseUrl(request.url())
      if (search) {
        users.queryString({
          search,
        })
      }

      return view.render('pages/admin/users', {
        users,
      })
    } catch (error) {
      logger.error(error)
      return view.render('pages/admin/users', {
        users: null,
      })
    }
  }

  public async deleteUser({ response, auth, request, logger }: HttpContextContract) {
    const userId = request.input('id', null)

    if (!userId || userId === auth.user!.id) {
      return response.redirect().back()
    }

    try {
      const user = await User.find(userId)

      if (user) {
        await user.delete()
      }
    } catch (error) {
      logger.error(error)
    }
    return response.redirect().back()
  }

  public async userInfo({ view, params }: HttpContextContract) {
    const user = await User.find(params.id)

    if (user) {
      return view.render('pages/admin/user_info', {
        user,
      })
    } else {
      return view.render('errors/not_found.edge')
    }
  }
}
