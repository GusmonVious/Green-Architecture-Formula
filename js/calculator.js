/**
 * Green Architecture Formula
 * Calculator functionality
 */

let calculatorData = {
  people: 4,
  offsetRate: 50,
  electricity: 6.56,
  panelOutput: 1.5,
  binCapacity: 10,
  plants: []
};

function initCalculator() {
  // Initialize tabs
  initTabs();
  
  // Initialize input handlers
  initInputHandlers();
  
  // Set default values
  setDefaultValues();
  
  // Do initial calculations
  updateCalculations();
}

/**
 * Initialize tab switching functionality
 */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });
  
  // Initialize next/prev tab navigation
  document.querySelectorAll('.next-tab-btn').forEach(button => {
    button.addEventListener('click', () => {
      const currentTab = document.querySelector('.tab-btn.active');
      const nextTab = currentTab.nextElementSibling;
      
      if (nextTab) {
        nextTab.click();
      }
    });
  });
  
  document.querySelectorAll('.prev-tab-btn').forEach(button => {
    button.addEventListener('click', () => {
      const currentTab = document.querySelector('.tab-btn.active');
      const prevTab = currentTab.previousElementSibling;
      
      if (prevTab) {
        prevTab.click();
      }
    });
  });
}

/**
 * Set up event handlers for inputs
 */
function initInputHandlers() {
  // People input
  const peopleInput = document.getElementById('people');
  peopleInput.addEventListener('input', () => {
    calculatorData.people = parseInt(peopleInput.value) || 1;
    // Update electricity based on people
    const electricityInput = document.getElementById('electricity');
    electricityInput.value = (calculatorData.people * 1.64).toFixed(2);
    calculatorData.electricity = parseFloat(electricityInput.value);
    updateCalculations();
  });
  
  // Offset rate slider
  const offsetRateInput = document.getElementById('offset-rate');
  const offsetRateValue = document.querySelector('.range-value');
  offsetRateInput.addEventListener('input', () => {
    calculatorData.offsetRate = parseInt(offsetRateInput.value);
    offsetRateValue.textContent = `${calculatorData.offsetRate}%`;
    updateCalculations();
  });
  
  // Electricity input
  const electricityInput = document.getElementById('electricity');
  electricityInput.addEventListener('input', () => {
    calculatorData.electricity = parseFloat(electricityInput.value) || 0;
    updateCalculations();
  });
  
  // Panel output input
  const panelOutputInput = document.getElementById('panel-output');
  panelOutputInput.addEventListener('input', () => {
    calculatorData.panelOutput = parseFloat(panelOutputInput.value) || 0.1;
    updateCalculations();
  });
  
  // Bin capacity input
  const binCapacityInput = document.getElementById('bin-capacity');
  binCapacityInput.addEventListener('input', () => {
    calculatorData.binCapacity = parseFloat(binCapacityInput.value) || 0.1;
    updateCalculations();
  });
  
  // Plant quantity inputs
  document.querySelectorAll('.plant-quantity').forEach(input => {
    input.addEventListener('input', () => {
      const plantName = input.getAttribute('data-plant');
      const absorption = parseFloat(input.getAttribute('data-absorption'));
      const quantity = parseInt(input.value) || 0;
      
      // Update plants array
      const existingPlantIndex = calculatorData.plants.findIndex(p => p.name === plantName);
      
      if (existingPlantIndex >= 0) {
        if (quantity > 0) {
          calculatorData.plants[existingPlantIndex].quantity = quantity;
        } else {
          calculatorData.plants.splice(existingPlantIndex, 1);
        }
      } else if (quantity > 0) {
        calculatorData.plants.push({
          name: plantName,
          absorption: absorption,
          quantity: quantity
        });
      }
      
      updateCalculations();
    });
  });
}

/**
 * Set default values in the form
 */
function setDefaultValues() {
  document.getElementById('people').value = calculatorData.people;
  document.getElementById('offset-rate').value = calculatorData.offsetRate;
  document.querySelector('.range-value').textContent = `${calculatorData.offsetRate}%`;
  document.getElementById('electricity').value = calculatorData.electricity;
  document.getElementById('panel-output').value = calculatorData.panelOutput;
  document.getElementById('bin-capacity').value = calculatorData.binCapacity;
}

/**
 * Update all calculations based on current inputs
 */
function updateCalculations() {
  // Calculate solar panels needed
  const panelsNeeded = Math.ceil(calculatorData.electricity / calculatorData.panelOutput);
  document.getElementById('panels-result').textContent = `${panelsNeeded} solar panels`;
  updatePanelIcons(panelsNeeded);
  
  // Calculate waste bins needed
  const wastePerDay = calculatorData.people * 0.8;
  const binsNeeded = Math.ceil(wastePerDay / calculatorData.binCapacity);
  document.getElementById('bins-result').textContent = `${binsNeeded} waste bins`;
  updateBinIcons(binsNeeded);
  
  // Calculate CO2 offset
  const totalAbsorption = calculatorData.plants.reduce((total, plant) => {
    return total + (plant.absorption * plant.quantity);
  }, 0);
  
  const absorptionNeeded = calculatorData.people * 1.64 * (calculatorData.offsetRate / 100);
  const offsetPercentage = absorptionNeeded > 0 ? Math.min(100, Math.round((totalAbsorption / absorptionNeeded) * 100)) : 0;
  
  document.getElementById('co2-result').textContent = `${offsetPercentage}% of target (${totalAbsorption.toFixed(2)} kg/day)`;
  updateProgressCircle(offsetPercentage);
  
  // Update recommendations
  updateRecommendations(panelsNeeded, offsetPercentage, binsNeeded, absorptionNeeded, totalAbsorption);
}

