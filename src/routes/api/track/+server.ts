import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const { event, data } = await request.json();

  if (!event || !data) {
    return json({ error: 'Missing event or data' }, { status: 400 });
  }

  try {
    switch (event) {
      case 'portfolio_view':
        await supabase.from('portfolio_views').insert(data);
        break;
      case 'project_click':
        await supabase.from('project_clicks').insert(data);
        break;
      case 'social_click':
        await supabase.from('social_clicks').insert(data);
        break;
      case 'contact_submission':
        await supabase.from('contact_submissions').insert(data);
        break;
      default:
        return json({ error: 'Invalid event type' }, { status: 400 });
    }

    return json({ success: true });
  } catch (error) {
    console.error('Error tracking event:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};
