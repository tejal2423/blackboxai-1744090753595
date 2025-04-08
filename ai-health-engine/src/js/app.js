// Core Health Engine Module
class HealthEngine {
  constructor() {
    this.medications = JSON.parse(localStorage.getItem('medications')) || [];
    this.healthData = JSON.parse(localStorage.getItem('healthData')) || {};
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadMedications();
    this.checkForReminders();
  }

  setupEventListeners() {
    // Medication form submission
    document.getElementById('medication-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addMedication();
    });

    // Diet recommendation generation
    document.getElementById('generate-diet')?.addEventListener('click', () => {
      this.generateDietPlan();
    });
  }

  addMedication() {
    const medication = {
      id: Date.now(),
      name: document.getElementById('medication-name').value,
      dosage: document.getElementById('dosage').value,
      frequency: document.getElementById('frequency').value,
      startDate: document.getElementById('start-date').value,
      endDate: document.getElementById('end-date').value,
      reminders: []
    };

    this.medications.push(medication);
    this.saveMedications();
    this.setupReminders(medication);
    this.renderMedications();
  }

  setupReminders(medication) {
    // Set up notifications based on medication frequency
    // This would integrate with browser notifications in a real implementation
    console.log(`Setting up reminders for ${medication.name}`);
  }

  checkForReminders() {
    // Check if any medications are due
    this.medications.forEach(med => {
      // Reminder logic would go here
    });
  }

  saveMedications() {
    localStorage.setItem('medications', JSON.stringify(this.medications));
  }

  renderMedications() {
    const list = document.getElementById('medication-list');
    if (!list) return;

    list.innerHTML = this.medications.map(med => `
      <li class="p-4 bg-white rounded-lg shadow mb-2">
        <div class="flex justify-between">
          <h3 class="font-bold">${med.name}</h3>
          <span class="text-sm text-gray-500">${med.dosage}</span>
        </div>
        <p class="text-sm">Frequency: ${med.frequency}</p>
        <p class="text-xs text-gray-500">Started: ${med.startDate}</p>
      </li>
    `).join('');
  }

  generateDietPlan() {
    const condition = document.getElementById('health-condition').value;
    if (!condition) {
      this.showAlert('Please select a health condition', 'warning');
      return;
    }

    const plans = {
      diabetes: {
        breakfast: "Oatmeal with nuts and berries (Low GI carbohydrates)",
        lunch: "Grilled chicken with quinoa and steamed vegetables (Lean protein with fiber)",
        dinner: "Salmon with roasted Brussels sprouts (Omega-3 fatty acids)"
      },
      hypertension: {
        breakfast: "Greek yogurt with banana and flaxseeds (Potassium and fiber)",
        lunch: "Lentil soup with whole grain bread (Low sodium, high fiber)",
        dinner: "Grilled fish with sweet potato and greens (Magnesium rich)"
      }
    };

    const plan = plans[condition] || {
      breakfast: "Balanced meal with protein and complex carbohydrates",
      lunch: "Lean protein with vegetables and whole grains",
      dinner: "Light meal with vegetables and healthy fats"
    };

    document.getElementById('diet-plan').innerHTML = `
      <div class="grid md:grid-cols-3 gap-4">
        <div class="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 class="font-semibold text-green-700">Breakfast</h4>
          <p class="mt-2">${plan.breakfast}</p>
        </div>
        <div class="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 class="font-semibold text-green-700">Lunch</h4>
          <p class="mt-2">${plan.lunch}</p>
        </div>
        <div class="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 class="font-semibold text-green-700">Dinner</h4>
          <p class="mt-2">${plan.dinner}</p>
        </div>
      </div>
    `;
  }

  showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `health-alert-${type} fixed bottom-4 right-4 max-w-md`;
    alert.innerHTML = `
      <p>${message}</p>
      <button class="absolute top-2 right-2" aria-label="Close alert">
        <i class="fas fa-times"></i>
      </button>
    `;
    document.body.appendChild(alert);
    
    alert.querySelector('button').addEventListener('click', () => {
      alert.remove();
    });

    setTimeout(() => alert.remove(), 5000);
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  const healthApp = new HealthEngine();
  window.healthApp = healthApp; // Make available for debugging
});