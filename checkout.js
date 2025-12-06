// Get order data from URL or localStorage
function getOrderData() {
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section') || 'Floor A';
    const price = params.get('price') || '$520';
    const eventName = params.get('event') || 'Taylor Swift - The Eras Tour';
    const eventDate = params.get('date') || 'Saturday, March 15, 2024 at 8:00 PM';
    const venue = params.get('venue') || 'Madison Square Garden';
    
    return {
        section,
        price,
        eventName,
        eventDate,
        venue,
        quantity: 1
    };
}

// Calculate totals
function calculateTotals(price) {
    const priceNum = parseFloat(price.replace('$', '').replace(',', ''));
    const serviceFee = priceNum * 0.15; // 15% service fee
    const subtotal = priceNum;
    const total = subtotal + serviceFee;
    
    return {
        subtotal: `$${subtotal.toFixed(2)}`,
        serviceFee: `$${serviceFee.toFixed(2)}`,
        total: `$${total.toFixed(2)}`
    };
}

// Populate order summary
function populateOrderSummary() {
    const order = getOrderData();
    const totals = calculateTotals(order.price);
    
    // Populate tickets
    const ticketsContainer = document.getElementById('orderTickets');
    ticketsContainer.innerHTML = `
        <div class="summary-ticket-item">
            <div class="ticket-info">
                <h4>${order.eventName}</h4>
                <p>${order.eventDate}</p>
                <p>${order.venue}</p>
                <p style="margin-top: 8px;"><strong>Section:</strong> ${order.section}</p>
                <p><strong>Quantity:</strong> ${order.quantity} ticket${order.quantity > 1 ? 's' : ''}</p>
            </div>
            <div class="ticket-price">${order.price}</div>
        </div>
    `;
    
    // Populate totals
    document.getElementById('subtotal').textContent = totals.subtotal;
    document.getElementById('serviceFee').textContent = totals.serviceFee;
    document.getElementById('total').textContent = totals.total;
}

// Format card number input
function formatCardNumber(input) {
    let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    if (formattedValue.length > 19) {
        formattedValue = formattedValue.substr(0, 19);
    }
    input.value = formattedValue;
}

// Format expiry date input
function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

// Format phone number input
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 3) {
            value = `(${value}`;
        } else if (value.length <= 6) {
            value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
        } else {
            value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 10)}`;
        }
    }
    input.value = value;
}

// Initialize form inputs
function initFormInputs() {
    const cardNumber = document.getElementById('cardNumber');
    const expiry = document.getElementById('expiry');
    const phone = document.getElementById('phone');
    const zip = document.getElementById('zip');
    
    if (cardNumber) {
        cardNumber.addEventListener('input', () => formatCardNumber(cardNumber));
    }
    
    if (expiry) {
        expiry.addEventListener('input', () => formatExpiryDate(expiry));
    }
    
    if (phone) {
        phone.addEventListener('input', () => formatPhoneNumber(phone));
    }
    
    if (zip) {
        zip.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 5);
        });
    }
    
    if (document.getElementById('cvv')) {
        document.getElementById('cvv').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
        });
    }
    
    if (document.getElementById('state')) {
        document.getElementById('state').addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase().substring(0, 2);
        });
    }
}

// Handle form submission
function initCheckoutForm() {
    const form = document.getElementById('checkoutForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const order = getOrderData();
        const totals = calculateTotals(order.price);
        
        // Simulate payment processing
        const confirmMessage = `Complete purchase for ${order.section} ticket at ${order.price}?\n\nTotal: ${totals.total}`;
        
        if (confirm(confirmMessage)) {
            // Show success message
            alert('Purchase successful! Your tickets will be sent to your email shortly.');
            
            // In a real app, this would redirect to a confirmation page
            // For now, redirect to home
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    populateOrderSummary();
    initFormInputs();
    initCheckoutForm();
});

