import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stripe from '@ioc:Adonis/Addons/Stripe'
import Env from '@ioc:Adonis/Core/Env'
import SellerProfile from 'App/Models/SellerProfile'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
export default class SellersController {
  public async linkStripe({ auth, response }: HttpContextContract) {
    if (!(await auth.user!.hasRole('seller'))) {
      return response.redirect().back()
    }

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

    if (!auth.user!.sellerProfile) {
      return response.redirect().toRoute('base.home')
    }

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
      } catch (error) {
        logger.error(error)
      }

      return response.redirect().toRoute('user.profile')
    } else {
      return response.redirect().back()
    }
  }

  public async updateStatus({ request, auth, response }: HttpContextContract) {
    await auth.user!.load('sellerProfile')

    if (!auth.user!.sellerProfile) {
      return response.forbidden()
    }

    const data = await request.validate({
      schema: schema.create({
        status: schema.enum(['available', 'unavailable', 'vacation'] as const),
      }),
    })

    auth.user!.sellerProfile.status = data.status
    await auth.user!.sellerProfile.save()
    return response.ok({})
  }

  public async updateUsername({ request, auth, response }: HttpContextContract) {
    const data = await request.validate({
      schema: schema.create({
        username: schema.string(
          {
            escape: true,
            trim: true,
          },
          [
            rules.unique({
              column: 'username',
              table: 'users',
              caseInsensitive: true,
              whereNot: {
                id: auth.user!.id,
              },
            }),
            rules.unique({
              column: 'custom_name',
              table: 'seller_profiles',
              caseInsensitive: true,
              whereNot: {
                user_id: auth.user!.id,
              },
            }),
          ]
        ),
      }),
    })

    await auth.user!.load('sellerProfile')
    auth.user!.sellerProfile.customName = data.username
    await auth.user!.sellerProfile.save()
    return response.redirect().back()
  }

  public async resetUsername({ response, auth }: HttpContextContract) {
    await auth.user!.load('sellerProfile')

    await SellerProfile.query().where('user_id', auth.user!.id).update({
      customName: null,
    })
    await auth.user!.sellerProfile.save()

    return response.redirect().back()
  }
}
