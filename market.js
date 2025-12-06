// Market page data
const marketData = {
    1: {
        title: "Taylor Swift - The Eras Tour",
        venue: "Madison Square Garden",
        date: "Saturday, March 15, 2024 at 8:00 PM",
        image: "https://tse3.mm.bing.net/th/id/OIP.iI0FNy8IwXqPu2_NsOBxAAHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        lastSale: "$450",
        avgPrice: "$425",
        volume: "127",
        sections: [
            { name: "Floor A", prices: { buy: "$520", sell: "$480" } },
            { name: "Floor B", prices: { buy: "$480", sell: "$450" } },
            { name: "Lower Level", prices: { buy: "$420", sell: "$390" } },
            { name: "Upper Level", prices: { buy: "$350", sell: "$320" } }
        ],
        buyOptions: [
            { section: "Floor A", price: "$520", quantity: 2 },
            { section: "Floor B", price: "$480", quantity: 1 },
            { section: "Lower Level", price: "$420", quantity: 4 },
            { section: "Upper Level", price: "$350", quantity: 3 }
        ],
        activity: [
            { type: "Sale", details: "Floor B - 2 tickets", price: "$450", time: "2 hours ago" },
            { type: "Sale", details: "Lower Level - 1 ticket", price: "$420", time: "5 hours ago" },
            { type: "Sale", details: "Floor A - 1 ticket", price: "$520", time: "1 day ago" },
            { type: "Sale", details: "Upper Level - 2 tickets", price: "$350", time: "1 day ago" },
            { type: "Sale", details: "Upper Level - 3 tickets", price: "$320", time: "2 days ago" }
        ]
    },
    2: {
        title: "The Weeknd - After Hours Til Dawn",
        venue: "Staples Center",
        date: "Saturday, April 20, 2024 at 9:00 PM",
        image: "https://www.nme.com/wp-content/uploads/2023/02/the-weeknd-2000x1270-1.jpg",
        lastSale: "$380",
        avgPrice: "$365",
        volume: "89",
        sections: [
            { name: "Floor A", prices: { buy: "$450", sell: "$420" } },
            { name: "Floor B", prices: { buy: "$400", sell: "$380" } },
            { name: "Lower Level", prices: { buy: "$350", sell: "$330" } },
            { name: "Upper Level", prices: { buy: "$280", sell: "$260" } }
        ],
        buyOptions: [
            { section: "Floor A", price: "$450", quantity: 1 },
            { section: "Floor B", price: "$400", quantity: 2 },
            { section: "Lower Level", price: "$350", quantity: 3 }
        ],
        activity: [
            { type: "Sale", details: "Floor B - 2 tickets", price: "$380", time: "1 hour ago" },
            { type: "Sale", details: "Lower Level - 1 ticket", price: "$350", time: "3 hours ago" }
        ]
    }
};

// Get event ID from URL
function getEventId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('event')) || 1;
}

// Populate market page
function populateMarketPage() {
    const eventId = getEventId();
    const event = marketData[eventId] || marketData[1];

    // Update page title and breadcrumb
    document.getElementById('eventName').textContent = event.title;
    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventVenue').textContent = event.venue;
    document.getElementById('eventDate').textContent = event.date;
    document.getElementById('eventImage').src = event.image;
    document.getElementById('eventImage').alt = event.title;

    // Update market stats
    document.getElementById('lastSale').textContent = event.lastSale;
    document.getElementById('avgPrice').textContent = event.avgPrice;
    document.getElementById('volume').textContent = event.volume;

    // Populate section options
    const sizeOptions = document.getElementById('sizeOptions');
    sizeOptions.innerHTML = event.sections.map((section, index) => `
        <div class="size-option ${index === 0 ? 'active' : ''}" data-section="${section.name}">
            ${section.name}
        </div>
    `).join('');

    // Populate buy options
    const buyList = document.getElementById('buyList');
    buyList.innerHTML = event.buyOptions.map(option => `
        <div class="price-item" onclick="handleBuy('${option.section}', '${option.price}')">
            <div class="price-item-left">
                <span class="price-item-label">${option.section}</span>
                <span class="price-item-value">${option.price}</span>
            </div>
            <div>${option.quantity} available</div>
        </div>
    `).join('');

    // Populate activity
    const activityList = document.getElementById('activityList');
    activityList.innerHTML = event.activity.map(activity => `
        <div class="activity-item">
            <div class="activity-info">
                <span class="activity-type">${activity.type}</span>
                <span class="activity-details">${activity.details}</span>
                <span style="font-size: 12px; color: #999;">${activity.time}</span>
            </div>
            <div class="activity-price">${activity.price}</div>
        </div>
    `).join('');

    // Add click handlers for section options
    document.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            // Update buy list based on selected section
            updateBuyList(this.dataset.section);
        });
    });
}

