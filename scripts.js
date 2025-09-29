// script.js

// Theme toggle (light/dark) by toggling classes on <body>
function toggleTheme() {
  const body = document.body;
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    body.classList.add('light');
    localStorage.setItem('theme', 'light');
    updateThemeButton(false);
  } else {
    body.classList.remove('light');
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    updateThemeButton(true);
  }
}

// Update theme button text if exists
function updateThemeButton(isDark) {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.textContent = isDark ? '☀️ الوضع الفاتح' : '🌙 الوضع الداكن';
}

// Modal controls (login)
function openModal() {
  const m = document.getElementById('loginModal');
  if (m) m.classList.add('active');
}
function closeModal() {
  const m = document.getElementById('loginModal');
  if (m) m.classList.remove('active');
}

// On load: apply saved theme or default to light
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
    updateThemeButton(true);
  } else {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
    updateThemeButton(false);
  }
});

// ----------------- Chat widget (simple local simulation) -----------------
function initChatWidget() {
  const messagesEl = document.getElementById('messages');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');

  if (!messagesEl || !input || !sendBtn) return;

  // helper to add message
  function addMessage(text, who = 'bot') {
    const div = document.createElement('div');
    div.classList.add('message');
    div.classList.add(who === 'user' ? 'user' : 'bot');
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  // simulate a bot reply (very simple)
  function botReply(userText) {
    const t = userText.toLowerCase();
    if (t.includes('قبول') || t.includes('تسجيل')) {
      return 'للاستفسار عن إجراءات القبول، يُرجى زيارة صفحة التسجيل أو مراسلة شؤون الطلبة.';
    }
    if (t.includes('مكتبة') || t.includes('كتب')) {
      return 'المكتبة تفتح من 8 صباحًا إلى 3 مساءً. هل تريد رابط قائمة الكتب؟';
    }
    if (t.includes('جدول') || t.includes('حصص')) {
      return 'يمكنك الاطلاع على جدول الحصص في صفحة المدرسة أو التواصل مع الإدارة للحصول على نسخة محدثة.';
    }
    // fallback
    const replies = [
      'حسنًا — هل تريد مزيدًا من التفاصيل؟',
      'أستطيع المساعدة في المواعيد، القبول، والمرافق. ما الذي يهمك؟',
      'يمكنني توجيهك إلى صفحات المدرسة أو إرسال معلومات اتصال.'
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  }

  // send handler
  function send() {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    input.value = '';
    // fake thinking...
    setTimeout(() => {
      const reply = botReply(text);
      addMessage(reply, 'bot');
    }, 700 + Math.random() * 500);
  }

  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      send();
    }
  });

  // add a starter bot message
  addMessage('مرحبًا! أنا مساعد ثانوية السروات. كيف أساعدك اليوم؟', 'bot');
}
