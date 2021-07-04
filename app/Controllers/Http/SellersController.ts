import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stripe from '@ioc:Adonis/Addons/Stripe'
import Env from '@ioc:Adonis/Core/Env'
import SellerProfile from 'App/Models/SellerProfile'

export default class SellersController {
  public async linkStripe({ auth, response }: HttpContextContract) {
    await auth.user!.load('sellerProfile')

    const account = await Stripe.accounts.create({
      type: 'express',
    })

    auth.user!.sellerProfile.stripeAccountId = account.id
    await auth.user!.sellerProfile.save()

    const accountLinks = await Stripe.accountLinks.create({
      account: account.id,
      refresh_url: Env.get('STRIPE_REFRESH_URL'),
      return_url: Env.get('STRIPE_RETURN_URL'),
      type: 'account_onboarding',
    })

    await Stripe.accounts.retrieve(account.id)

    return response.redirect(accountLinks.url)
  }

  public async stripeCallback({ response, logger, auth }: HttpContextContract) {
    await auth.user!.load('sellerProfile')
    const id = auth.user!.sellerProfile.stripeAccountId

    if (id) {
      try {
        const account = await Stripe.accounts.retrieve(id)
        return response.redirect().toRoute('user.profile', {
          qs: {
            error: account.details_submitted ? '' : 'not_submitted',
          },
        })
      } catch (error) {
        logger.error(error)
      }
    } else {
      logger.error(`Seller stripe ID is empty, it shouldn't be empty. (User ID: ${auth.user!.id})`)
      return response.redirect().toRoute('user.profile')
    }
  }

  public async unlinkStripe({ auth, response, logger }: HttpContextContract) {
    await auth.user!.load('sellerProfile')
    const id = auth.user!.sellerProfile.stripeAccountId

    if (id) {
      try {
        await SellerProfile.query().sideload(auth.user!.sellerProfile).update({
          stripe_account_id: null,
        })
        await Stripe.accounts.del(id)
      } catch (error) {
        logger.error(error)
      }

      return response.redirect().toRoute('user.profile')
    } else {
      return response.redirect().back()
    }
  }
}
