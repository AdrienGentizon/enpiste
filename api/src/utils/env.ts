
type Env = {
  API_HOST: string
  API_PORT: number

  SUPABASE_DB: string
  SUPABASE_HOST: string
  SUPABASE_PORT: number
  SUPABASE_USER: string
  SUPABASE_PASSWORD: string
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
      API_HOST: getEnvVar('API_HOST'),
      API_PORT: parseInt(getEnvVar('API_PORT')),
      SUPABASE_DB: getEnvVar('SUPABASE_DB'),
      SUPABASE_HOST: getEnvVar('SUPABASE_HOST'),
      SUPABASE_PORT: parseInt(getEnvVar('SUPABASE_PORT')),
      SUPABASE_USER: getEnvVar('SUPABASE_USER'),
      SUPABASE_PASSWORD: getEnvVar('SUPABASE_PASSWORD'),
    }
  }
  return env
}

export function isDevPlatform() {
  return getEnv().API_HOST === 'localhost'
}
