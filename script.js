const usersMap = new Map();
const nameinputter = /^[A-Za-z ]+$/;
const gmailinputter = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

// Load users from localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];
users.forEach(u => usersMap.set(u.email, u));

// ====== Add / Register user ======
function submit() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value.trim();

    // Validations
    if (!nameinputter.test(name)) {
        alert("Bruh, dude type only with letters~");
        return;
    }
    if (!gmailinputter.test(email)) {
        alert("Damn, dude type with @gmail.com~");
        return;
    }
    if (age < 18) {
        alert("Kid, go and play your sand~");
        return;
    }
    if (usersMap.has(email)) {
        alert("This email is already registered!");
        return;
    }

    // Create user object
    const user = { name, email, age: Number(age) };

    // Add to map and localStorage
    usersMap.set(email, user);
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    // Update user list
    user1();

    alert("User registered successfully!");
}

// ====== Render user list ======
function user1() {
    const userslist = document.getElementById("user1");
    userslist.innerHTML = ""; // clear previous

    for (const user of usersMap.values()) {
        const div = document.createElement("div");
        div.className = "user-card"; // use your CSS

        div.innerHTML = `
            <p><b>Name:</b> ${user.name}</p>
            <p><b>Email:</b> ${user.email}</p>
            <p><b>Age:</b> ${user.age}</p>
            <button onclick="goToMusic('${user.email}')">Enter Music App 🎧</button>
            <button onclick="deleteUser('${user.email}')">Delete ❌</button>
        `;

        userslist.appendChild(div);
    }
}

// ====== Enter music app ======
function goToMusic(email) {
    const user = usersMap.get(email);
    if (!user) {
        alert("User not found!");
        return;
    }
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "index3.html";
}

// ====== Delete user ======
function deleteUser(email) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    // Remove from Map
    usersMap.delete(email);

    // Remove from users array and localStorage
    users = users.filter(u => u.email !== email);
    localStorage.setItem("users", JSON.stringify(users));

    // Re-render the list
    user1();
}

// ====== Initialize user list on page load ======
user1();