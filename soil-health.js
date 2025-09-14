// Soil Health Analysis JavaScript

document.addEventListener("DOMContentLoaded", () => {
  initializeSoilHealth()
})

function initializeSoilHealth() {
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")
  const soilForm = document.getElementById("soilForm")
  const uploadArea = document.getElementById("uploadArea")
  const fileInput = document.getElementById("fileInput")
  const uploadedFile = document.getElementById("uploadedFile")
  const fileName = document.getElementById("fileName")
  const removeFile = document.getElementById("removeFile")

  // Tab switching
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabName = this.dataset.tab
      switchTab(tabName)
    })
  })

  // Soil form submission
  if (soilForm) {
    soilForm.addEventListener("submit", function (e) {
      e.preventDefault()
      if (validateForm(this)) {
        analyzeSoil()
      }
    })
  }

  // File upload handling
  if (uploadArea && fileInput) {
    uploadArea.addEventListener("click", () => fileInput.click())
    uploadArea.addEventListener("dragover", handleDragOver)
    uploadArea.addEventListener("drop", handleFileDrop)
    fileInput.addEventListener("change", handleFileSelect)
  }

  if (removeFile) {
    removeFile.addEventListener("click", clearUploadedFile)
  }

  function switchTab(tabName) {
    // Update tab buttons
    tabButtons.forEach((btn) => btn.classList.remove("active"))
    document.querySelector(`[data-tab="${tabName}"]`).classList.add("active")

    // Update tab content
    tabContents.forEach((content) => content.classList.remove("active"))
    document.getElementById(`${tabName}Tab`).classList.add("active")
  }

  function handleDragOver(e) {
    e.preventDefault()
    uploadArea.classList.add("dragover")
  }

  function handleFileDrop(e) {
    e.preventDefault()
    uploadArea.classList.remove("dragover")
    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFile(files[0])
    }
  }

  function handleFileSelect(e) {
    const files = e.target.files
    if (files.length > 0) {
      processFile(files[0])
    }
  }

  function processFile(file) {
    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      alert("File size should be less than 10MB")
      return
    }

    fileName.textContent = file.name
    uploadedFile.style.display = "flex"
    uploadArea.style.display = "none"

    // Simulate file processing and data extraction
    setTimeout(() => {
      extractDataFromFile(file)
    }, 2000)
  }

  function extractDataFromFile(file) {
    // Simulate OCR/data extraction from soil test report
    const extractedData = {
      cropType: "wheat",
      ph: (6.0 + Math.random() * 2).toFixed(1),
      nitrogen: Math.round(80 + Math.random() * 80),
      phosphorus: Math.round(15 + Math.random() * 30),
      potassium: Math.round(120 + Math.random() * 120),
      organicMatter: (1.5 + Math.random() * 2).toFixed(1),
      moisture: (10 + Math.random() * 15).toFixed(1),
    }

    // Fill form with extracted data
    document.getElementById("cropType").value = extractedData.cropType
    document.getElementById("ph").value = extractedData.ph
    document.getElementById("nitrogen").value = extractedData.nitrogen
    document.getElementById("phosphorus").value = extractedData.phosphorus
    document.getElementById("potassium").value = extractedData.potassium
    document.getElementById("organicMatter").value = extractedData.organicMatter
    document.getElementById("moisture").value = extractedData.moisture

    // Switch to manual tab and analyze
    switchTab("manual")
    setTimeout(analyzeSoil, 1000)
  }

  function clearUploadedFile() {
    uploadedFile.style.display = "none"
    uploadArea.style.display = "block"
    fileInput.value = ""
  }

  function analyzeSoil() {
    const formData = new FormData(soilForm)
    const soilData = {
      cropType: document.getElementById("cropType").value,
      ph: Number.parseFloat(document.getElementById("ph").value),
      nitrogen: Number.parseInt(document.getElementById("nitrogen").value),
      phosphorus: Number.parseInt(document.getElementById("phosphorus").value),
      potassium: Number.parseInt(document.getElementById("potassium").value),
      organicMatter: Number.parseFloat(document.getElementById("organicMatter").value),
      moisture: Number.parseFloat(document.getElementById("moisture").value),
    }

    // Show results section
    const resultsSection = document.getElementById("resultsSection")
    const analysisResults = document.getElementById("analysisResults")

    resultsSection.style.display = "block"
    showLoading(analysisResults)

    // Simulate analysis
    setTimeout(() => {
      const results = generateSoilAnalysis(soilData)
      displayResults(results)
    }, 3000)
  }

  function generateSoilAnalysis(data) {
    const analysis = {
      soilHealth: calculateSoilHealth(data),
      recommendations: generateRecommendations(data),
      fertilizers: generateFertilizerPlan(data),
      warnings: generateWarnings(data),
    }

    return analysis
  }

  function calculateSoilHealth(data) {
    let score = 0
    const factors = []

    // pH analysis
    if (data.ph >= 6.0 && data.ph <= 7.5) {
      score += 25
      factors.push({ name: "pH Level", status: "Optimal", value: data.ph })
    } else if (data.ph < 6.0) {
      score += 15
      factors.push({ name: "pH Level", status: "Acidic", value: data.ph })
    } else {
      score += 10
      factors.push({ name: "pH Level", status: "Alkaline", value: data.ph })
    }

    // Nitrogen analysis
    if (data.nitrogen >= 100) {
      score += 25
      factors.push({ name: "Nitrogen", status: "Sufficient", value: `${data.nitrogen} mg/kg` })
    } else {
      score += 10
      factors.push({ name: "Nitrogen", status: "Deficient", value: `${data.nitrogen} mg/kg` })
    }

    // Phosphorus analysis
    if (data.phosphorus >= 20) {
      score += 25
      factors.push({ name: "Phosphorus", status: "Sufficient", value: `${data.phosphorus} mg/kg` })
    } else {
      score += 10
      factors.push({ name: "Phosphorus", status: "Deficient", value: `${data.phosphorus} mg/kg` })
    }

    // Potassium analysis
    if (data.potassium >= 150) {
      score += 25
      factors.push({ name: "Potassium", status: "Sufficient", value: `${data.potassium} mg/kg` })
    } else {
      score += 10
      factors.push({ name: "Potassium", status: "Deficient", value: `${data.potassium} mg/kg` })
    }

    return { score, factors }
  }

  function generateRecommendations(data) {
    const recommendations = []

    if (data.ph < 6.0) {
      recommendations.push({
        priority: "high",
        title: "Soil pH Correction",
        description: "Apply lime to increase soil pH. Recommended: 2-3 tons/hectare of agricultural lime.",
        cost: "₹8,000 - ₹12,000 per hectare",
      })
    }

    if (data.nitrogen < 100) {
      recommendations.push({
        priority: "high",
        title: "Nitrogen Supplementation",
        description: "Apply nitrogen-rich fertilizers. Recommended: Urea 150-200 kg/hectare.",
        cost: "₹3,000 - ₹4,000 per hectare",
      })
    }

    if (data.phosphorus < 20) {
      recommendations.push({
        priority: "medium",
        title: "Phosphorus Enhancement",
        description: "Apply DAP or SSP fertilizer. Recommended: 100-150 kg/hectare.",
        cost: "₹2,500 - ₹3,500 per hectare",
      })
    }

    if (data.organicMatter < 2.0) {
      recommendations.push({
        priority: "medium",
        title: "Organic Matter Improvement",
        description: "Add compost or farmyard manure. Recommended: 5-10 tons/hectare.",
        cost: "₹5,000 - ₹8,000 per hectare",
      })
    }

    return recommendations
  }

  function generateFertilizerPlan(data) {
    const plan = {
      primary: [],
      secondary: [],
      micronutrients: [],
    }

    // Primary nutrients (NPK)
    if (data.nitrogen < 100) {
      plan.primary.push({
        name: "Urea (46% N)",
        quantity: "150-200 kg/hectare",
        timing: "Split application: 50% at sowing, 25% at tillering, 25% at flowering",
        cost: "₹3,000 - ₹4,000",
      })
    }

    if (data.phosphorus < 20) {
      plan.primary.push({
        name: "DAP (18-46-0)",
        quantity: "100-150 kg/hectare",
        timing: "Full dose at sowing",
        cost: "₹2,500 - ₹3,500",
      })
    }

    if (data.potassium < 150) {
      plan.primary.push({
        name: "MOP (60% K2O)",
        quantity: "50-75 kg/hectare",
        timing: "Full dose at sowing",
        cost: "₹1,500 - ₹2,000",
      })
    }

    // Secondary nutrients
    plan.secondary.push({
      name: "Gypsum (Calcium Sulfate)",
      quantity: "200-300 kg/hectare",
      timing: "Apply before sowing",
      cost: "₹1,000 - ₹1,500",
    })

    // Micronutrients
    plan.micronutrients.push({
      name: "Zinc Sulfate",
      quantity: "25 kg/hectare",
      timing: "Soil application or foliar spray",
      cost: "₹500 - ₹750",
    })

    return plan
  }

  function generateWarnings(data) {
    const warnings = []

    if (data.ph > 8.5) {
      warnings.push({
        type: "warning",
        message: "High alkalinity may cause nutrient lockup. Consider sulfur application.",
      })
    }

    if (data.moisture < 10) {
      warnings.push({
        type: "alert",
        message: "Low soil moisture detected. Ensure adequate irrigation before fertilizer application.",
      })
    }

    if (data.organicMatter < 1.0) {
      warnings.push({
        type: "warning",
        message: "Very low organic matter. Soil structure and water retention may be poor.",
      })
    }

    return warnings
  }

  function displayResults(results) {
    const analysisResults = document.getElementById("analysisResults")

    let html = `
            <div class="soil-health-score">
                <div class="score-circle">
                    <div class="score-value">${results.soilHealth.score}</div>
                    <div class="score-label">Soil Health Score</div>
                </div>
                <div class="score-description">
                    ${getScoreDescription(results.soilHealth.score)}
                </div>
            </div>

            <div class="health-factors">
                <h3>Soil Analysis Factors</h3>
                <div class="factors-grid">
        `

    results.soilHealth.factors.forEach((factor) => {
      const statusClass = factor.status.toLowerCase().replace(" ", "-")
      html += `
                <div class="factor-item ${statusClass}">
                    <div class="factor-name">${factor.name}</div>
                    <div class="factor-value">${factor.value}</div>
                    <div class="factor-status">${factor.status}</div>
                </div>
            `
    })

    html += `
                </div>
            </div>

            <div class="recommendations-section">
                <h3>Recommendations</h3>
                <div class="recommendations-list">
        `

    results.recommendations.forEach((rec) => {
      html += `
                <div class="recommendation-item priority-${rec.priority}">
                    <div class="rec-header">
                        <h4>${rec.title}</h4>
                        <span class="priority-badge">${rec.priority.toUpperCase()}</span>
                    </div>
                    <p>${rec.description}</p>
                    <div class="rec-cost">Estimated Cost: ${rec.cost}</div>
                </div>
            `
    })

    html += `
                </div>
            </div>

            <div class="fertilizer-plan">
                <h3>Fertilizer Application Plan</h3>
        `

    if (results.fertilizers.primary.length > 0) {
      html += `
                <div class="fertilizer-category">
                    <h4>Primary Nutrients (NPK)</h4>
                    <div class="fertilizer-list">
            `
      results.fertilizers.primary.forEach((fert) => {
        html += `
                    <div class="fertilizer-item">
                        <div class="fert-name">${fert.name}</div>
                        <div class="fert-details">
                            <div><strong>Quantity:</strong> ${fert.quantity}</div>
                            <div><strong>Timing:</strong> ${fert.timing}</div>
                            <div><strong>Cost:</strong> ${fert.cost}</div>
                        </div>
                    </div>
                `
      })
      html += `</div></div>`
    }

    html += `</div>`

    if (results.warnings.length > 0) {
      html += `
                <div class="warnings-section">
                    <h3>Important Notes</h3>
            `
      results.warnings.forEach((warning) => {
        html += `
                    <div class="warning-item ${warning.type}">
                        <i class="fas fa-exclamation-triangle"></i>
                        ${warning.message}
                    </div>
                `
      })
      html += `</div>`
    }

    analysisResults.innerHTML = html

    // Animate score
    const scoreElement = document.querySelector(".score-value")
    animateValue(scoreElement, 0, results.soilHealth.score, 2000)
  }

  function getScoreDescription(score) {
    if (score >= 80) return "Excellent soil health with optimal nutrient levels"
    if (score >= 60) return "Good soil health with minor improvements needed"
    if (score >= 40) return "Fair soil health requiring attention"
    return "Poor soil health needing immediate intervention"
  }

  function validateForm(form) {
    // Implement form validation logic here
    return true // Placeholder for validation result
  }

  function showLoading(element) {
    element.innerHTML = '<div class="loading-spinner"></div>'
  }

  function animateValue(element, start, end, duration) {
    let startTimestamp = null
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      element.textContent = Math.floor(progress * (end - start) + start)
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }
}
