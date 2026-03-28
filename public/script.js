const chatbox = document.getElementById("chatbox");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const modeTitle = document.getElementById("modeTitle");
const clearBtn = document.getElementById("clearBtn");
const exportBtn = document.getElementById("exportBtn");
const suggestionWrap = document.getElementById("suggestions");
const modeButtons = document.querySelectorAll(".mode-btn");

let currentMode = "hoc-bai";

const suggestionData = {
  "hoc-bai": [
    "Thông tin là gì? Dữ liệu là gì? Cho ví dụ trong thực tế.",
    "Máy tính xử lí thông tin theo những bước nào?",
    "Phần cứng và phần mềm khác nhau như thế nào?",
    "Mạng máy tính là gì? Nêu lợi ích của mạng máy tính.",
    "Internet, WWW và trình duyệt web khác nhau thế nào?",
    "Văn hóa ứng xử trên không gian mạng gồm những điểm gì cần nhớ?"
  ],
  "trac-nghiem": [
    "Tạo 5 câu trắc nghiệm về thông tin và xử lí thông tin có đáp án.",
    "Tạo 5 câu trắc nghiệm về mạng máy tính và Internet có đáp án.",
    "Tạo 5 câu trắc nghiệm về an toàn số và đạo đức số có đáp án.",
    "Tạo 10 câu trắc nghiệm tổng hợp Tin học 10 mức cơ bản.",
    "Tạo 5 câu trắc nghiệm phân biệt phần cứng và phần mềm.",
    "Tạo 5 câu trắc nghiệm về dịch vụ trên Internet có giải thích."
  ],
  "de-kiem-tra": [
    "Tạo đề kiểm tra 15 phút chủ đề thông tin và dữ liệu, kèm đáp án.",
    "Tạo đề kiểm tra 15 phút về mạng máy tính và Internet, kèm đáp án.",
    "Tạo đề kiểm tra 1 tiết Tin học 10 mức cơ bản, bám sát sách Kết nối tri thức.",
    "Tạo đề kiểm tra gồm 8 câu trắc nghiệm và 2 câu tự luận ngắn.",
    "Tạo đề ôn tập cuối chương về an toàn trên không gian mạng.",
    "Tạo đề kiểm tra học kì Tin học 10 mức vừa sức, có ma trận ngắn."
  ]
};

function renderSuggestions() {
  suggestionWrap.innerHTML = "";
  suggestionData[currentMode].forEach((text) => {
    const btn = document.createElement("button");
    btn.className = "suggestion-btn";
    btn.textContent = text;
    btn.onclick = () => {
      userInput.value = text;
      userInput.focus();
      autoGrow();
    };
    suggestionWrap.appendChild(btn);
  });
}

function updateModeUI() {
  const titles = {
    "hoc-bai": "Chế độ: Học bài",
    "trac-nghiem": "Chế độ: Câu trắc nghiệm",
    "de-kiem-tra": "Chế độ: Đề kiểm tra"
  };
  modeTitle.textContent = titles[currentMode];
  modeButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.mode === currentMode);
  });
  renderSuggestions();
}

function addMessage(role, text) {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${role}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = role === "user" ? "Bạn" : "AI";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);
  chatbox.appendChild(wrapper);
  chatbox.scrollTop = chatbox.scrollHeight;
  return wrapper;
}

function autoGrow() {
  userInput.style.height = "auto";
  userInput.style.height = Math.min(userInput.scrollHeight, 180) + "px";
}

modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentMode = btn.dataset.mode;
    updateModeUI();
  });
});

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  userInput.value = "";
  autoGrow();

  const typing = addMessage("bot", "Đang soạn câu trả lời...");
  typing.querySelector(".bubble").classList.add("typing");

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, mode: currentMode })
    });

    const data = await res.json();
    typing.remove();
    addMessage("bot", data.reply || "Không có phản hồi.");
  } catch (error) {
    typing.remove();
    addMessage("bot", "Không kết nối được tới máy chủ. Bạn hãy kiểm tra lại Render hoặc mạng Internet.");
  }
});

clearBtn.addEventListener("click", () => {
  chatbox.innerHTML = `
    <div class="message bot">
      <div class="avatar">AI</div>
      <div class="bubble">Hội thoại đã được xóa. Bạn có thể bắt đầu câu hỏi mới về Tin học 10.</div>
    </div>
  `;
});

exportBtn.addEventListener("click", () => {
  const messages = [...document.querySelectorAll(".message")].map((msg) => {
    const who = msg.classList.contains("user") ? "Bạn" : "AI";
    const text = msg.querySelector(".bubble")?.textContent || "";
    return `${who}: ${text}`;
  }).join("\n\n");

  const blob = new Blob([messages], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "hoi-thoai-tin-hoc-10.txt";
  link.click();
  URL.revokeObjectURL(link.href);
});

userInput.addEventListener("input", autoGrow);
updateModeUI();
autoGrow();
