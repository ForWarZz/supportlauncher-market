/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  NODE_ENV: Env.schema.enum(['development', 'production', 'testing'] as const),
  DB_CONNECTION: Env.schema.string(),
  CACHE_VIEWS: Env.schema.boolean(),

  // Database configuration
  PG_HOST: Env.schema.string({ format: 'host' }),
  PG_PORT: Env.schema.number(),
  PG_USER: Env.schema.string(),
  PG_PASSWORD: Env.schema.string.optional(),
  PG_DB_NAME: Env.schema.string(),

  // Discord configuration (for OAuth2)
  DISCORD_CLIENT_ID: Env.schema.string(),
  DISCORD_CLIENT_SECRET: Env.schema.string(),
  DISCORD_REDIRECT_URI: Env.schema.string(),

  SESSION_DRIVER: Env.schema.string(),

  // Stripe configuration
  STRIPE_SECRET_KEY: Env.schema.string(),
  STRIPE_API_VERSION: Env.schema.string(),
  STRIPE_REFRESH_URL: Env.schema.string(),
  STRIPE_RETURN_URL: Env.schema.string(),

  // Redis configuration
  REDIS_CONNECTION: Env.schema.enum(['local'] as const),
  REDIS_HOST: Env.schema.string({ format: 'host' }),
  REDIS_PORT: Env.schema.number(),
  REDIS_PASSWORD: Env.schema.string.optional(),

  // Links
  DISCORD_SUPPORT_LINK: Env.schema.string(),
  DISCORD_LINK: Env.schema.string(),
  GITHUB_LINK: Env.schema.string(),
})
