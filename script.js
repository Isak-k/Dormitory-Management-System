/* ============================================
   DMS – Dormitory Management System
   Shared JavaScript Utilities
   ============================================ */

// ---- Default Students ----
const DEFAULT_STUDENTS = [
  { id: '3265/17', name: 'Usama Awol', department: 'Computer Science', gender: 'Male', building: 'Block A', dorm: '101', capacity: '2' },
  { id: '1580/17', name: 'Hisak Kedi', department: 'Electrical Engineering', gender: 'Male', building: 'Block B', dorm: '205', capacity: '3' },
  { id: '3445/17', name: 'Zinedin Mujibu', department: 'Civil Engineering', gender: 'Male', building: 'Block A', dorm: '110', capacity: '2' },
];

// ---- Default Admin ----
const DEFAULT_ADMIN = { username: 'admin', password: '3265/17' };

// ---- Get Students from localStorage ----
function getStudents() {
  const stored = localStorage.getItem('dms_students');
  if (stored) {
    try { return JSON.parse(stored); }
    catch { return DEFAULT_STUDENTS; }
  }
  localStorage.setItem('dms_students', JSON.stringify(DEFAULT_STUDENTS));
  return DEFAULT_STUDENTS;
}

// ---- Get Admin from localStorage ----
function getAdmin() {
  const stored = localStorage.getItem('dms_admin');
  if (stored) {
    try { return JSON.parse(stored); }
    catch { return DEFAULT_ADMIN; }
  }
  localStorage.setItem('dms_admin', JSON.stringify(DEFAULT_ADMIN));
  return DEFAULT_ADMIN;
}

// ---- Save Students ----
function saveStudents(students) {
  localStorage.setItem('dms_students', JSON.stringify(students));
}

// ---- Get Maintenance Requests ----
function getRequests() {
  const stored = localStorage.getItem('dms_requests');
  if (stored) {
    try { return JSON.parse(stored); }
    catch { return []; }
  }
  return [];
}

// ---- Save Requests ----
function saveRequests(requests) {
  localStorage.setItem('dms_requests', JSON.stringify(requests));
}

// ---- Get Reports ----
function getReports() {
  const stored = localStorage.getItem('dms_reports');
  if (stored) {
    try { return JSON.parse(stored); }
    catch { return []; }
  }
  return [];
}

// ---- Save Reports ----
function saveReports(reports) {
  localStorage.setItem('dms_reports', JSON.stringify(reports));
}

// ---- Get Buildings ----
function getBuildings() {
  const stored = localStorage.getItem('dms_buildings');
  if (stored) {
    try { return JSON.parse(stored); }
    catch { return []; }
  }
  return [];
}

// ---- Save Buildings ----
function saveBuildings(buildings) {
  localStorage.setItem('dms_buildings', JSON.stringify(buildings));
}

// ---- Default Departments ----
const DEFAULT_DEPARTMENTS = [
  { id: 'DEPT-001', name: 'Computer Science', code: 'CS', description: 'Computer Science Department', createdAt: new Date().toLocaleString() },
  { id: 'DEPT-002', name: 'Electrical Engineering', code: 'EE', description: 'Electrical Engineering Department', createdAt: new Date().toLocaleString() },
  { id: 'DEPT-003', name: 'Civil Engineering', code: 'CE', description: 'Civil Engineering Department', createdAt: new Date().toLocaleString() },
];

// ---- Get Departments ----
function getDepartments() {
  const stored = localStorage.getItem('dms_departments');
  if (stored) {
    try { return JSON.parse(stored); }
    catch { return DEFAULT_DEPARTMENTS; }
  }
  localStorage.setItem('dms_departments', JSON.stringify(DEFAULT_DEPARTMENTS));
  return DEFAULT_DEPARTMENTS;
}

// ---- Save Departments ----
function saveDepartments(departments) {
  localStorage.setItem('dms_departments', JSON.stringify(departments));
}

// ---- Get Current User ----
function getCurrentUser() {
  const stored = localStorage.getItem('dms_user');
  if (stored) {
    try { return JSON.parse(stored); }
    catch { return null; }
  }
  return null;
}

// ---- Logout ----
function logout() {
  localStorage.removeItem('dms_user');
  window.location.href = 'login.html';
}

// ---- Toast Notifications ----
function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = {
    success: 'fa-circle-check',
    error: 'fa-circle-xmark',
    info: 'fa-circle-info',
    warning: 'fa-triangle-exclamation',
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ---- Animated Counter ----
function animateCounter(el, target, duration = 1200) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

// ---- Format Date ----
function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }).format(date);
}

// ---- Format Time ----
function formatTime(date) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  }).format(date);
}

