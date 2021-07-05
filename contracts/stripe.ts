declare module '@ioc:Adonis/Addons/Stripe' {
  import StripeType from 'stripe'

  interface StripeOptions extends Omit<StripeType, 'apiVersion'> {
    apiVersion: string | null
  }

  export interface StripeConfig {
    secretKey: string
    options: StripeType
  }

  const Stripe: StripeType

  export default Stripe
}
