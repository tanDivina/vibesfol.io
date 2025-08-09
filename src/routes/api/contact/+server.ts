import { error, json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import { sendUserEmail } from '$lib/mailer';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { portfolio_user_id, sender_name, sender_email, sender_company, subject, message } = await request.json();

    // Validate required fields
    if (!portfolio_user_id || !sender_name || !sender_email || !subject || !message) {
      throw error(400, 'Missing required fields');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sender_email)) {
      throw error(400, 'Invalid email format');
    }

    // Check if the portfolio user exists and has contact form enabled
    const { data: portfolioUser, error: userError } = await supabase
      .from('profiles')
      .select('id, full_name, contact_form_enabled, contact_email_notifications')
      .eq('id', portfolio_user_id)
      .single();

    if (userError || !portfolioUser) {
      throw error(404, 'Portfolio user not found');
    }

    if (!portfolioUser.contact_form_enabled) {
      throw error(403, 'Contact form is disabled for this user');
    }

    // Insert the contact submission
    const { data: submission, error: insertError } = await supabase
      .from('contact_submissions')
      .insert({
        portfolio_user_id,
        sender_name,
        sender_email,
        sender_company: sender_company || null,
        subject,
        message
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting contact submission:', insertError);
      throw error(500, 'Failed to submit contact form');
    }

    // Send email notification to portfolio owner if enabled
    if (portfolioUser.contact_email_notifications) {
      try {
        // Get the user object for email sending
        const { data: userData, error: userDataError } = await supabase.auth.admin.getUserById(portfolio_user_id);
        
        if (!userDataError && userData.user) {
          await sendUserEmail({
            user: userData.user,
            subject: `New Contact Form Submission: ${subject}`,
            from_email: 'noreply@mydevfol.io',
            template_name: 'contact_notification',
            template_properties: {
              portfolio_owner_name: portfolioUser.full_name || 'there',
              sender_name,
              sender_email,
              sender_company: sender_company || 'Not specified',
              message_subject: subject,
              message_content: message,
              dashboard_url: 'https://mydevfol.io/dashboard/messages'
            }
          });
        }
      } catch (emailError) {
        // Log email error but don't fail the request
        console.error('Failed to send email notification:', emailError);
      }
    }

    return json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      submission_id: submission.id 
    });

  } catch (err) {
    console.error('Contact form submission error:', err);
    
    if (err instanceof Error && 'status' in err) {
      throw err;
    }
    
    throw error(500, 'Internal server error');
  }
};
