class AuthService {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  init() {
    // Check for existing session
    const token = localStorage.getItem('authToken');
    if (token) {
      this.currentUser = this.parseJwt(token);
    }
  }

  async login(email, password) {
    try {
      const response = await fetch('https://api.aihealthengine.com/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        this.currentUser = this.parseJwt(data.token);
        return true;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('authToken');
    this.currentUser = null;
  }

  parseJwt(token) {
    try {
      // Verify token structure first
      if (token.split('.').length !== 3) {
        throw new Error('Invalid token format');
      }
      
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(atob(base64));
      
      // Verify token expiration
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        throw new Error('Token expired');
      }
      
      return decoded;
    } catch (e) {
      console.error('JWT parsing error:', e);
      this.logout();
      return null;
    }
  }

  isAuthenticated() {
    return !!this.currentUser;
  }
}

export const authService = new AuthService();