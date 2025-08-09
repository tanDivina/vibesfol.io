import { v4 as uuidv4 } from 'uuid';

let sessionId: string | null = null;

function getSessionId(): string {
  if (sessionId) {
    return sessionId;
  }
  
  if (typeof sessionStorage !== 'undefined') {
    sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = uuidv4();
      sessionStorage.setItem('sessionId', sessionId);
    }
  } else {
    // Fallback for server-side rendering
    sessionId = uuidv4();
  }
  
  return sessionId;
}

export async function trackEvent(event: string, data: Record<string, any>) {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event,
        data: {
          ...data,
          session_id: getSessionId(),
        },
      }),
    });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}
