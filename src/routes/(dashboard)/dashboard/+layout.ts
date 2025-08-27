import { redirect } from "@sveltejs/kit"
import { browser } from "$app/environment"
import { supabase } from "$lib/supabaseClient"

export const load = async () => {
  if (browser) {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      throw redirect(303, "/login")
    }
    
    return {
      session
    }
  }
  
  return {}
}