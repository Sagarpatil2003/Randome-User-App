const userList = document.getElementById('user-list');
const searchInput = document.getElementById('search-input');
const card = document.querySelector('.card');

// Function to fetch and display a list of random users on initial page load
async function fetchAndDisplayRandomUsers() {
  try {
    const response = await fetch('https://randomuser.me/api/?results=10');
    const data = await response.json();
    displayUsers(data.results);
  } catch (error) {
    console.error('Error fetching random users:', error);
  }
}

// Function to display a list of users
function displayUsers(users) {
  userList.innerHTML = '';

  users.forEach((user, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${user.name.first} ${user.name.last}`;
    listItem.addEventListener('click', () => fetchUserDetails(user));
    userList.appendChild(listItem);
  });
}

// Function to fetch user details
async function fetchUserDetails(user) {
  try {
    const response = await fetch('https://randomuser.me/api/?seed=' + user.login.uuid);
    const data = await response.json();
    const detailedUser = data.results[0];
    displayUserDetails(detailedUser);
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
}

// Function to display user details
function displayUserDetails(user) {
  card.innerHTML = `
    <div class="card-head">
        <a href="#"><i class="fas fa-envelope"></i> ${user.email}</a>
        <div class="user-image">
            <img src="${user.picture.large}" alt="${user.name.first} ${user.name.last}">
        </div>
    </div>
    <div class="card-body">
        <div class="user-post-address">
            <div>
                <span>${user.location.street.number}</span><span>Street Address</span>
            </div>
            <div>
                <span>${user.location.postcode}</span><span>Postcode</span>
            </div>
            <div>
                <span>${user.location.street.name}</span><span>Street Name</span>
            </div>
        </div>
        <div class="user-name">
            <span class="user-name-title">${user.name.title}</span>
            <span class="user-name-full">${user.name.first} ${user.name.last},</span>
            <span class="user-age">Age: ${user.dob.age}</span>
        </div>
        <div class "user-location-address">
            <span>${user.location.city}, ${user.location.state}, ${user.location.country}</span>
        </div>
        <div class="card-foot">
            <div class="user-contact-info">
                <span><i class="fas fa-phone"></i> ${user.phone}</span>
                <span><i class="fas fa-mobile-alt"></i> ${user.cell}</span>
            </div>
        </div>
    </div>
  `;
}

// Event listener for search input
searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value.toLowerCase();
  const users = userList.getElementsByTagName('li');

  Array.from(users).forEach(user => {
    const userName = user.textContent.toLowerCase();
    if (userName.includes(searchValue)) {
      user.style.display = 'block';
    } else {
      user.style.display = 'none';
    }
  });
});

// Fetch and display random users on initial page load
fetchAndDisplayRandomUsers();
