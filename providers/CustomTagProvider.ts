import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import format from 'date-fns/format'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import fr from 'date-fns/locale/fr'

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class CustomTagProvider {
  public static needApplication = true

  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // All bindings are ready, feel free to use them
    const View = this.app.container.use('Adonis/Core/View')
    const Env = this.app.container.use('Adonis/Core/Env')
    const Application = this.app.container.use('Adonis/Core/Application')
    const { LoggedInTag } = await import('App/Tags/LoggedIn')
    const { GuestTag } = await import('App/Tags/Guest')

    View.registerTag(LoggedInTag).registerTag(GuestTag)

    View.global('formatDate', (date: Date) => {
      return format(new Date(date), 'P', {
        locale: fr,
      })
    })

    View.global('dateFromNow', (date: Date) => {
      return formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: fr,
      })
    })

    View.global('env', (key: string) => {
      return Env.get(key)
    })

    View.global('appVersion', () => {
      return Application.version
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
