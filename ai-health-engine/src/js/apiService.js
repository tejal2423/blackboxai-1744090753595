// API Service for Health Engine
class ApiService {
  constructor(baseUrl = 'https://api.aihealthengine.com/v1') {
    this.baseUrl = baseUrl;
  }

  async checkSymptoms(symptoms) {
    try {
      const response = await fetch(`${this.baseUrl}/diagnosis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms })
      });
      return await response.json();
    } catch (error) {
      console.error('Diagnosis API error:', error);
      throw error;
    }
  }

  async findDoctors(specialty, location) {
    try {
      const response = await fetch(`${this.baseUrl}/doctors?specialty=${specialty}&location=${location}`);
      return await response.json();
    } catch (error) {
      console.error('Doctors API error:', error);
      throw error;
    }
  }

  async saveHealthData(data) {
    try {
      const response = await fetch(`${this.baseUrl}/health-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      console.error('Health data API error:', error);
      throw error;
    }
  }

  getAuthToken() {
    // In a real app, this would come from auth context
    return localStorage.getItem('authToken');
  }
}

// Export singleton instance
export const apiService = new ApiService();