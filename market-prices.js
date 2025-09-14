// Market Prices JavaScript

document.addEventListener("DOMContentLoaded", () => {
  initializeMarketPrices()
})

function initializeMarketPrices() {
  const stateSelect = document.getElementById("stateSelect")
  const mandiSelect = document.getElementById("mandiSelect")
  const cropSelect = document.getElementById("cropSelect")
  const searchPricesBtn = document.getElementById("searchPricesBtn")
  const refreshPricesBtn = document.getElementById("refreshPricesBtn")
  const pricesSection = document.getElementById("pricesSection")
  const trendsSection = document.getElementById("trendsSection")
  const pricesContainer = document.getElementById("pricesContainer")
  const alertForm = document.getElementById("alertForm")
  const activeAlerts = document.getElementById("activeAlerts")

  // Market data
  const marketData = {
    punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
    haryana: ["Karnal", "Hisar", "Panipat", "Rohtak", "Sirsa"],
    "uttar-pradesh": ["Meerut", "Agra", "Kanpur", "Lucknow", "Varanasi"],
    maharashtra: ["Mumbai", "Pune", "Nashik", "Aurangabad", "Nagpur"],
    gujarat: ["Ahmedabad", "Rajkot", "Surat", "Vadodara", "Bhavnagar"],
  }

  let currentPriceData = null
  const priceChart = null

  // Event listeners
  if (stateSelect) {
    stateSelect.addEventListener("change", updateMandiOptions)
  }

  if (searchPricesBtn) {
    searchPricesBtn.addEventListener("click", searchPrices)
  }

  if (refreshPricesBtn) {
    refreshPricesBtn.addEventListener("click", refreshPrices)
  }

  if (alertForm) {
    alertForm.addEventListener("submit", setPriceAlert)
  }

  function updateMandiOptions() {
    const selectedState = stateSelect.value
    mandiSelect.innerHTML = '<option value="">Select Mandi</option>'

    if (selectedState && marketData[selectedState]) {
      marketData[selectedState].forEach((mandi) => {
        const option = document.createElement("option")
        option.value = mandi.toLowerCase().replace(" ", "-")
        option.textContent = mandi
        mandiSelect.appendChild(option)
      })
    }
  }

  function searchPrices() {
    const state = stateSelect.value
    const mandi = mandiSelect.value
    const crop = cropSelect.value

    if (!state || !mandi || !crop) {
      alert("Please select state, mandi, and crop")
      return
    }

    showLoading(pricesContainer)
    pricesSection.style.display = "block"
    trendsSection.style.display = "block"

    // Simulate API call
    setTimeout(() => {
      currentPriceData = generatePriceData(crop, mandi)
      displayPrices(currentPriceData)
      updateTrends(currentPriceData)
    }, 2000)
  }

  function refreshPrices() {
    if (currentPriceData) {
      showLoading(pricesContainer)
      setTimeout(() => {
        // Simulate price fluctuation
        currentPriceData.currentPrice += Math.round((Math.random() - 0.5) * 100)
        currentPriceData.lastUpdated = new Date().toLocaleTimeString()
        displayPrices(currentPriceData)
      }, 1000)
    }
  }

  function generatePriceData(crop, mandi) {
    const basePrice = {
      wheat: 2750,
      rice: 3200,
      corn: 2100,
      tomato: 1800,
      onion: 1200,
      potato: 1500,
    }

    const currentPrice = basePrice[crop] + Math.round((Math.random() - 0.5) * 300)
    const yesterdayPrice = currentPrice + Math.round((Math.random() - 0.5) * 150)
    const weekAgoPrice = currentPrice + Math.round((Math.random() - 0.5) * 400)

    return {
      crop: crop.charAt(0).toUpperCase() + crop.slice(1),
      mandi: mandi.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      currentPrice: currentPrice,
      yesterdayPrice: yesterdayPrice,
      weekAgoPrice: weekAgoPrice,
      minPrice: currentPrice - Math.round(Math.random() * 200),
      maxPrice: currentPrice + Math.round(Math.random() * 300),
      lastUpdated: new Date().toLocaleTimeString(),
      trend: Math.random() > 0.5 ? "up" : "down",
      volume: Math.round(Math.random() * 500 + 100) + " quintals",
    }
  }

  function displayPrices(data) {
    const dailyChange = data.currentPrice - data.yesterdayPrice
    const weeklyChange = data.currentPrice - data.weekAgoPrice
    const dailyChangePercent = ((dailyChange / data.yesterdayPrice) * 100).toFixed(1)
    const weeklyChangePercent = ((weeklyChange / data.weekAgoPrice) * 100).toFixed(1)

    const html = `
            <div class="price-header">
                <div class="price-main">
                    <h3>${data.crop} - ${data.mandi}</h3>
                    <div class="current-price">₹${data.currentPrice.toLocaleString()}/quintal</div>
                    <div class="price-change ${dailyChange >= 0 ? "positive" : "negative"}">
                        <i class="fas fa-arrow-${dailyChange >= 0 ? "up" : "down"}"></i>
                        ₹${Math.abs(dailyChange)} (${dailyChangePercent}%) from yesterday
                    </div>
                </div>
                <div class="price-meta">
                    <div class="meta-item">
                        <span>Volume Traded</span>
                        <span>${data.volume}</span>
                    </div>
                    <div class="meta-item">
                        <span>Last Updated</span>
                        <span>${data.lastUpdated}</span>
                    </div>
                </div>
            </div>

            <div class="price-details">
                <div class="price-range">
                    <h4>Today's Range</h4>
                    <div class="range-bar">
                        <div class="range-min">₹${data.minPrice.toLocaleString()}</div>
                        <div class="range-indicator">
                            <div class="range-line"></div>
                            <div class="current-marker" style="left: ${((data.currentPrice - data.minPrice) / (data.maxPrice - data.minPrice)) * 100}%"></div>
                        </div>
                        <div class="range-max">₹${data.maxPrice.toLocaleString()}</div>
                    </div>
                </div>

                <div class="price-comparison">
                    <h4>Price Comparison</h4>
                    <div class="comparison-grid">
                        <div class="comparison-item">
                            <span>Yesterday</span>
                            <span>₹${data.yesterdayPrice.toLocaleString()}</span>
                        </div>
                        <div class="comparison-item">
                            <span>Week Ago</span>
                            <span>₹${data.weekAgoPrice.toLocaleString()}</span>
                        </div>
                        <div class="comparison-item">
                            <span>Weekly Change</span>
                            <span class="${weeklyChange >= 0 ? "positive" : "negative"}">
                                ${weeklyChangePercent}%
                            </span>
                        </div>
                    </div>
                </div>

                <div class="nearby-markets">
                    <h4>Nearby Markets</h4>
                    <div class="markets-list">
                        ${generateNearbyMarkets(data)}
                    </div>
                </div>
            </div>
        `

    pricesContainer.innerHTML = html
  }

  function generateNearbyMarkets(data) {
    const nearbyMarkets = [
      { name: "Market A", price: data.currentPrice + Math.round((Math.random() - 0.5) * 200), distance: "15 km" },
      { name: "Market B", price: data.currentPrice + Math.round((Math.random() - 0.5) * 200), distance: "28 km" },
      { name: "Market C", price: data.currentPrice + Math.round((Math.random() - 0.5) * 200), distance: "35 km" },
    ]

    return nearbyMarkets
      .map((market) => {
        const priceDiff = market.price - data.currentPrice
        const diffClass = priceDiff >= 0 ? "higher" : "lower"
        return `
                <div class="market-item">
                    <div class="market-info">
                        <span class="market-name">${market.name}</span>
                        <span class="market-distance">${market.distance}</span>
                    </div>
                    <div class="market-price ${diffClass}">
                        ₹${market.price.toLocaleString()}
                        <small>(${priceDiff >= 0 ? "+" : ""}₹${priceDiff})</small>
                    </div>
                </div>
            `
      })
      .join("")
  }

  function updateTrends(data) {
    // Generate 7-day price history
    const priceHistory = []
    let price = data.weekAgoPrice

    for (let i = 6; i >= 0; i--) {
      price += Math.round((Math.random() - 0.5) * 100)
      priceHistory.push(price)
    }
    priceHistory[6] = data.currentPrice // Ensure current price is accurate

    // Update trend summary
    const weeklyChange = (((data.currentPrice - data.weekAgoPrice) / data.weekAgoPrice) * 100).toFixed(1)
    const monthlyChange = (
      ((data.currentPrice - (data.currentPrice - Math.round((Math.random() - 0.5) * 500))) / data.currentPrice) *
      100
    ).toFixed(1)
    const highestPrice = Math.max(...priceHistory)
    const lowestPrice = Math.min(...priceHistory)

    document.getElementById("weeklyChange").textContent = `${weeklyChange >= 0 ? "+" : ""}${weeklyChange}%`
    document.getElementById("weeklyChange").className = `trend-value ${weeklyChange >= 0 ? "positive" : "negative"}`

    document.getElementById("monthlyChange").textContent = `${monthlyChange >= 0 ? "+" : ""}${monthlyChange}%`
    document.getElementById("monthlyChange").className = `trend-value ${monthlyChange >= 0 ? "positive" : "negative"}`

    document.getElementById("highestPrice").textContent = `₹${highestPrice.toLocaleString()}`
    document.getElementById("lowestPrice").textContent = `₹${lowestPrice.toLocaleString()}`

    // Draw simple price chart
    drawPriceChart(priceHistory)
  }

  function drawPriceChart(priceHistory) {
    const canvas = document.getElementById("priceChart")
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Calculate chart dimensions
    const padding = 40
    const chartWidth = width - 2 * padding
    const chartHeight = height - 2 * padding

    const minPrice = Math.min(...priceHistory)
    const maxPrice = Math.max(...priceHistory)
    const priceRange = maxPrice - minPrice || 1

    // Draw grid lines
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = padding + (i * chartHeight) / 4
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Vertical grid lines
    for (let i = 0; i <= 6; i++) {
      const x = padding + (i * chartWidth) / 6
      ctx.beginPath()
      ctx.moveTo(x, padding)
      ctx.lineTo(x, height - padding)
      ctx.stroke()
    }

    // Draw price line
    ctx.strokeStyle = "#059669"
    ctx.lineWidth = 3
    ctx.beginPath()

    priceHistory.forEach((price, index) => {
      const x = padding + (index * chartWidth) / 6
      const y = height - padding - ((price - minPrice) / priceRange) * chartHeight

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw price points
    ctx.fillStyle = "#059669"
    priceHistory.forEach((price, index) => {
      const x = padding + (index * chartWidth) / 6
      const y = height - padding - ((price - minPrice) / priceRange) * chartHeight

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
    })

    // Draw labels
    ctx.fillStyle = "#64748b"
    ctx.font = "12px Arial"
    ctx.textAlign = "center"

    // Day labels
    const days = ["6d ago", "5d ago", "4d ago", "3d ago", "2d ago", "Yesterday", "Today"]
    days.forEach((day, index) => {
      const x = padding + (index * chartWidth) / 6
      ctx.fillText(day, x, height - 10)
    })

    // Price labels
    ctx.textAlign = "right"
    for (let i = 0; i <= 4; i++) {
      const price = minPrice + (i * priceRange) / 4
      const y = height - padding - (i * chartHeight) / 4
      ctx.fillText(`₹${Math.round(price)}`, padding - 10, y + 4)
    }
  }

  function setPriceAlert(e) {
    e.preventDefault()

    const crop = document.getElementById("alertCrop").value
    const targetPrice = document.getElementById("targetPrice").value

    if (!targetPrice) {
      alert("Please enter target price")
      return
    }

    const priceAlert = {
      id: Date.now(),
      crop: crop,
      targetPrice: Number.parseInt(targetPrice),
      createdAt: new Date().toLocaleDateString(),
    }

    // Store alert (in real app, this would be saved to backend)
    const alerts = JSON.parse(localStorage.getItem("priceAlerts") || "[]")
    alerts.push(priceAlert)
    localStorage.setItem("priceAlerts", JSON.stringify(alerts))

    displayActiveAlerts()
    document.getElementById("targetPrice").value = ""

    showSuccess(document.querySelector(".alerts-container"), "Price alert set successfully!")
  }

  function displayActiveAlerts() {
    const alerts = JSON.parse(localStorage.getItem("priceAlerts") || "[]")

    if (alerts.length === 0) {
      activeAlerts.innerHTML = '<p class="no-alerts">No active alerts</p>'
      return
    }

    const html = alerts
      .map(
        (alert) => `
            <div class="alert-item">
                <div class="alert-info">
                    <span class="alert-crop">${alert.crop.charAt(0).toUpperCase() + alert.crop.slice(1)}</span>
                    <span class="alert-price">Target: ₹${alert.targetPrice.toLocaleString()}/quintal</span>
                    <span class="alert-date">Set on ${alert.createdAt}</span>
                </div>
                <button class="btn btn-secondary btn-sm" onclick="removeAlert(${alert.id})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `,
      )
      .join("")

    activeAlerts.innerHTML = html
  }

  // Global function for removing alerts
  window.removeAlert = (alertId) => {
    let alerts = JSON.parse(localStorage.getItem("priceAlerts") || "[]")
    alerts = alerts.filter((alert) => alert.id !== alertId)
    localStorage.setItem("priceAlerts", JSON.stringify(alerts))
    displayActiveAlerts()
  }

  // Initialize alerts display
  displayActiveAlerts()

  // Declare showLoading and showSuccess functions
  function showLoading(element) {
    element.innerHTML = '<div class="loading">Loading...</div>'
  }

  function showSuccess(element, message) {
    element.innerHTML = `<div class="success">${message}</div>`
  }
}
