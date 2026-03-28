const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const newChatBtn = document.getElementById("newChatBtn");
const statusBadge = document.getElementById("statusBadge");
const suggestions = document.querySelectorAll(".suggestion");

function addMessage(role, content) {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${role}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = role === "ai" ? "AI" : "Bạn";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = content;

  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);
  chatBox.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;

  return bubble;
}

function setStatus(ok, text) {
  statusBadge.className = `status ${ok ? "ok" : "warn"}`;
  statusBadge.textContent = text;
}

async function sendMessage(message) {
  addMessage("user", message);
  userInput.value = "";
  sendBtn.disabled = true;
  setStatus(true, "● Đang trả lời");

  const typingBubble = addMessage("ai", "Đang suy nghĩ...");
  typingBubble.classList.add("typing");

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    typingBubble.classList.remove("typing");
    typingBubble.textContent = data.reply || "Không có phản hồi từ AI.";

    if (!response.ok) {
      setStatus(false, "● Kiểm tra cấu hình");
    } else {
      setStatus(true, "● Sẵn sàng");
    }
  } catch (error) {
    typingBubble.classList.remove("typing");
    typingBubble.textContent = "Chưa kết nối được máy chủ AI. Hãy kiểm tra Render và API key.";
    setStatus(false, "● Mất kết nối");
  } finally {
    sendBtn.disabled = false;
    userInput.focus();
  }
}

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;
  await sendMessage(message);
});

suggestions.forEach((button) => {
  button.addEventListener("click", async () => {
    await sendMessage(button.textContent.trim());
  });
});

newChatBtn.addEventListener("click", () => {
  chatBox.innerHTML = `
    <div class="message ai">
      <div class="avatar">AI</div>
      <div class="bubble">Xin chào! Tôi là trợ lí AI hỗ trợ học Tin học 10. Em có thể hỏi về lý thuyết, Python, trắc nghiệm, gỡ lỗi hoặc nhờ tạo bài tập.</div>
    </div>
  `;
  setStatus(true, "● Sẵn sàng");
  userInput.value = "";
  userInput.focus();
});
