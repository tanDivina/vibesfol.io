import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
  const { session } = await safeGetSession();

  if (!session) {
    throw redirect(303, '/login');
  }

  // Fetch user's profile data
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
  }

  return {
    session,
    profile: profile || {
      id: session.user.id,
      full_name: '',
      username: '',
      bio: '',
      website: '',
      github_url: '',
      linkedin_url: '',
      twitter_url: '',
      medium_url: '',
      gumroad_url: '',
      substack_url: '',
      amazon_gear_list_url: '',
      whatsapp_number: '',
      youtube_url: '',
      availability: '',
      location: '',
      is_featured: false,
      avatar_url: ''
    }
  };
};

export const actions: Actions = {
  updateProfile: async ({ request, locals: { safeGetSession } }) => {
    const { session } = await safeGetSession();

    if (!session) {
      throw redirect(303, '/login');
    }

    const formData = await request.formData();
    const profileData = {
      full_name: formData.get('full_name') as string,
      username: formData.get('username') as string,
      bio: formData.get('bio') as string,
      website: formData.get('website') as string,
      github_url: formData.get('github_url') as string,
      linkedin_url: formData.get('linkedin_url') as string,
      twitter_url: formData.get('twitter_url') as string,
      medium_url: formData.get('medium_url') as string,
      gumroad_url: formData.get('gumroad_url') as string,
      substack_url: formData.get('substack_url') as string,
      amazon_gear_list_url: formData.get('amazon_gear_list_url') as string,
      whatsapp_number: formData.get('whatsapp_number') as string,
      youtube_url: formData.get('youtube_url') as string,
      availability: formData.get('availability') as string,
      location: formData.get('location') as string,
      portfolio_theme: formData.get('portfolio_theme') as string,
    };

    // Remove empty strings and convert to null
    Object.keys(profileData).forEach(key => {
      if (profileData[key as keyof typeof profileData] === '') {
        profileData[key as keyof typeof profileData] = null as any;
      }
    });

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: session.user.id,
        ...profileData,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error updating profile:', error);
      return {
        success: false,
        error: 'Failed to update profile'
      };
    }

    return {
      success: true,
      message: 'Profile updated successfully!'
    };
  }
};
