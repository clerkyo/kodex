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

    // Load chat when the chat tab is clicked
    if (tabId === 'chat') {
        loadChat();
    }
}

function openProduct(productId) {
    if (productId === 'cs2') {
        switchTab('cs2');
    }
}

// ==================== DATABASE CHAT LOGIC ====================
async function loadChat() {
    try {
        const res = await fetch('/api/chat');
        const messages = await res.json();
        const chatBox = document.getElementById('chat-messages');
        
        if (!chatBox) return;
        
        chatBox.innerHTML = '';
        
        messages.forEach(msg => {
            const newMsg = document.createElement('div');
            newMsg.className = 'chat-msg';
            newMsg.innerHTML = `<span class="chat-user">${msg.username}</span>: ${msg.message}`;
            chatBox.appendChild(newMsg);
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (err) {
        console.error("Failed to load chat:", err);
    }
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    if (!input) return;
    
    const msg = input.value.trim();
    if (!msg) return;

    try {
        await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'test', message: msg })
        });

        input.value = '';
        loadChat(); // Refresh chat immediately
    } catch (err) {
        console.error("Failed to send message:", err);
    }
}

// Poll chat every 3 seconds if we are on the chat tab
setInterval(() => {
    const chatTab = document.getElementById('chat');
    if (chatTab && chatTab.classList.contains('active')) {
        loadChat();
    }
}, 3000);

// ==================== MISC UI LOGIC ====================
function activateCode() {
    alert("Invalid subscription code.");
}

function purchase() {
    const buyBtn = document.querySelector('.buy-action');
    if (buyBtn) {
        buyBtn.innerText = "Redirecting...";
        buyBtn.style.opacity = "0.8";
        buyBtn.style.cursor = "wait";
    }
}

function toggleFaq(element) {
    const accordion = element.parentElement;
    accordion.classList.toggle('active');
}
