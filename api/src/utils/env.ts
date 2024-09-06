type Env = {
  SUPABASE_DB: string
  SUPABASE_HOST: string
  SUPABASE_PORT: number
  SUPABASE_USER: string
  SUPABASE_PASSWORD: string

  NGROK_AUTHTOKEN: string
  NGROK_DOMAIN: string

  CLERK_WEBHOOK_SECRET: string
  CLERK_SECRET_KEY: string
}

let env: Env | undefined = undefined

function getEnvVar(key: string, defaultValue = '', required = true) {
  if (required && !process.env[key])
    throw new Error(`[Error] getEnvVar: ${key} required`)
  return process.env[key] ?? defaultValue
}

export default function getEnv(): Env {
  if (!env) {
    env = {
      SUPABASE_DB: getEnvVar('SUPABASE_DB'),
      SUPABASE_HOST: getEnvVar('SUPABASE_HOST'),
      SUPABASE_PORT: parseInt(getEnvVar('SUPABASE_PORT')),
      SUPABASE_USER: getEnvVar('SUPABASE_USER'),
      SUPABASE_PASSWORD: getEnvVar('SUPABASE_PASSWORD'),
      NGROK_AUTHTOKEN: getEnvVar('NGROK_AUTHTOKEN'),
      NGROK_DOMAIN: getEnvVar('NGROK_DOMAIN'),
      CLERK_WEBHOOK_SECRET: getEnvVar('CLERK_WEBHOOK_SECRET'),
      CLERK_SECRET_KEY: getEnvVar('CLERK_SECRET_KEY'),
    }
  }
  return env
}
