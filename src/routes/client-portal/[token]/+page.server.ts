import { error } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import type { Database } from '../../../lib/DatabaseDefinitions';
import type { PageServerLoad } from './$types';

type ClientPortalData = {
  portal: Database['public']['Tables']['client_portals']['Row'];
  session: null; // Client portals are public, so no session is expected
};

export const load: PageServerLoad<ClientPortalData> = async ({ params }) => {
  const { token } = params;

  if (!token) {
    throw error(400, 'Access token missing.');
  }

  const { data: portal, error: fetchError } = await supabase
    .from('client_portals')
    .select('*')
    .eq('access_token', token)
    .eq('is_active', true)
    .single();

  if (fetchError) {
    console.error('Error fetching client portal:', fetchError);
    throw error(500, 'Failed to load client portal.');
  }

  if (!portal) {
    throw error(404, 'Invalid or inactive client portal.');
  }

  return { portal, session: null };
};
