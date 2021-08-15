import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

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
          .where('username', 'ilike', `%${search}%`)
          .orWhere('email', 'ilike', `%${search}%`)
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

  public async userInfo({ view, params, auth }: HttpContextContract) {
    const user = await User.find(params.id)

    if (user) {
      await user.load('sellerProfile')
      await user.load('roles', (roleQuery) => {
        roleQuery.orderBy('level', 'asc').orderBy('name', 'asc')
      })

      let roleQuery = Role.query()
        .select('id', 'name', 'slug', 'active', 'level')
        .whereDoesntHave('users', (query) => query.where('id', user.id))
        .orderBy('level', 'asc')
        .orderBy('name', 'asc')

      if (await auth.user!.hasRole('superadmin')) {
        roleQuery = roleQuery.where('level', '>', '0')
      } else {
        roleQuery = roleQuery.where('level', '>', '1')
      }

      const allRoles = await roleQuery

      return view.render('pages/admin/user_info', {
        user,
        allRoles,
      })
    } else {
      return view.render('errors/not_found.edge')
    }
  }

  public async addRole({ params, request, logger, response }: HttpContextContract) {
    const user = await User.find(params.id)

    if (!user) {
      return response.redirect().toRoute('admin.userInfo', {
        id: params.id,
      })
    }

    const data = await request.validate({
      schema: schema.create({
        role: schema.string({}, [
          rules.required(),
          rules.exists({
            column: 'slug',
            table: 'roles',
          }),
        ]),
      }),
    })

    const role = await Role.findBy('slug', data.role)

    if (!role) {
      return response.redirect().back()
    }

    try {
      await user.related('roles').attach([role.id])

      if (role.slug === 'seller') {
        await user.related('sellerProfile').firstOrCreate({})
      }
    } catch (error) {
      logger.error(error)
    }

    return response.redirect().toRoute('admin.userInfo', {
      id: params.id,
    })
  }

  public async deleteRole({ params, logger, response }: HttpContextContract) {
    const user = await User.find(params.id)
    const role = await Role.findBy('slug', params.role)

    if (
      !user ||
      !role ||
      role.slug === 'superadmin' ||
      (role.slug === 'admin' && !(await user.hasRole('superadmin')))
    ) {
      return response.redirect().toRoute('admin.userInfo', {
        id: params.id,
      })
    }

    try {
      await user.related('roles').detach([role.id])

      if (role.slug === 'seller') {
        await user.related('sellerProfile').query().delete()
      }
    } catch (error) {
      logger.error(error)
    }

    return response.redirect().toRoute('admin.userInfo', {
      id: params.id,
    })
  }

  public async banUser({ params, logger, response }: HttpContextContract) {
    const user = await User.find(params.id)

    if (!user) {
      return response.redirect().toRoute('admin.userInfo', {
        id: params.id,
      })
    }

    try {
      await User.query().where('id', user.id).update({
        banned: true,
      })
    } catch (error) {
      logger.error(error)
    }

    return response.redirect().toRoute('admin.userInfo', {
      id: params.id,
    })
  }

  public async unbanUser({ params, logger, response }: HttpContextContract) {
    const user = await User.find(params.id)

    if (!user) {
      return response.redirect().toRoute('admin.userInfo', {
        id: params.id,
      })
    }

    try {
      await User.query().where('id', user.id).update({
        banned: false,
      })
    } catch (error) {
      logger.error(error)
    }

    return response.redirect().toRoute('admin.userInfo', {
      id: params.id,
    })
  }

  public async certifUser({ params, logger, response }: HttpContextContract) {
    const user = await User.find(params.id);

    if (!user || !user.sellerProfile?.isStripeLinked) {
      return response.redirect().toRoute('admin.userInfo', {
        id: params.id,
      })
    }


    try {
      user!.sellerProfile.certified = true
      await user!.save()
    } catch (error) {
      logger.error(error)
    }

    return response.redirect().toRoute('admin.userInfo', {
      id: user.id,
    })
  }

  public async uncertifUser({ params, logger, response }: HttpContextContract) {
    const user = await User.find(params.id);

    if (!user || !user.sellerProfile?.isStripeLinked) {
      return response.redirect().toRoute('admin.userInfo', {
        id: params.id,
      })
    }

    try {
      user!.sellerProfile.certified = false
      await user!.save()
    } catch (error) {
      logger.error(error)
    }

    return response.redirect().toRoute('admin.userInfo', {
      id: params.id,
    })
  }
}
