// Pest Detection JavaScript

document.addEventListener("DOMContentLoaded", () => {
  initializePestDetection()
})

function initializePestDetection() {
  const imageUploadArea = document.getElementById("imageUploadArea")
  const imageInput = document.getElementById("imageInput")
  const cameraBtn = document.getElementById("cameraBtn")
  const imagePreview = document.getElementById("imagePreview")
  const previewImg = document.getElementById("previewImg")
  const analyzeBtn = document.getElementById("analyzeBtn")
  const removeImageBtn = document.getElementById("removeImageBtn")
  const analysisProgress = document.getElementById("analysisProgress")
  const detectionResults = document.getElementById("detectionResults")
  const resultsContainer = document.getElementById("resultsContainer")

  // Camera modal elements
  const cameraModal = document.getElementById("cameraModal")
  const closeCameraBtn = document.getElementById("closeCameraBtn")
  const cameraVideo = document.getElementById("cameraVideo")
  const cameraCanvas = document.getElementById("cameraCanvas")
  const captureBtn = document.getElementById("captureBtn")

  let currentStream = null

  // Image upload handling
  if (imageUploadArea && imageInput) {
    imageUploadArea.addEventListener("click", () => imageInput.click())
    imageUploadArea.addEventListener("dragover", handleDragOver)
    imageUploadArea.addEventListener("drop", handleImageDrop)
    imageInput.addEventListener("change", handleImageSelect)
  }

  // Camera functionality
  if (cameraBtn) {
    cameraBtn.addEventListener("click", openCamera)
  }

  if (closeCameraBtn) {
    closeCameraBtn.addEventListener("click", closeCamera)
  }

  if (captureBtn) {
    captureBtn.addEventListener("click", captureImage)
  }

  // Analysis and removal buttons
  if (analyzeBtn) {
    analyzeBtn.addEventListener("click", analyzeImage)
  }

  if (removeImageBtn) {
    removeImageBtn.addEventListener("click", removeImage)
  }

  function handleDragOver(e) {
    e.preventDefault()
    imageUploadArea.classList.add("dragover")
  }

  function handleImageDrop(e) {
    e.preventDefault()
    imageUploadArea.classList.remove("dragover")
    const files = e.dataTransfer.files
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      processImage(files[0])
    }
  }

  function handleImageSelect(e) {
    const files = e.target.files
    if (files.length > 0) {
      processImage(files[0])
    }
  }

  function processImage(file) {
    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      alert("Image size should be less than 10MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      previewImg.src = e.target.result
      showImagePreview()
    }
    reader.readAsDataURL(file)
  }

  function showImagePreview() {
    imageUploadArea.style.display = "none"
    imagePreview.style.display = "block"
    analysisProgress.style.display = "none"
    detectionResults.style.display = "none"
  }

  function removeImage() {
    imageUploadArea.style.display = "block"
    imagePreview.style.display = "none"
    analysisProgress.style.display = "none"
    detectionResults.style.display = "none"
    imageInput.value = ""
    previewImg.src = ""
  }

  function openCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          currentStream = stream
          cameraVideo.srcObject = stream
          cameraModal.style.display = "flex"
        })
        .catch((error) => {
          console.error("Camera access error:", error)
          alert("Unable to access camera. Please check permissions.")
        })
    } else {
      alert("Camera not supported in this browser")
    }
  }

  function closeCamera() {
    if (currentStream) {
      currentStream.getTracks().forEach((track) => track.stop())
      currentStream = null
    }
    cameraModal.style.display = "none"
  }

  function captureImage() {
    const context = cameraCanvas.getContext("2d")
    cameraCanvas.width = cameraVideo.videoWidth
    cameraCanvas.height = cameraVideo.videoHeight
    context.drawImage(cameraVideo, 0, 0)

    cameraCanvas.toBlob((blob) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        previewImg.src = e.target.result
        showImagePreview()
        closeCamera()
      }
      reader.readAsDataURL(blob)
    })
  }

  function analyzeImage() {
    analysisProgress.style.display = "block"
    detectionResults.style.display = "none"

    // Animate progress bar
    const progressFill = document.querySelector(".progress-fill")
    let progress = 0
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15
      if (progress > 100) progress = 100
      progressFill.style.width = progress + "%"

      if (progress >= 100) {
        clearInterval(progressInterval)
        setTimeout(() => {
          analysisProgress.style.display = "none"
          showDetectionResults()
        }, 1000)
      }
    }, 200)
  }

  function showDetectionResults() {
    detectionResults.style.display = "block"

    // Simulate AI detection results
    const results = generateDetectionResults()
    displayDetectionResults(results)
  }

  function generateDetectionResults() {
    const pests = [
      { name: "Aphids", confidence: 85, severity: "High", treatment: "Neem oil spray or insecticidal soap" },
      { name: "Whitefly", confidence: 72, severity: "Medium", treatment: "Yellow sticky traps and neem oil" },
      {
        name: "Spider Mites",
        confidence: 45,
        severity: "Low",
        treatment: "Increase humidity and use miticide if needed",
      },
    ]

    const diseases = [
      {
        name: "Powdery Mildew",
        confidence: 78,
        severity: "Medium",
        treatment: "Fungicide spray and improve air circulation",
      },
      {
        name: "Leaf Spot",
        confidence: 65,
        severity: "Medium",
        treatment: "Remove affected leaves and apply copper fungicide",
      },
    ]

    const deficiencies = [
      { name: "Nitrogen Deficiency", confidence: 60, severity: "Medium", treatment: "Apply nitrogen-rich fertilizer" },
    ]

    return {
      pests: pests.filter((p) => p.confidence > 50),
      diseases: diseases.filter((d) => d.confidence > 50),
      deficiencies: deficiencies.filter((d) => d.confidence > 50),
      overallHealth: Math.round(Math.random() * 40 + 60), // 60-100%
    }
  }

  function displayDetectionResults(results) {
    let html = `
            <div class="detection-summary">
                <div class="health-score">
                    <div class="score-circle">
                        <div class="score-value">${results.overallHealth}%</div>
                        <div class="score-label">Plant Health</div>
                    </div>
                </div>
                <div class="detection-stats">
                    <div class="stat-item">
                        <div class="stat-number">${results.pests.length}</div>
                        <div class="stat-label">Pests Detected</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${results.diseases.length}</div>
                        <div class="stat-label">Diseases Found</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${results.deficiencies.length}</div>
                        <div class="stat-label">Deficiencies</div>
                    </div>
                </div>
            </div>
        `

    if (results.pests.length > 0) {
      html += `
                <div class="detection-category">
                    <h3><i class="fas fa-bug"></i> Pest Detection</h3>
                    <div class="detection-list">
            `
      results.pests.forEach((pest) => {
        html += createDetectionItem(pest, "pest")
      })
      html += `</div></div>`
    }

    if (results.diseases.length > 0) {
      html += `
                <div class="detection-category">
                    <h3><i class="fas fa-virus"></i> Disease Detection</h3>
                    <div class="detection-list">
            `
      results.diseases.forEach((disease) => {
        html += createDetectionItem(disease, "disease")
      })
      html += `</div></div>`
    }

    if (results.deficiencies.length > 0) {
      html += `
                <div class="detection-category">
                    <h3><i class="fas fa-leaf"></i> Nutrient Deficiencies</h3>
                    <div class="detection-list">
            `
      results.deficiencies.forEach((deficiency) => {
        html += createDetectionItem(deficiency, "deficiency")
      })
      html += `</div></div>`
    }

    html += `
            <div class="treatment-plan">
                <h3><i class="fas fa-prescription-bottle-alt"></i> Recommended Treatment Plan</h3>
                <div class="treatment-steps">
                    <div class="treatment-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>Immediate Action</h4>
                            <p>Remove severely affected leaves and isolate the plant if possible.</p>
                        </div>
                    </div>
                    <div class="treatment-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>Treatment Application</h4>
                            <p>Apply recommended treatments based on detected issues. Follow product instructions carefully.</p>
                        </div>
                    </div>
                    <div class="treatment-step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4>Monitor Progress</h4>
                            <p>Check plant condition daily and reapply treatments as needed. Take photos to track improvement.</p>
                        </div>
                    </div>
                </div>
                <div class="treatment-actions">
                    <button class="btn btn-primary" onclick="downloadTreatmentPlan()">
                        <i class="fas fa-download"></i>
                        Download Treatment Plan
                    </button>
                    <button class="btn btn-secondary" onclick="setReminder()">
                        <i class="fas fa-bell"></i>
                        Set Treatment Reminder
                    </button>
                </div>
            </div>
        `

    resultsContainer.innerHTML = html

    // Animate health score
    const scoreElement = document.querySelector(".score-value")
    if (scoreElement) {
      animateValue(scoreElement, 0, results.overallHealth, 2000)
    }
  }

  function createDetectionItem(item, type) {
    const severityClass = item.severity.toLowerCase()
    const confidenceWidth = item.confidence

    return `
            <div class="detection-item ${type} severity-${severityClass}">
                <div class="detection-header">
                    <h4>${item.name}</h4>
                    <div class="severity-badge ${severityClass}">${item.severity}</div>
                </div>
                <div class="confidence-section">
                    <span>Confidence: ${item.confidence}%</span>
                    <div class="confidence-bar">
                        <div class="confidence-fill" style="width: ${confidenceWidth}%"></div>
                    </div>
                </div>
                <div class="treatment-info">
                    <strong>Treatment:</strong> ${item.treatment}
                </div>
            </div>
        `
  }

  // Global functions for treatment plan actions
  window.downloadTreatmentPlan = () => {
    // Simulate download
    const link = document.createElement("a")
    link.href =
      "data:text/plain;charset=utf-8,Treatment Plan\n\nDetected Issues:\n- See analysis results\n\nRecommended Actions:\n- Follow treatment steps\n\nMonitoring Schedule:\n- Daily checks for 1 week"
    link.download = "treatment-plan.txt"
    link.click()
  }

  window.setReminder = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setTimeout(
            () => {
              new Notification("Treatment Reminder", {
                body: "Time to check your plants and apply treatment if needed.",
                icon: "/favicon.ico",
              })
            },
            24 * 60 * 60 * 1000,
          ) // 24 hours
          alert("Reminder set for 24 hours from now!")
        }
      })
    } else {
      alert("Notifications not supported in this browser")
    }
  }

  // Declare animateValue function
  function animateValue(element, start, end, duration) {
    let startTimestamp = null
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      element.textContent = Math.floor(progress * (end - start) + start) + "%"
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }
}
