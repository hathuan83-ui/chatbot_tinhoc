const chatWindow = document.getElementById('chatWindow');
const promptInput = document.getElementById('promptInput');
const sendBtn = document.getElementById('sendBtn');
const newChatBtn = document.getElementById('newChatBtn');

const SYSTEM_PROMPT = `
Bạn là trợ lí AI hỗ trợ học sinh học Tin học 10 theo sách Kết nối tri thức.
Yêu cầu trả lời:
- giải thích ngắn gọn, dễ hiểu, đúng kiến thức lớp 10;
- nếu là bài Python thì trình bày từng bước, có ví dụ mã;
- nếu học sinh hỏi chưa rõ, vẫn cố gắng suy luận và hỗ trợ;
- cuối câu trả lời nên có 1 gợi ý tự học ngắn.
`;

let messages = [
  { role: 'system', content: SYSTEM_PROMPT }
];

function addMessage(role, content) {
  const wrap = document.createElement('div');
  wrap.className = `message ${role === 'user' ? 'user' : 'assistant'}`;
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = role === 'user' ? 'Bạn' : 'AI';

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = content;

  wrap.appendChild(avatar);
  wrap.appendChild(bubble);
  chatWindow.appendChild(wrap);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return bubble;
}

async function sendMessage() {
  const text = promptInput.value.trim();
  if (!text) return;

  addMessage('user', text);
  messages.push({ role: 'user', content: text });
  promptInput.value = '';

  const typingBubble = addMessage('assistant', 'Đang suy nghĩ...');
  typingBubble.classList.add('typing');

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });

    const data = await response.json();
    typingBubble.classList.remove('typing');

    if (!response.ok) {
      typingBubble.textContent = data.error || 'Không gọi được AI.';
      return;
    }

    const reply = data.reply || 'Hiện chưa có phản hồi.';
    typingBubble.textContent = reply;
    messages.push({ role: 'assistant', content: reply });
  } catch (error) {
    typingBubble.classList.remove('typing');
    typingBubble.textContent = 'Chưa kết nối được máy chủ AI.';
  }
}

sendBtn.addEventListener('click', sendMessage);
promptInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

newChatBtn.addEventListener('click', () => {
  messages = [{ role: 'system', content: SYSTEM_PROMPT }];
  chatWindow.innerHTML = '';
  addMessage('assistant', 'Đã tạo cuộc trò chuyện mới. Em hãy đặt câu hỏi tiếp nhé!');
});

document.querySelectorAll('.quick-item').forEach(btn => {
  btn.addEventListener('click', () => {
    promptInput.value = btn.textContent;
    promptInput.focus();
  });
});
