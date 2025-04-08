document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Form submission handler
    const healthForm = document.getElementById('healthForm');
    const resultsSection = document.getElementById('results');
    const resultsContent = document.getElementById('resultsContent');
    const newAssessmentBtn = document.getElementById('newAssessment');

    if (healthForm) {
        healthForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const age = document.getElementById('age').value;
            const symptoms = document.getElementById('symptoms').value;
            
            // Show loading state
            const submitBtn = healthForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
            submitBtn.disabled = true;
            
            // Simulate AI processing (in a real app, this would be an API call)
            setTimeout(() => {
                // Generate sample results based on input
                const analysisResults = generateAnalysis(age, symptoms);
                
                // Display results
                displayResults(analysisResults);
                
                // Reset button
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                // Scroll to results
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            }, 2000);
        });
    }

    if (newAssessmentBtn) {
        newAssessmentBtn.addEventListener('click', function() {
            // Reset form and hide results
            healthForm.reset();
            resultsSection.classList.add('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Helper function to generate sample analysis
    function generateAnalysis(age, symptoms) {
        const commonConditions = {
            headache: "Possible tension headache or migraine. Consider hydration and rest.",
            fever: "Potential viral infection. Monitor temperature and stay hydrated.",
            fatigue: "Could indicate various conditions from stress to nutritional deficiencies.",
            cough: "May suggest respiratory infection or allergies.",
            "stomach pain": "Possible indigestion or gastrointestinal issue."
        };
        
        // Simple keyword matching (in a real app, this would be more sophisticated)
        let matchedConditions = [];
        for (const [key, value] of Object.entries(commonConditions)) {
            if (symptoms.toLowerCase().includes(key)) {
                matchedConditions.push(value);
            }
        }
        
        // Default response if no matches
        if (matchedConditions.length === 0) {
            matchedConditions.push("Your symptoms don't match common patterns. Consider consulting a healthcare professional.");
        }
        
        // Age-based recommendations
        let ageRecommendation = "";
        if (age < 18) {
            ageRecommendation = "Given your age, we recommend consulting a pediatrician if symptoms persist.";
        } else if (age > 65) {
            ageRecommendation = "As an older adult, it's especially important to monitor these symptoms closely.";
        }
        
        return {
            conditions: matchedConditions,
            generalAdvice: [
                "Get plenty of rest",
                "Stay hydrated",
                "Monitor symptoms for changes",
                "Seek medical attention if symptoms worsen"
            ],
            ageRecommendation: ageRecommendation
        };
    }

    // Helper function to display results
    function displayResults(results) {
        resultsContent.innerHTML = '';
        
        // Display matched conditions
        if (results.conditions.length > 0) {
            const conditionsEl = document.createElement('div');
            conditionsEl.innerHTML = `
                <h4 class="font-medium text-gray-800">Possible Conditions:</h4>
                <ul class="list-disc pl-5 mt-2 space-y-1">
                    ${results.conditions.map(cond => `<li>${cond}</li>`).join('')}
                </ul>
            `;
            resultsContent.appendChild(conditionsEl);
        }
        
        // Display general advice
        const adviceEl = document.createElement('div');
        adviceEl.innerHTML = `
            <h4 class="font-medium text-gray-800 mt-4">Recommended Actions:</h4>
            <ul class="list-disc pl-5 mt-2 space-y-1">
                ${results.generalAdvice.map(advice => `<li>${advice}</li>`).join('')}
            </ul>
        `;
        resultsContent.appendChild(adviceEl);
        
        // Display age-specific advice if available
        if (results.ageRecommendation) {
            const ageEl = document.createElement('div');
            ageEl.innerHTML = `
                <h4 class="font-medium text-gray-800 mt-4">Age-Specific Advice:</h4>
                <p class="mt-2">${results.ageRecommendation}</p>
            `;
            resultsContent.appendChild(ageEl);
        }
        
        // Show results section
        resultsSection.classList.remove('hidden');
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});