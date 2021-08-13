import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export type SellerStatus = 'available' | 'unavailable' | 'vacation'

export default class SellerProfile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: string

  @column()
  public customName?: string

  @column()
  public status: SellerStatus

  @column()
  public bio: string

  @column()
  public stripeAccountId?: string

  @hasOne(() => User)
  public user: HasOne<typeof User>

  @column()
  public certified: boolean

  public get isStripeLinked(): boolean {
    return typeof this.stripeAccountId === 'string' && this.stripeAccountId.length > 1
  }
}
