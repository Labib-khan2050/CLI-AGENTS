/**
 * Auth Receiver for Claudable
 * Receives authentication from Neuron AI parent window
 */

export interface AuthBridgeMessage {
  type: 'NEURON_AUTH_TOKEN' | 'NEURON_AUTH_USER' | 'NEURON_AUTH_LOGOUT';
  payload: {
    token?: string;
    user?: any;
  };
}

/**
 * Initialize auth receiver to listen for Neuron AI auth messages
 */
export function initAuthReceiver() {
  if (typeof window === 'undefined') return;

  console.log('[AuthReceiver] Claudable listening for auth messages from Neuron AI');

  window.addEventListener('message', (event) => {
    // In production, verify origin:
    // if (event.origin !== 'http://localhost:8080') {
    //   console.warn('[AuthReceiver] Rejected message from untrusted origin:', event.origin);
    //   return;
    // }

    const message: AuthBridgeMessage = event.data;

    if (!message?.type?.startsWith('NEURON_AUTH_')) return;

    console.log('[AuthReceiver] Claudable received auth message:', message.type);

    switch (message.type) {
      case 'NEURON_AUTH_TOKEN':
        if (message.payload.token) {
          handleTokenReceived(message.payload.token);
        }
        break;
      
      case 'NEURON_AUTH_USER':
        if (message.payload.user) {
          handleUserReceived(message.payload.user);
        }
        break;
      
      case 'NEURON_AUTH_LOGOUT':
        handleLogout();
        break;
    }
  });
}

/**
 * Handle token received from Neuron AI
 */
function handleTokenReceived(token: string) {
  console.log('[AuthReceiver] Storing Neuron AI token in Claudable');
  
  // Store token
  localStorage.setItem('neuron-ai-token', token);
  localStorage.setItem('token', token); // Fallback
  
  // If Claudable uses cookies:
  // document.cookie = `token=${token}; path=/; SameSite=Lax`;
  
  // Set authenticated flag
  localStorage.setItem('neuron-authenticated', 'true');
  
  console.log('[AuthReceiver] Claudable authenticated via Neuron AI');
}

/**
 * Handle user data received from Neuron AI
 */
function handleUserReceived(user: any) {
  console.log('[AuthReceiver] Storing Neuron AI user data in Claudable:', user);
  localStorage.setItem('neuron-ai-user', JSON.stringify(user));
}

/**
 * Handle logout signal from Neuron AI
 */
function handleLogout() {
  console.log('[AuthReceiver] Claudable logging out (signal from Neuron AI)');
  localStorage.removeItem('neuron-ai-token');
  localStorage.removeItem('neuron-ai-user');
  localStorage.removeItem('token');
  localStorage.removeItem('neuron-authenticated');
  
  // Reload to clear state
  window.location.reload();
}

/**
 * Get stored Neuron AI token
 */
export function getNeuronToken(): string | null {
  return localStorage.getItem('neuron-ai-token');
}

/**
 * Get stored Neuron AI user
 */
export function getNeuronUser(): any | null {
  const user = localStorage.getItem('neuron-ai-user');
  return user ? JSON.parse(user) : null;
}

/**
 * Check if authenticated via Neuron AI
 */
export function isNeuronAuthenticated(): boolean {
  return localStorage.getItem('neuron-authenticated') === 'true';
}
