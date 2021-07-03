import { BasePolicy, action } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class AdminPolicy extends BasePolicy {
  @action({})
  public async accessPanel(user: User) {
    return await user.hasPermission('admin:accessPanel')
  }

  @action({})
  public async viewUsers(user: User) {
    return await user.hasPermission('admin:viewUser')
  }

  @action({})
  public async viewRoles(user: User) {
    return await user.hasPermission('admin:viewRole')
  }
}
