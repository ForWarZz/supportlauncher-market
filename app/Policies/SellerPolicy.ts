import { BasePolicy, action } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class SellerPolicy extends BasePolicy {
  @action({})
  public async canSell(user: User) {
    await user.load('sellerProfile')
    return (
      (await user.hasPermission('seller:canSell')) &&
      user.sellerProfile !== null &&
      user.sellerProfile.isStripeLinked
    )
  }
}