// Update buy list based on selected section
function updateBuyList(section) {
    const eventId = getEventId();
    const event = marketData[eventId] || marketData[1];
    const sectionData = event.sections.find(s => s.name === section);
    
    if (sectionData) {
        const buyList = document.getElementById('buyList');
        buyList.innerHTML = `
            <div class="price-item" onclick="handleBuy('${section}', '${sectionData.prices.buy}')">
                <div class="price-item-left">
                    <span class="price-item-label">${section}</span>
                    <span class="price-item-value">${sectionData.prices.buy}</span>
                </div>
                <div>Buy Now</div>
            </div>
        `;
    }
}

// Handle buy action
function handleBuy(section, price) {
    const eventId = getEventId();
    const event = marketData[eventId] || marketData[1];
    
    // Navigate to checkout with order details
    const params = new URLSearchParams({
        section: section,
        price: price,
        event: event.title,
        date: event.date,
        venue: event.venue
    });
    
    window.location.href = `checkout.html?${params.toString()}`;
}

// Tab switching
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            
            // Update active states
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(`${tab}Tab`).classList.add('active');
        });
    });
    
    // Initialize sell form
    initSellForm();
}

// Initialize sell form with validation
function initSellForm() {
    const sellForm = document.querySelector('.sell-form');
    if (!sellForm) return;
    
    const priceInput = sellForm.querySelector('input[type="number"]:first-of-type');
    const quantityInput = sellForm.querySelector('input[type="number"]:last-of-type');
    const submitBtn = document.getElementById('listForSaleBtn');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const price = priceInput ? parseFloat(priceInput.value) : 0;
            const quantity = quantityInput ? parseInt(quantityInput.value) : 0;
            
            // Validation
            if (!price || price <= 0) {
                showMessage('Please enter a valid price greater than $0', 'error');
                if (priceInput) {
                    priceInput.focus();
                    priceInput.style.borderColor = 'var(--primary-red)';
                }
                return;
            }
            
            if (!quantity || quantity <= 0) {
                showMessage('Please enter a valid quantity (at least 1)', 'error');
                if (quantityInput) {
                    quantityInput.focus();
                    quantityInput.style.borderColor = 'var(--primary-red)';
                }
                return;
            }
            
            // Clear error styles
            if (priceInput) priceInput.style.borderColor = '';
            if (quantityInput) quantityInput.style.borderColor = '';
            
            // Success - item listed
            showMessage(`Item listed successfully! ${quantity} ticket(s) at $${price.toFixed(2)} each`, 'success');
            
            // Reset form
            if (priceInput) priceInput.value = '';
            if (quantityInput) quantityInput.value = '1';
        });
    }
    
    // Clear error styles on input
    if (priceInput) {
        priceInput.addEventListener('input', () => {
            priceInput.style.borderColor = '';
        });
    }
    if (quantityInput) {
        quantityInput.addEventListener('input', () => {
            quantityInput.style.borderColor = '';
        });
    }
}

// Show message feedback
function showMessage(message, type) {
    // Remove existing messages
    const existingMsg = document.querySelector('.sell-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create message element
    const msgDiv = document.createElement('div');
    msgDiv.className = `sell-message sell-message-${type}`;
    msgDiv.textContent = message;
    
    // Insert after sell form
    const sellForm = document.querySelector('.sell-form');
    if (sellForm && sellForm.parentNode) {
        sellForm.parentNode.insertBefore(msgDiv, sellForm.nextSibling);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            msgDiv.style.opacity = '0';
            msgDiv.style.transform = 'translateY(-10px)';
            setTimeout(() => msgDiv.remove(), 300);
        }, 5000);
    }
}

// Simple price chart (placeholder)
function drawPriceChart() {
    const canvas = document.getElementById('priceChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw a simple line chart
    ctx.strokeStyle = '#B91C1C';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const width = canvas.width;
    const height = canvas.height;
    const points = 10;
    const padding = 20;

    for (let i = 0; i < points; i++) {
        const x = padding + (i / (points - 1)) * (width - 2 * padding);
        const y = height - padding - (Math.random() * 0.5 + 0.3) * (height - 2 * padding);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    populateMarketPage();
    initTabs();
    drawPriceChart();
});

