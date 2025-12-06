// Sample data for events and artists
const featuredEvents = [
    {
        id: 1,
        title: "Taylor Swift - The Eras Tour",
        date: "Mar 15, 2024",
        venue: "Madison Square Garden",
        price: "$450",
        image: "https://tse3.mm.bing.net/th/id/OIP.iI0FNy8IwXqPu2_NsOBxAAHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        id: 2,
        title: "The Weeknd - After Hours Til Dawn",
        date: "Apr 20, 2024",
        venue: "Staples Center",
        price: "$380",
        image: "https://www.nme.com/wp-content/uploads/2023/02/the-weeknd-2000x1270-1.jpg"
    },
    {
        id: 3,
        title: "Drake & 21 Savage Tour",
        date: "May 5, 2024",
        venue: "Barclays Center",
        price: "$520",
        image: "https://people.com/thmb/079oB_DBHYsAwfyMlQp80U5KaAg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/drake-performs-070623-b37cca5ee2004372b0aea35783d4f005.jpg"
    },

];

const popularArtists = [
    { name: "Taylor Swift", image: "https://tse3.mm.bing.net/th/id/OIP.iI0FNy8IwXqPu2_NsOBxAAHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "The Weeknd", image: "https://www.nme.com/wp-content/uploads/2023/02/the-weeknd-2000x1270-1.jpg" },
    { name: "Drake", image: "https://people.com/thmb/079oB_DBHYsAwfyMlQp80U5KaAg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/drake-performs-070623-b37cca5ee2004372b0aea35783d4f005.jpg" },
    { name: "Bad Bunny", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1Is12nqfQESLkC8eHesrar1Jy5AUaMFiRQ&s" },
    { name: "Harry Styles", image: "https://www.rollingstone.com/wp-content/uploads/2019/11/Harry-Styles.jpg?w=1581&h=1054&crop=1" },
    { name: "Beyoncé", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVTbstQk0AtjzbxsuKnlpO_BUTZrmVIIJzjg&s" },
];

const upcomingEvents = [
    {
        id: 7,
        title: "Coldplay - Music of the Spheres",
        date: "Mar 22, 2024 • 7:00 PM",
        venue: "Rose Bowl",
        price: "$280",
        image: "https://www.rollingstone.com/wp-content/uploads/2021/10/Coldplay-Credit-James-Marcus-Haney-1-Enhanced.jpg?w=1581&h=1054&crop=1"
    },
    {
        id: 8,
        title: "Metallica - M72 World Tour",
        date: "Mar 28, 2024 • 8:00 PM",
        venue: "SoFi Stadium",
        price: "$320",
        image: "https://www.rollingstone.com/wp-content/uploads/2023/03/metallica-72-seasons.jpg?w=1581&h=1054&crop=1"
    },
    {
        id: 9,
        title: "Kendrick Lamar - The Big Steppers",
        date: "Apr 5, 2024 • 9:00 PM",
        venue: "Coachella Valley",
        price: "$450",
        image: "https://variety.com/wp-content/uploads/2022/08/GN_02382-copy.jpg"
    },
    {
        id: 10,
        title: "Lana Del Rey - Did You Know",
        date: "Apr 12, 2024 • 8:30 PM",
        venue: "Hollywood Bowl",
        price: "$220",
        image: "https://tse4.mm.bing.net/th/id/OIP.RfW7YUr1r_1OKACkbKSZTAHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        id: 11,
        title: "The 1975 - At Their Very Best",
        date: "Apr 18, 2024 • 7:30 PM",
        venue: "Red Rocks",
        price: "$180",
        image: "https://tse2.mm.bing.net/th/id/OIP.gpycb_HHX47okWWd7DDAkQHaFm?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
    }
];

// Populate featured events
function populateFeaturedEvents() {
    const container = document.getElementById('featuredEvents');
    if (!container) return;

    container.innerHTML = featuredEvents.map(event => `
        <div class="event-card" onclick="window.location.href='market.html?event=${event.id}'">
            <img src="${event.image}" alt="${event.title}" class="event-card-image">
            <div class="event-card-content">
                <div class="event-card-date">${event.date}</div>
                <div class="event-card-title">${event.title}</div>
                <div class="event-card-venue">${event.venue}</div>
                <div class="event-card-price">From ${event.price}</div>
            </div>
        </div>
    `).join('');
}

// Populate artists
function populateArtists() {
    const container = document.getElementById('artistsGrid');
    if (!container) return;

    container.innerHTML = popularArtists.map(artist => `
        <div class="artist-card">
            <img src="${artist.image}" alt="${artist.name}" class="artist-image">
            <div class="artist-name">${artist.name}</div>
        </div>
    `).join('');
}

// Populate upcoming events
function populateUpcomingEvents() {
    const container = document.getElementById('upcomingEvents');
    if (!container) return;

    container.innerHTML = upcomingEvents.map(event => `
        <div class="event-list-item" onclick="window.location.href='market.html?event=${event.id}'">
            <img src="${event.image}" alt="${event.title}" class="event-list-image">
            <div class="event-list-content">
                <div class="event-list-date">${event.date}</div>
                <div class="event-list-title">${event.title}</div>
                <div class="event-list-venue">${event.venue}</div>
                <div class="event-list-price">From ${event.price}</div>
            </div>
        </div>
    `).join('');
}

// Search functionality
function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value;
            if (query) {
                alert(`Searching for: ${query}`);
                // In a real app, this would navigate to search results
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    populateFeaturedEvents();
    populateArtists();
    populateUpcomingEvents();
    initSearch();
});