/**
 * Update the panel icons visualization
 */
function updatePanelIcons(count) {
  const panelIconsContainer = document.querySelector('.panel-icons');
  panelIconsContainer.innerHTML = '';
  
  // Limit to display max 10 icons
  const maxDisplay = 10;
  const displayCount = Math.min(count, maxDisplay);
  
  for (let i = 0; i < displayCount; i++) {
    const panelIcon = document.createElement('div');
    panelIcon.classList.add('panel-icon');
    panelIcon.innerHTML = `
      <svg viewBox="0 0 24 24" width="30" height="30" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    `;
    panelIconsContainer.appendChild(panelIcon);
  }
  
  // Add +X more indicator if needed
  if (count > maxDisplay) {
    const moreIndicator = document.createElement('div');
    moreIndicator.classList.add('more-indicator');
    moreIndicator.textContent = `+${count - maxDisplay} more`;
    panelIconsContainer.appendChild(moreIndicator);
  }
}

/**
 * Update the bin icons visualization
 */
function updateBinIcons(count) {
  const binIconsContainer = document.querySelector('.bin-icons');
  binIconsContainer.innerHTML = '';
  
  // Limit to display max 5 icons
  const maxDisplay = 5;
  const displayCount = Math.min(count, maxDisplay);
  
  for (let i = 0; i < displayCount; i++) {
    const binIcon = document.createElement('div');
    binIcon.classList.add('bin-icon');
    binIcon.innerHTML = `
      <svg viewBox="0 0 24 24" width="30" height="30" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 6h18"></path>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
      </svg>
    `;
    binIconsContainer.appendChild(binIcon);
  }
  
  // Add +X more indicator if needed
  if (count > maxDisplay) {
    const moreIndicator = document.createElement('div');
    moreIndicator.classList.add('more-indicator');
    moreIndicator.textContent = `+${count - maxDisplay} more`;
    binIconsContainer.appendChild(moreIndicator);
  }
}

/**
 * Update the progress circle for CO2 offset
 */
function updateProgressCircle(percentage) {
  const circle = document.querySelector('.progress-circle-path');
  const text = document.querySelector('.progress-text');
  
  // Calculate the circumference of the circle
  const radius = parseInt(circle.getAttribute('r'));
  const circumference = 2 * Math.PI * radius;
  
  // Calculate the dash offset based on percentage
  const offset = circumference - (percentage / 100) * circumference;
  
  // Update the circle and text
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = offset;
  text.textContent = `${percentage}%`;
  
  // Update color based on percentage
  if (percentage < 30) {
    circle.style.stroke = 'var(--color-error-500)';
  } else if (percentage < 70) {
    circle.style.stroke = 'var(--color-warning-500)';
  } else {
    circle.style.stroke = 'var(--color-success-500)';
  }
}

/**
 * Update recommendations based on calculations
 */
function updateRecommendations(panelsNeeded, offsetPercentage, binsNeeded, absorptionNeeded, totalAbsorption) {
  const recommendationsList = document.getElementById('recommendations-list');
  recommendationsList.innerHTML = '';
  
  const addRecommendation = (text) => {
    const li = document.createElement('li');
    li.textContent = text;
    recommendationsList.appendChild(li);
  };
  
  // Solar panel recommendations
  if (panelsNeeded > 10) {
    addRecommendation(`Consider energy-efficient appliances to reduce your electricity needs from ${calculatorData.electricity} kWh/day.`);
  }
  
  // CO2 offset recommendations
  if (offsetPercentage < 100) {
    const absorptionGap = absorptionNeeded - totalAbsorption;
    addRecommendation(`You need ${absorptionGap.toFixed(2)} kg/day more CO₂ absorption to reach your ${calculatorData.offsetRate}% offset target.`);
    
    // Suggest specific plants
    if (absorptionGap > 0.09) {
      addRecommendation(`Adding ${Math.ceil(absorptionGap / 0.09)} Peepal Trees would meet your remaining offset needs.`);
    } else if (absorptionGap > 0.03) {
      addRecommendation(`Adding ${Math.ceil(absorptionGap / 0.03)} Neem Trees would meet your remaining offset needs.`);
    } else if (absorptionGap > 0.003) {
      addRecommendation(`Adding ${Math.ceil(absorptionGap / 0.003)} Areca Palms would meet your remaining offset needs.`);
    } else {
      addRecommendation(`Adding ${Math.ceil(absorptionGap / 0.002)} Snake Plants would meet your remaining offset needs.`);
    }
  } else if (offsetPercentage >= 100) {
    addRecommendation(`Excellent! You're meeting or exceeding your CO₂ offset target of ${calculatorData.offsetRate}%.`);
  }
  
  // Waste management recommendations
  if (binsNeeded > 3) {
    addRecommendation(`Consider waste reduction strategies or larger capacity bins. Your household produces approximately ${(calculatorData.people * 0.8).toFixed(1)} kg of waste per day.`);
  }
  
  // General recommendations
  addRecommendation(`Incorporating these elements into your architecture will create a more sustainable living space that offsets ${calculatorData.offsetRate}% of your CO₂ production.`);
  
  // If no plants selected
  if (calculatorData.plants.length === 0) {
    addRecommendation(`Select plants from the Plants tab to calculate your CO₂ absorption capacity.`);
  }
}