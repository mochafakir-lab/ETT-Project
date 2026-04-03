const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const chatContainer = document.getElementById('chatContainer');
const sendBtn = document.getElementById('sendBtn');

// Helper to add a message to the chat UI
function appendMessage(role, contentHTML) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', `${role}-message`);
    
    let avatarHTML = '';
    if (role === 'ai') {
        avatarHTML = `<div class="avatar ai-avatar">AI</div>`;
    } else {
        avatarHTML = `<div class="avatar user-avatar">U</div>`;
    }
    
    msgDiv.innerHTML = `
        ${avatarHTML}
        <div class="content">${contentHTML}</div>
    `;
    
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    return msgDiv;
}

// Show a loading indicator
function showLoader() {
    return appendMessage('ai', `
        <div class="loader">
            <div class="loader-dot"></div>
            <div class="loader-dot"></div>
            <div class="loader-dot"></div>
        </div>
    `);
}

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const query = userInput.value.trim();
    if (!query) return;
    
    // Disable input while processing
    userInput.value = '';
    userInput.disabled = true;
    sendBtn.disabled = true;
    
    // Add User Message
    appendMessage('user', query);
    
    // Show AI loading indicator
    const loaderMsg = showLoader();
    
    try {
        const response = await fetch('/api/query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        
        const data = await response.json();
        
        // Remove loader
        chatContainer.removeChild(loaderMsg);
        
        if (response.ok) {
            // Parse Markdown response using marked
            let finalHtml = marked.parse(data.response);
            
            // Format sources cleanly
            if (data.sources && data.sources.length > 0) {
                // Get unique sources
                const uniqueSources = [...new Set(data.sources)].filter(s => s);
                if (uniqueSources.length > 0) {
                    const sourcesHtml = uniqueSources.map(s => `<span class="source-badge">${s}</span>`).join('');
                    finalHtml += `<div class="sources-container"><strong>Sources referenced:</strong><br>${sourcesHtml}</div>`;
                }
            }
            
            appendMessage('ai', finalHtml);
        } else {
            appendMessage('ai', `<p style="color: #ef4444;">Error: ${data.error || 'Failed to process request.'}</p>`);
        }
        
    } catch (error) {
         chatContainer.removeChild(loaderMsg);
         appendMessage('ai', `<p style="color: #ef4444;">Network Error: Cannot reach the backend API.</p>`);
    } finally {
        userInput.disabled = false;
        sendBtn.disabled = false;
        userInput.focus();
    }
});
