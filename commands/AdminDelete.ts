import { BaseCommand, flags, args } from '@adonisjs/core/build/standalone'

export default class AdminDelete extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'admin:delete'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Remove the admin role from a user'

  @args.string({ description: 'The user ID' })
  public id: string

  @flags.boolean({ description: 'Remove the "superadmin" role instead of "admin"' })
  public super: boolean

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

  public async run() {
    const User = (await import('App/Models/User')).default
    const Role = (await import('App/Models/Role')).default

    const user = await User.find(this.id)

    if (!user) {
      return this.logger.error(`User "${this.id}" not found.`)
    }

    this.logger.info(`User "${user.username}" found`)

    let role
    if (this.super) {
      role = await Role.findBy('slug', 'superadmin')
    } else {
      role = await Role.findBy('slug', 'admin')
    }

    if (!role) {
      return this.logger.error(
        `Role not found.\nDid you forgot to run database migration and seeder ?`
      )
    }

    await user.related('roles').detach([role.id])

    this.logger.success('Role removed succesfully !')
  }
}
