import { BasePolicy, action } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class SellerPolicy extends BasePolicy {
  @action({})
  public async canSell(user: User) {
    await user.load('sellerProfile')
    return (
      user.sellerProfile !== null &&
      (await user.hasPermission('seller:canSell')) &&
      user.sellerProfile.isStripeLinked
    )
  }

  @action({})
  public async isSeller(user: User) {
    await user.load('sellerProfile')
    return (await user.hasRole('seller')) && user.sellerProfile !== null
  }
}
