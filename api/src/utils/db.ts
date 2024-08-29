import { Pool } from "pg";

import getEnv from "./env";

let db: Pool | undefined = undefined

export default function getDB(){
  if(!db){
    db = new Pool({
      database: getEnv().SUPABASE_DB,
      host: getEnv().SUPABASE_HOST,
      port: getEnv().SUPABASE_PORT,
      user: getEnv().SUPABASE_USER,
      password: getEnv().SUPABASE_PASSWORD,
    })
  }

  return db
}