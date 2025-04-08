document.getElementById('analyze-btn').addEventListener('click', function() {
    // Get selected symptoms
    const symptoms = [];
    const symptomCheckboxes = document.querySelectorAll('.symptom-checkbox');
    symptomCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            symptoms.push(checkbox.id);
        }
    });

    // Get additional information
    const ageGroup = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;

    // Analyze symptoms and provide results
    const diagnosisResult = document.getElementById('diagnosis-result');
    const actionResult = document.getElementById('action-result');
    const dietResult = document.getElementById('diet-result');
    const resultsSection = document.getElementById('results-section');

    if (symptoms.length === 0) {
        alert('Please select at least one symptom.');
        return;
    }

    // Enhanced analysis logic
    let diagnosis = '';
    let actions = '';
    let diet = '';

    if (symptoms.includes('fever') && symptoms.includes('cough')) {
        diagnosis = 'Possible condition: Flu';
        actions = 'You should rest, stay hydrated, and consider taking over-the-counter medications. If symptoms persist, consult a healthcare provider.';
        diet = 'Increase fluid intake and consume light meals. Avoid dairy products.';
    } else if (symptoms.includes('headache')) {
        diagnosis = 'Possible condition: Migraine';
        actions = 'Find a quiet, dark room to rest. Consider taking pain relievers and applying a cold compress to your forehead.';
        diet = 'Stay hydrated and avoid caffeine and alcohol.';
    } else if (symptoms.includes('nausea')) {
        diagnosis = 'Possible condition: Gastroenteritis';
        actions = 'Stay hydrated and consider eating bland foods like toast or crackers. If nausea persists, consult a healthcare provider.';
        diet = 'Avoid spicy and greasy foods.';
    } else if (symptoms.includes('fever') && symptoms.includes('skin-rash')) {
        diagnosis = 'Possible conditions: Chickenpox, Measles, or Allergic Reaction';
        actions = 'Keep the rash clean and dry. Avoid scratching. Monitor fever and seek medical attention if symptoms worsen.';
        diet = 'Stay hydrated and eat cooling foods like cucumber and watermelon. Avoid potential allergens.';
    } else {
        diagnosis = 'No specific condition identified. Please consult a healthcare provider for a thorough evaluation.';
        actions = 'Monitor your symptoms and seek medical advice if necessary.';
        diet = 'Maintain a balanced diet.';
    }

    // Display results
    diagnosisResult.textContent = diagnosis;
    actionResult.textContent = actions;
    dietResult.textContent = diet;
    resultsSection.classList.remove('hidden');
});

// Medication Tracker Functionality
document.getElementById('medication-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get medication details
    const medicationName = document.getElementById('medication-name').value;
    const dosage = document.getElementById('dosage').value;
    const frequency = document.getElementById('frequency').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    // Create medication object
    const medication = {
        name: medicationName,
        dosage: dosage,
        frequency: frequency,
        startDate: startDate,
        endDate: endDate
    };

    // Store medication in local storage
    let medications = JSON.parse(localStorage.getItem('medications')) || [];
    medications.push(medication);
    localStorage.setItem('medications', JSON.stringify(medications));

    // Clear form fields
    document.getElementById('medication-form').reset();

    // Display updated medication list
    displayMedications();
});

// Function to display medications
function displayMedications() {
    const medicationList = document.getElementById('medication-list');
    medicationList.innerHTML = ''; // Clear existing list

    const medications = JSON.parse(localStorage.getItem('medications')) || [];
    medications.forEach((medication, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${medication.name} - ${medication.dosage} (${medication.frequency})`;
        medicationList.appendChild(listItem);
    });
}

// Call displayMedications on page load
document.addEventListener('DOMContentLoaded', displayMedications);