// ==================== AUTHENTICATION ====================
const loginScreen = document.getElementById('login-screen');
const appScreen = document.getElementById('app-screen');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // Hardcoded test credentials
    if (user === 'test' && pass === 'test') {
        loginScreen.classList.add('hidden');
        appScreen.classList.remove('hidden');
        document.getElementById('user-display').innerText = 'logged in as ' + user;
        document.getElementById('profile-name-display').innerText = user;
    } else {
        loginError.innerText = 'Invalid credentials. Use test/test.';
    }
});

function logout() {
    appScreen.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    loginError.innerText = '';
    switchTab('home');
}

// ==================== TAB SWITCHING ====================
function switchTab(tabId) {
    const buttons = document.querySelectorAll('.nav-btn');
    const tabs = document.querySelectorAll('.tab-content');

    buttons.forEach(btn => btn.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));

    if (tabId === 'cs2') {
        document.querySelector('.nav-btn[onclick="switchTab(\'home\')"]').classList.add('active');
    } else {
        const clickedBtn = Array.from(buttons).find(btn => 
            btn.getAttribute('onclick')?.includes(tabId)
        );
        if (clickedBtn) clickedBtn.classList.add('active');
    }

    const selectedTab = document.getElementById(tabId);
    if (selectedTab) selectedTab.classList.add('active');
}

function openProduct(productId) {
    if (productId === 'cs2') {
        switchTab('cs2');
    }
}

// ==================== CHAT LOGIC ====================
function sendMessage() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;

    const chatBox = document.getElementById('chat-messages');
    const newMsg = document.createElement('div');
    newMsg.className = 'chat-msg';
    newMsg.innerHTML = `<span class="chat-user">test</span>: ${msg}`;
    
    chatBox.appendChild(newMsg);
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
}

// ==================== MISC ====================
function activateCode() {
    alert("Invalid subscription code.");
}

function purchase() {
    const buyBtn = document.querySelector('.buy-action');
    buyBtn.innerText = "Redirecting...";
    buyBtn.style.opacity = "0.8";
    buyBtn.style.cursor = "wait";
}