// ---- Dark Mode Toggle ----
function initDarkMode() {
  const saved = localStorage.getItem('dms_theme');
  if (saved === 'light') document.body.classList.add('light-mode');

  const toggles = document.querySelectorAll('.dark-mode-toggle');
  toggles.forEach(btn => {
    updateToggleIcon(btn);
    btn.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      localStorage.setItem('dms_theme', isLight ? 'light' : 'dark');
      toggles.forEach(b => updateToggleIcon(b));
    });
  });
}

function updateToggleIcon(btn) {
  const isLight = document.body.classList.contains('light-mode');
  btn.innerHTML = isLight
    ? '<i class="fa-solid fa-moon"></i>'
    : '<i class="fa-solid fa-sun"></i>';
  btn.title = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';
}

// ---- Init on DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  // Ensure default students exist
  getStudents();
  getAdmin();
});





// ---- Confirmation Modal ----
function showConfirmModal(title, message, onConfirm, onCancel) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-icon danger">
        <i class="fa-solid fa-exclamation-circle"></i>
      </div>
      <h3>${title}</h3>
      <p>${message}</p>
      <div class="modal-actions">
        <button class="btn btn-danger" onclick="this.closest('.modal-overlay').remove(); (${onConfirm.toString()})();">Confirm</button>
        <button class="btn btn-ghost" onclick="this.closest('.modal-overlay').remove(); ${onCancel ? `(${onCancel.toString()})();` : ''}">Cancel</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

// ---- Animated Counter with Easing ----
function animateCounterAdvanced(el, target, duration = 1500, easing = 'easeOutQuad') {
  let start = 0;
  const startTime = Date.now();

  const easingFunctions = {
    linear: t => t,
    easeInQuad: t => t * t,
    easeOutQuad: t => t * (2 - t),
    easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeOutCubic: t => (--t) * t * t + 1,
  };

  const ease = easingFunctions[easing] || easingFunctions.easeOutQuad;

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(target * ease(progress));
    el.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      el.textContent = target;
    }
  };

  animate();
}

// ---- Keyboard Shortcuts ----
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K for search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.getElementById('globalSearch') || document.getElementById('studentSearch');
    if (searchInput) searchInput.focus();
  }

  // Escape to close modals
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
  }
});

// ---- Notification System ----
function createNotification(title, message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `toast toast-${type}`;
  notification.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-circle-xmark' : 'fa-circle-info'}"></i>
    <div>
      <strong>${title}</strong>
      <p style="margin: 4px 0 0 0; font-size: 12px;">${message}</p>
    </div>
  `;

  const container = document.getElementById('toast-container');
  if (container) {
    container.appendChild(notification);
    setTimeout(() => {
      notification.classList.add('removing');
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }
}

// ---- Session Management ----
function setSessionTimeout(minutes = 30) {
  let timeout;

  const resetTimeout = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      showToast('Session expired. Please login again.', 'warning');
      logout();
    }, minutes * 60 * 1000);
  };

  document.addEventListener('mousemove', resetTimeout);
  document.addEventListener('keypress', resetTimeout);
  document.addEventListener('click', resetTimeout);

  resetTimeout();
}

// ---- Data Export ----
function exportToCSV(data, filename = 'export.csv') {
  let csv = '';

  // Headers
  if (data.length > 0) {
    csv += Object.keys(data[0]).join(',') + '\n';
  }

  // Rows
  data.forEach(row => {
    csv += Object.values(row).map(v => `"${v}"`).join(',') + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

function exportToJSON(data, filename = 'export.json') {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

// ---- Form Validation ----
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[\d\s\-\+\(\)]+$/;
  return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function validateStudentID(id) {
  const re = /^\d{4}\/\d{2}$/;
  return re.test(id);
}

// ---- Debounce Function ----
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ---- Throttle Function ----
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ---- Local Storage with Expiry ----
function setItemWithExpiry(key, value, expiryMinutes = 60) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + expiryMinutes * 60 * 1000
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getItemWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}

// ---- Analytics Tracking ----
function trackEvent(eventName, eventData = {}) {
  const event = {
    name: eventName,
    timestamp: new Date().toISOString(),
    data: eventData
  };

  let events = JSON.parse(localStorage.getItem('dms_events') || '[]');
  events.push(event);

  // Keep only last 100 events
  if (events.length > 100) {
    events = events.slice(-100);
  }

  localStorage.setItem('dms_events', JSON.stringify(events));
}

// ---- Utility: Format Currency ----
function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

// ---- Utility: Format File Size ----
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ---- Utility: Generate UUID ----
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// ---- Initialize on Page Load ----
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  getStudents();
  getAdmin();
  getRequests();

  // Track page view
  trackEvent('page_view', {
    page: window.location.pathname,
    timestamp: new Date().toISOString()
  });

  // Set session timeout for logged-in users
  if (getCurrentUser()) {
    setSessionTimeout(30);
  }
});
