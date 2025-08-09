import { error, redirect } from '@sveltejs/kit';
import { supabaseServiceRole } from '$lib/supabaseServiceRole';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
  const { session } = await safeGetSession();
  if (!session) {
    redirect(303, '/login');
  }

  // Fetch technologies for the combobox
  const { data: technologies, error: technologiesError } = await supabaseServiceRole
    .from('technologies')
    .select('id, name')
    .order('name');

  if (technologiesError) {
    console.error('Error fetching technologies:', technologiesError);
    throw error(500, 'Failed to load technologies');
  }

  return {
    session,
    technologies: technologies || []
  };
};
