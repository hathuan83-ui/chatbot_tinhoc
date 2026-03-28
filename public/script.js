const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const clearChatBtn = document.getElementById('clearChatBtn');
const exportBtn = document.getElementById('exportBtn');
const promptButtons = document.querySelectorAll('.prompt-btn');

let history = [];

function autoResize() {
  userInput.style.height = 'auto';
  userInput.style.height = `${Math.min(userInput.scrollHeight, 180)}px`;
}

function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

function createMessage(role, content, isHtml = false) {
  const wrapper = document.createElement('div');
  wrapper.className = `message ${role}`;

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = role === 'user' ? 'Bạn' : 'AI';

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  if (isHtml) {
    bubble.innerHTML = content;
  } else {
    bubble.textContent = content;
  }

  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);
  chatBox.appendChild(wrapper);
  scrollToBottom();
  return wrapper;
}

function addTypingIndicator() {
  return createMessage('ai', '<div class="typing"><span></span><span></span><span></span></div>', true);
}

async function sendMessage(prefilledText = '') {
  const message = (prefilledText || userInput.value).trim();
  if (!message) return;

  createMessage('user', message);
  history.push({ role: 'user', text: message });

  userInput.value = '';
  autoResize();
  userInput.focus();

  const typingMessage = addTypingIndicator();

  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history })
    });

    const data = await response.json();
    typingMessage.remove();

    const reply = data.reply || 'Không nhận được phản hồi từ hệ thống.';
    createMessage('ai', reply);
    history.push({ role: 'model', text: reply });
  } catch (error) {
    typingMessage.remove();
    createMessage('ai', 'Không thể kết nối tới máy chủ. Hãy kiểm tra lại Render hoặc mạng Internet.');
  }
}

sendBtn.addEventListener('click', () => sendMessage());

userInput.addEventListener('input', autoResize);
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

clearChatBtn.addEventListener('click', () => {
  history = [];
  chatBox.innerHTML = `
    <div class="message ai welcome">
      <div class="avatar">AI</div>
      <div class="bubble">
        <h3>Đã làm mới hội thoại ✨</h3>
        <p>Bạn có thể bắt đầu một câu hỏi mới về Tin học 10.</p>
      </div>
    </div>
  `;
  scrollToBottom();
});

exportBtn.addEventListener('click', () => {
  const lines = ['TRỢ LÍ AI HỖ TRỢ HỌC SINH HỌC TIN HỌC 10', ''];
  history.forEach((item) => {
    const who = item.role === 'user' ? 'Bạn' : 'AI';
    lines.push(`${who}: ${item.text}`);
    lines.push('');
  });

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'hoi-thoai-tro-li-ai-tin-hoc-10.txt';
  a.click();
  URL.revokeObjectURL(url);
});

promptButtons.forEach((button) => {
  button.addEventListener('click', () => {
    userInput.value = button.textContent.trim();
    autoResize();
    userInput.focus();
  });
});

autoResize();
