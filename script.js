// --- user helpers ---
function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '{}');
}
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// On page load
window.onload = function() {
    const activeUser = localStorage.getItem('activeUser');
    if (localStorage.getItem('isLoggedIn') === 'true' && activeUser) {
      document.getElementById('loginPage').style.display = 'none';
      document.getElementById('calculatorSection').style.display = 'block';
      document.getElementById('welcomeText').textContent = "Welcome, " + activeUser;
    } else {
      document.getElementById('loginPage').style.display = 'block';
      document.getElementById('calculatorSection').style.display = 'none';
    }
};

// Login/Register
function handleLogin() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    const msg = document.getElementById('loginMessage');
    msg.textContent = "";
    msg.style.color = "#d32f2f";

    if (!user || !pass) { msg.textContent = "Please enter both username and password."; return; }

    let users = getUsers();

    if (!users[user]) {
      if (Object.keys(users).length >= 5) { msg.textContent = "User limit reached (5 users allowed)."; return; }
      users[user] = pass;
      saveUsers(users);
      msg.style.color = "green";
      msg.textContent = "User registered successfully.";
    } else {
      if (users[user] !== pass) { msg.textContent = "Incorrect password."; return; }
    }

    localStorage.setItem('isLoggedIn','true');
    localStorage.setItem('activeUser', user);
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('calculatorSection').style.display = 'block';
    document.getElementById('welcomeText').textContent = "Welcome, " + user;
}

// Reset password
function resetPassword() {
    const user = document.getElementById('username').value.trim();
    const newPass = document.getElementById('password').value.trim();
    const msg = document.getElementById('loginMessage');
    msg.textContent = "";
    msg.style.color = "#d32f2f";

    if (!user || !newPass) { msg.textContent = "Enter username and new password to reset."; return; }
    let users = getUsers();
    if (users[user]) {
      users[user] = newPass;
      saveUsers(users);
      msg.style.color = "green";
      msg.textContent = "Password reset successful.";
    } else {
      msg.textContent = "User does not exist.";
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('activeUser');
    location.reload();
}

/* ---------------- Calculations ---------------- */

// Ribbon
function calculateRibbon() {
    const weightKg = parseFloat(document.getElementById('weightRibbon').value);
    if (isNaN(weightKg) || weightKg <= 0) { alert('Enter a valid weight in kg.'); return; }
    const halfCellWithRibbon = 6.63;
    const halfCellWithoutRibbon = 5.62;
    const ribbonPerCell = halfCellWithRibbon - halfCellWithoutRibbon;
    const numCells = (weightKg * 1000) / halfCellWithRibbon;
    const ribbonWeightKg = (numCells * ribbonPerCell) / 1000;
    document.getElementById('cellsWithRibbon').textContent = Math.floor(numCells);
    document.getElementById('ribbonWeight').textContent = ribbonWeightKg.toFixed(3);
}
function resetRibbon() {
    document.getElementById('weightRibbon').value = '';
    document.getElementById('cellsWithRibbon').textContent = '';
    document.getElementById('ribbonWeight').textContent = '';
}

// CR
function calculateCR() {
    const weightKg = parseFloat(document.getElementById('weightCR').value);
    if (isNaN(weightKg) || weightKg <= 0) { alert('Enter a valid weight in kg.'); return; }
    const halfCellWithoutRibbon = 5.62;
    const numCells = (weightKg * 1000) / halfCellWithoutRibbon;
    document.getElementById('cellsWithoutRibbon').textContent = Math.floor(numCells);
}
function resetCR() {
    document.getElementById('weightCR').value = '';
    document.getElementById('cellsWithoutRibbon').textContent = '';
}

// Potting
function calculatePotting() {
    const totalKg = parseFloat(document.getElementById('pottingTotal').value);
    if (isNaN(totalKg) || totalKg <= 0) { alert('Enter a valid weight.'); return; }
    const totalParts = 6;
    const pottingA = (totalKg * 5) / totalParts;
    const pottingB = (totalKg * 1) / totalParts;
    document.getElementById('pottingA').textContent = pottingA.toFixed(3);
    document.getElementById('pottingB').textContent = pottingB.toFixed(3);
}
function resetPotting() {
    document.getElementById('pottingTotal').value = '';
    document.getElementById('pottingA').textContent = '';
    document.getElementById('pottingB').textContent = '';
}

// Backsheet
function calculateBacksheet() {
    const weightKg = parseFloat(document.getElementById('backsheetWeight').value);
    if (isNaN(weightKg) || weightKg <= 0) { alert('Enter a valid weight.'); return; }
    const gsm = 340;
    const area = (weightKg * 1000) / gsm;
    document.getElementById('backsheetArea').textContent = area.toFixed(3);
}
function resetBacksheet() {
    document.getElementById('backsheetWeight').value = '';
    document.getElementById('backsheetArea').textContent = '';
}

// EVA
function calculateEVA() {
    const weightKg = parseFloat(document.getElementById('evaWeight').value);
    if (isNaN(weightKg) || weightKg <= 0) { alert('Enter a valid weight.'); return; }
    const area = (weightKg / 1.2) * 2.56;
    document.getElementById('evaArea').textContent = area.toFixed(3);
}
function resetEVA() {
    document.getElementById('evaWeight').value = '';
    document.getElementById('evaArea').textContent = '';
}
