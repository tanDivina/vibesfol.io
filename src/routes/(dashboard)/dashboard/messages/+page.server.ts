import { redirect } from '@sveltejs/kit';
import { supabaseServiceRole } from '$lib/supabaseServiceRole';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
  const { session, user } = await safeGetSession();
  
  if (!session || !user) {
    throw redirect(303, '/login');
  }

  // Fetch contact submissions for the current user
  const { data: messages, error: messagesError } = await supabaseServiceRole
    .from('contact_submissions')
    .select('*')
    .eq('portfolio_user_id', user.id)
    .order('created_at', { ascending: false });

  if (messagesError) {
    console.error('Error fetching contact messages:', messagesError);
    return {
      session,
      user,
      messages: []
    };
  }

  // Get message statistics
  const totalMessages = messages?.length || 0;
  const unreadMessages = messages?.filter(m => !m.is_read).length || 0;
  const starredMessages = messages?.filter(m => m.is_starred).length || 0;

  return {
    session,
    user,
    messages: messages || [],
    stats: {
      total: totalMessages,
      unread: unreadMessages,
      starred: starredMessages
    }
  };
};

export const actions: Actions = {
  markAsRead: async ({ request, locals: { safeGetSession } }) => {
    const { session, user } = await safeGetSession();
    
    if (!session || !user) {
      throw redirect(303, '/login');
    }

    const formData = await request.formData();
    const messageId = formData.get('messageId') as string;

    if (!messageId) {
      return { success: false, error: 'Message ID is required' };
    }

    const { error } = await supabaseServiceRole
      .from('contact_submissions')
      .update({ is_read: true, updated_at: new Date().toISOString() })
      .eq('id', messageId)
      .eq('portfolio_user_id', user.id);

    if (error) {
      console.error('Error marking message as read:', error);
      return { success: false, error: 'Failed to mark message as read' };
    }

    return { success: true };
  },

  markAsUnread: async ({ request, locals: { safeGetSession } }) => {
    const { session, user } = await safeGetSession();
    
    if (!session || !user) {
      throw redirect(303, '/login');
    }

    const formData = await request.formData();
    const messageId = formData.get('messageId') as string;

    if (!messageId) {
      return { success: false, error: 'Message ID is required' };
    }

    const { error } = await supabaseServiceRole
      .from('contact_submissions')
      .update({ is_read: false, updated_at: new Date().toISOString() })
      .eq('id', messageId)
      .eq('portfolio_user_id', user.id);

    if (error) {
      console.error('Error marking message as unread:', error);
      return { success: false, error: 'Failed to mark message as unread' };
    }

    return { success: true };
  },

  toggleStar: async ({ request, locals: { safeGetSession } }) => {
    const { session, user } = await safeGetSession();
    
    if (!session || !user) {
      throw redirect(303, '/login');
    }

    const formData = await request.formData();
    const messageId = formData.get('messageId') as string;
    const isStarred = formData.get('isStarred') === 'true';

    if (!messageId) {
      return { success: false, error: 'Message ID is required' };
    }

    const { error } = await supabaseServiceRole
      .from('contact_submissions')
      .update({ is_starred: !isStarred, updated_at: new Date().toISOString() })
      .eq('id', messageId)
      .eq('portfolio_user_id', user.id);

    if (error) {
      console.error('Error toggling star:', error);
      return { success: false, error: 'Failed to update message' };
    }

    return { success: true };
  },

  deleteMessage: async ({ request, locals: { safeGetSession } }) => {
    const { session, user } = await safeGetSession();
    
    if (!session || !user) {
      throw redirect(303, '/login');
    }

    const formData = await request.formData();
    const messageId = formData.get('messageId') as string;

    if (!messageId) {
      return { success: false, error: 'Message ID is required' };
    }

    const { error } = await supabaseServiceRole
      .from('contact_submissions')
      .delete()
      .eq('id', messageId)
      .eq('portfolio_user_id', user.id);

    if (error) {
      console.error('Error deleting message:', error);
      return { success: false, error: 'Failed to delete message' };
    }

    return { success: true };
  },

  markAsReplied: async ({ request, locals: { safeGetSession } }) => {
    const { session, user } = await safeGetSession();
    
    if (!session || !user) {
      throw redirect(303, '/login');
    }

    const formData = await request.formData();
    const messageId = formData.get('messageId') as string;

    if (!messageId) {
      return { success: false, error: 'Message ID is required' };
    }

    const { error } = await supabaseServiceRole
      .from('contact_submissions')
      .update({ 
        replied_at: new Date().toISOString(),
        is_read: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', messageId)
      .eq('portfolio_user_id', user.id);

    if (error) {
      console.error('Error marking message as replied:', error);
      return { success: false, error: 'Failed to mark message as replied' };
    }

    return { success: true };
  }
};
