import { DateTime } from 'luxon'
import { AllyUserContract, DiscordToken } from '@ioc:Adonis/Addons/Ally'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async redirect({ ally }: HttpContextContract) {
    return ally.use('discord').redirect()
  }

  public async callback({ auth, ally, view, response, logger, session }: HttpContextContract) {
    const discord = ally.use('discord')

    /**
     * User has explicitly denied the login request
     */
    if (discord.accessDenied()) {
      session.flash({
        notification: [
          {
            content: 'Authentificatin annulée',
            type: 'error',
          },
        ],
      })
      return response.redirect().toRoute('base.home')
    }

    /**
     * Unable to verify the CSRF state
     */
    if (discord.stateMisMatch()) {
      session.flash({
        notification: [
          {
            content: 'Session invalide',
            type: 'error',
          },
        ],
      })
      return response.redirect().toRoute('base.home')
    }

    /**
     * There was an unknown error during the redirect
     */
    if (discord.hasError()) {
      logger.error(discord.getError() as string)
      return view.render('errors/auth', {
        title: 'Erreur',
        description:
          "Une erreur est survenu lors de l'authentification. Contactez l'administateur si l'erreur persiste (code: DISCORD_ERROR)",
      })
    }

    let discordUser: AllyUserContract<DiscordToken>
    try {
      discordUser = await discord.user()
    } catch (error) {
      logger.error(error)
      return view.render('errors/auth', {
        title: 'Erreur',
        description:
          "Une erreur est survenu lors de l'authentification. Contactez l'administateur si l'erreur persiste (code: INVALID_USER)",
      })
    }

    try {
      let user = await User.find(discordUser.id)

      if (user === null) {
        user = new User()
        user.id = discordUser.id
      }

      user.lastLogin = DateTime.now()
      user.username = discordUser.nickName || ''
      user.avatar = discordUser.avatarUrl || ''
      user.email = discordUser.email || ''
      await user.save()

      // Auth the user and update all his informations from the Discord Account
      await auth.loginViaId(discordUser.id)
    } catch (error) {
      logger.error(error)
      return view.render('errors/auth', {
        title: 'Erreur',
        description:
          "Une erreur est survenu lors de l'authentification. Contactez l'administateur si l'erreur persiste",
      })
    }

    return response.redirect().toRoute('base.home')
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.redirect().toRoute('base.home')
  }
}
