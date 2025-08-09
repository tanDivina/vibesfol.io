import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  createTestimonial: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (!session) {
      throw redirect(303, '/login');
    }

    const formData = await request.formData();
    const testimonialData = {
      client_name: formData.get('client_name') as string,
      client_title: formData.get('client_title') as string,
      client_company: formData.get('client_company') as string,
      testimonial_text: formData.get('testimonial_text') as string,
      is_published: formData.get('is_published') === 'on',
    };

    const { error: insertError } = await supabase.from('testimonials').insert({
      ...testimonialData,
      user_id: session.user.id,
    });

    if (insertError) {
      throw error(500, 'Failed to create testimonial');
    }

    return { success: true };
  },

  updateTestimonial: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (!session) {
      throw redirect(303, '/login');
    }

    const formData = await request.formData();
    const testimonialId = formData.get('id') as string;
    const testimonialData = {
      client_name: formData.get('client_name') as string,
      client_title: formData.get('client_title') as string,
      client_company: formData.get('client_company') as string,
      testimonial_text: formData.get('testimonial_text') as string,
      is_published: formData.get('is_published') === 'on',
    };

    const { error: updateError } = await supabase
      .from('testimonials')
      .update(testimonialData)
      .eq('id', testimonialId)
      .eq('user_id', session.user.id);

    if (updateError) {
      throw error(500, 'Failed to update testimonial');
    }

    return { success: true };
  },

  deleteTestimonial: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (!session) {
      throw redirect(303, '/login');
    }

    const formData = await request.formData();
    const testimonialId = formData.get('id') as string;

    const { error: deleteError } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', testimonialId)
      .eq('user_id', session.user.id);

    if (deleteError) {
      throw error(500, 'Failed to delete testimonial');
    }

    return { success: true };
  },
};
