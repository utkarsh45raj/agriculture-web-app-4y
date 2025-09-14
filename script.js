// Common JavaScript functionality for all pages

// Mobile Navigation
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })
  }

  // Initialize page-specific functionality
  initializePageFeatures()
})

function initializePageFeatures() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"

  switch (currentPage) {
    case "index.html":
    case "":
      initializeHomePage()
      break
    case "soil-health.html":
      // Soil health functionality is in soil-health.js
      break
    case "pest-detection.html":
      // Pest detection functionality is in pest-detection.js
      break
    case "market-prices.html":
      // Market prices functionality is in market-prices.js
      break
  }
}

function initializeHomePage() {
  initializeChatbot()
  initializeWeather()
  initializeCropAdvisory()
}

// Chatbot functionality
function initializeChatbot() {
  const chatInput = document.getElementById("chatInput")
  const sendButton = document.getElementById("sendMessage")
  const voiceButton = document.getElementById("voiceInput")
  const voiceToggle = document.getElementById("voiceToggle")
  const chatMessages = document.getElementById("chatMessages")

  let isListening = false
  let voiceEnabled = false
  let recognition = null

  // Initialize speech recognition if available
  if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      chatInput.value = transcript
      sendMessage()
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      stopListening()
    }

    recognition.onend = () => {
      stopListening()
    }
  }

  // Voice toggle
  if (voiceToggle) {
    voiceToggle.addEventListener("click", () => {
      voiceEnabled = !voiceEnabled
      voiceToggle.innerHTML = voiceEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>'
    })
  }

  // Send message
  if (sendButton) {
    sendButton.addEventListener("click", sendMessage)
  }

  if (chatInput) {
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage()
      }
    })
  }

  // Voice input
  if (voiceButton && recognition) {
    voiceButton.addEventListener("click", () => {
      if (isListening) {
        stopListening()
      } else {
        startListening()
      }
    })
  }

  function startListening() {
    if (recognition) {
      isListening = true
      voiceButton.classList.add("recording")
      voiceButton.innerHTML = '<i class="fas fa-stop"></i>'
      recognition.start()
    }
  }

  function stopListening() {
    if (recognition) {
      isListening = false
      voiceButton.classList.remove("recording")
      voiceButton.innerHTML = '<i class="fas fa-microphone"></i>'
      recognition.stop()
    }
  }

  function sendMessage() {
    const message = chatInput.value.trim()
    if (!message) return

    // Add user message
    addMessage(message, "user")
    chatInput.value = ""

    // Simulate bot response
    setTimeout(() => {
      const response = generateBotResponse(message)
      addMessage(response, "bot")

      // Text-to-speech if enabled
      if (voiceEnabled && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(response)
        speechSynthesis.speak(utterance)
      }
    }, 1000)
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${sender}-message`
    messageDiv.innerHTML = `<div class="message-content">${text}</div>`
    chatMessages.appendChild(messageDiv)
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  function generateBotResponse(message) {
    const responses = {
      weather:
        "Current weather conditions show partly cloudy skies with 25°C temperature. Perfect for most farming activities!",
      crop: "Based on your location and season, I recommend planting winter vegetables like cabbage and cauliflower.",
      soil: "For soil health, consider testing pH levels and organic matter content. I can help you analyze soil reports.",
      pest: "Common pests this season include aphids and whiteflies. Upload plant images for detailed pest identification.",
      price:
        "Current market prices show wheat at ₹2,750/quintal. Check the Market Prices section for detailed information.",
      fertilizer:
        "NPK fertilizers are recommended based on soil analysis. Upload your soil test report for specific recommendations.",
    }

    const lowerMessage = message.toLowerCase()
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response
      }
    }

    return "I'm here to help with agriculture-related questions. You can ask about weather, crops, soil health, pest detection, or market prices!"
  }
}

// Weather functionality
function initializeWeather() {
  const locationBtn = document.getElementById("locationBtn")
  const forecastGrid = document.getElementById("forecastGrid")

  if (locationBtn) {
    locationBtn.addEventListener("click", () => {
      getLocation()
    })
  }

  // Initialize forecast
  generateForecast()

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude
          updateWeatherData(lat, lon)
        },
        (error) => {
          console.error("Geolocation error:", error)
          // Use default location
          updateWeatherData(28.6139, 77.209) // Delhi
        },
      )
    }
  }

  function updateWeatherData(lat, lon) {
    // Simulate weather API call
    const weatherData = {
      temperature: Math.round(20 + Math.random() * 15),
      description: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain"][Math.floor(Math.random() * 4)],
      humidity: Math.round(40 + Math.random() * 40),
      wind: Math.round(5 + Math.random() * 15),
      rainfall: Math.round(Math.random() * 10),
    }

    // Update weather display
    document.querySelector(".temperature").textContent = `${weatherData.temperature}°C`
    document.querySelector(".weather-desc").textContent = weatherData.description
    document.querySelector(".detail-item:nth-child(1) span:last-child").textContent = `${weatherData.humidity}%`
    document.querySelector(".detail-item:nth-child(2) span:last-child").textContent = `${weatherData.wind} km/h`
    document.querySelector(".detail-item:nth-child(3) span:last-child").textContent = `${weatherData.rainfall}mm`
  }

  function generateForecast() {
    if (!forecastGrid) return

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const icons = ["☀️", "⛅", "☁️", "🌧️"]

    forecastGrid.innerHTML = ""

    for (let i = 0; i < 7; i++) {
      const temp = Math.round(20 + Math.random() * 10)
      const icon = icons[Math.floor(Math.random() * icons.length)]

      const forecastItem = document.createElement("div")
      forecastItem.className = "forecast-item"
      forecastItem.innerHTML = `
                <div>${days[i]}</div>
                <div style="font-size: 1.5rem; margin: 0.5rem 0;">${icon}</div>
                <div>${temp}°C</div>
            `

      forecastGrid.appendChild(forecastItem)
    }
  }

  // Auto-refresh weather every 5 minutes
  setInterval(() => {
    getLocation()
  }, 300000)
}

// Crop Advisory functionality
function initializeCropAdvisory() {
  const currentLocation = document.getElementById("currentLocation")

  if (currentLocation) {
    // Simulate location detection
    setTimeout(() => {
      currentLocation.textContent = "Punjab, India"
    }, 2000)
  }

  // Simulate real-time advisory updates
  setInterval(updateAdvisory, 30000)
}

function updateAdvisory() {
  // This would typically fetch real-time advisory data
  console.log("Advisory updated")
}

// Utility functions
function showLoading(element) {
  element.innerHTML = '<div class="loading"></div>'
}

function showError(element, message) {
  element.innerHTML = `<div class="message-error">${message}</div>`
}

function showSuccess(element, message) {
  element.innerHTML = `<div class="message-success">${message}</div>`
}

// Form validation
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll("input[required], select[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.style.borderColor = "var(--error)"
      isValid = false
    } else {
      input.style.borderColor = "var(--border)"
    }
  })

  return isValid
}

// Animation utilities
function animateValue(element, start, end, duration) {
  let startTimestamp = null
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp
    const progress = Math.min((timestamp - startTimestamp) / duration, 1)
    const value = Math.floor(progress * (end - start) + start)
    element.textContent = value
    if (progress < 1) {
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}
