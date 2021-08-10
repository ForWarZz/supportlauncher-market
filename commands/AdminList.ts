import { BaseCommand, flags } from '@adonisjs/core/build/standalone'

export default class AdminList extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'admin:list'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'List all users having the admin role'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
  }

  @flags.boolean({ description: 'Ask only user with the "superadmin" role' })
  public super: boolean

  public async run() {
    const User = (await import('App/Models/User')).default

    const list = await User.query()
      .whereHas('roles', (roleQuery) => {
        roleQuery.where('slug', 'superadmin')
        if (!this.super) {
          roleQuery.orWhere('slug', 'admin')
        }
      })
      .preload('roles')

    const table = this.ui.table()
    table.head(['ID', 'Username', 'Email', 'Roles'])
    table.columnWidths([25, 15, 30, 40])

    for (const user of list) {
      const roles = user.roles.map((role) => role.slug)
      table.row([user.id, user.username, user.email, roles.join(', ')])
    }

    table.render()
  }
}
