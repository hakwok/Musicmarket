// Sample tickets data
const userTickets = [
    {
        id: 1,
        eventName: "Taylor Swift - The Eras Tour",
        date: "Saturday, March 15, 2024 at 8:00 PM",
        venue: "Madison Square Garden",
        section: "Floor A",
        row: "12",
        seats: ["A1", "A2"],
        quantity: 2
    },
    {
        id: 2,
        eventName: "The Weeknd - After Hours Til Dawn",
        date: "Saturday, April 20, 2024 at 9:00 PM",
        venue: "Staples Center",
        section: "Lower Level",
        row: "5",
        seats: ["B3"],
        quantity: 1
    },
    {
        id: 3,
        eventName: "Drake & 21 Savage Tour",
        date: "Saturday, May 5, 2024 at 8:00 PM",
        venue: "Barclays Center",
        section: "Upper Level",
        row: "20",
        seats: ["C1", "C2", "C3"],
        quantity: 3
    }
];

let selectedTickets = [];

// Populate ticket selection
function populateTickets() {
    const container = document.getElementById('ticketSelection');
    if (!container) return;

    container.innerHTML = userTickets.map(ticket => `
        <div class="ticket-item" data-ticket-id="${ticket.id}">
            <div class="ticket-item-header">
                <div class="ticket-event-name">${ticket.eventName}</div>
                <input type="checkbox" class="ticket-checkbox" data-ticket-id="${ticket.id}" onchange="toggleTicket(${ticket.id})">
            </div>
            <div class="ticket-details">
                <div>${ticket.date}</div>
                <div>${ticket.venue}</div>
                <div>${ticket.section}, Row ${ticket.row}, Seats ${ticket.seats.join(', ')}</div>
            </div>
        </div>
    `).join('');
}

// Toggle ticket selection
function toggleTicket(ticketId) {
    const ticket = userTickets.find(t => t.id === ticketId);
    const ticketItem = document.querySelector(`[data-ticket-id="${ticketId}"]`);
    const checkbox = document.querySelector(`.ticket-checkbox[data-ticket-id="${ticketId}"]`);

    if (checkbox.checked) {
        selectedTickets.push(ticket);
        ticketItem.classList.add('selected');
    } else {
        selectedTickets = selectedTickets.filter(t => t.id !== ticketId);
        ticketItem.classList.remove('selected');
    }

    updateTransferSummary();
}

// Update transfer summary
function updateTransferSummary() {
    const summary = document.getElementById('transferSummary');
    
    if (selectedTickets.length === 0) {
        summary.innerHTML = '<p>No tickets selected</p>';
        return;
    }

    summary.innerHTML = selectedTickets.map(ticket => `
        <div class="summary-item">
            <div style="font-weight: 600; margin-bottom: 5px;">${ticket.eventName}</div>
            <div style="font-size: 14px; color: #666;">
                ${ticket.section}, Row ${ticket.row}, Seats ${ticket.seats.join(', ')}
            </div>
        </div>
    `).join('');

    // Add total count
    const totalTickets = selectedTickets.reduce((sum, t) => sum + t.quantity, 0);
    summary.innerHTML += `
        <div class="summary-item" style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #e0e0e0;">
            <div style="font-weight: 600;">Total: ${totalTickets} ticket${totalTickets > 1 ? 's' : ''}</div>
        </div>
    `;
}

// Handle form submission
function initTransferForm() {
    const form = document.getElementById('transferForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (selectedTickets.length === 0) {
            alert('Please select at least one ticket to transfer.');
            return;
        }

        const recipientEmail = document.getElementById('recipientEmail').value;
        const recipientName = document.getElementById('recipientName').value;
        const message = document.getElementById('message').value;

        // Simulate transfer
        const confirmMessage = `Transfer ${selectedTickets.length} ticket(s) to ${recipientName} (${recipientEmail})?`;
        
        if (confirm(confirmMessage)) {
            alert('Tickets transferred successfully! The recipient will receive an email with ticket details.');
            
            // Reset form
            form.reset();
            selectedTickets = [];
            document.querySelectorAll('.ticket-item').forEach(item => {
                item.classList.remove('selected');
            });
            document.querySelectorAll('.ticket-checkbox').forEach(cb => {
                cb.checked = false;
            });
            updateTransferSummary();
        }
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    populateTickets();
    initTransferForm();
});

