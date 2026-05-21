# DMS - Dormitory Management System

A modern, futuristic, and fully responsive Dormitory Management System built with **pure HTML, CSS, and Vanilla JavaScript**. No frameworks, no backend, no databases—just clean, production-ready frontend code.

## 🎯 Features

### ✨ Modern UI/UX
- **Glassmorphism Design**: Stunning glass-effect cards with blur effects
- **Neon Glows**: Cyan, purple, and pink accent colors with glow effects
- **Smooth Animations**: Fade-in, slide, bounce, and hover animations
- **Dark/Light Mode**: Toggle between dark and light themes
- **Fully Responsive**: Desktop, tablet, and mobile optimized
- **Professional Typography**: Orbitron + Inter fonts for modern look

### 🔐 Authentication System
- **Dual Role Login**: Admin and Student login with case-insensitive credentials
- **Session Management**: Automatic logout after 30 minutes of inactivity
- **Secure Storage**: localStorage-based user session management
- **Demo Credentials**: Pre-configured test accounts

### 👨‍💼 Admin Dashboard
- **System Overview**: Real-time statistics and analytics
- **Student Management**: Add, edit, delete, and search students
- **Dorm Assignment**: Assign and reassign dormitory rooms
- **Maintenance Tracking**: View and manage maintenance requests
- **Reports & Analytics**: Export data to CSV/JSON
- **Settings Panel**: System configuration options

### 👨‍🎓 Student Dashboard
- **Dorm Information**: View assigned room details
- **Maintenance Requests**: Submit and track maintenance issues
- **Fee Management**: View accommodation fees and payment history
- **Profile Management**: Update personal information
- **Real-time Clock**: Live time display
- **Notification System**: Track pending requests

### 🛠️ Technical Features
- **Pure Vanilla JavaScript**: No frameworks or dependencies
- **localStorage API**: Client-side data persistence
- **Responsive Grid System**: CSS Grid and Flexbox layouts
- **Form Validation**: Email, phone, and student ID validation
- **Toast Notifications**: Non-intrusive user feedback
- **Modal Dialogs**: Confirmation and information modals
- **Search & Filter**: Real-time search functionality
- **Data Export**: CSV and JSON export capabilities
- **Keyboard Shortcuts**: Ctrl+K for search, Esc for modals
- **Accessibility**: WCAG-compliant markup and navigation

## 📁 Project Structure

```
DMS/
├── index.html              # Landing page
├── login.html              # Login page
├── admin.html              # Admin dashboard
├── student.html            # Student dashboard
├── style.css               # Global styles & theme
├── dashboard.css           # Dashboard layout styles
├── script.js               # Shared JavaScript utilities
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd dms
   ```

2. **Open in browser**
   - Double-click `index.html` or
   - Use a local server (recommended):
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js (with http-server)
     npx http-server
     ```

3. **Access the application**
   - Open `http://localhost:8000` in your browser

## 🔑 Login Credentials

### Admin Account
- **Username**: `admin`
- **Password**: `3265/17`

### Student Accounts
| Name | Student ID | Password |
|------|-----------|----------|
| Usama Awol | 3265/17 | 3265/17 |
| Hisak Kedi | 1580/17 | 1580/17 |
| Zinedin Mujibu | 3445/17 | 3445/17 |

**Note**: Login is case-insensitive for usernames.

## 📱 Pages Overview

### 1. **Landing Page** (`index.html`)
- Hero section with call-to-action
- About section with feature cards
- Contact form
- Navigation bar with dark mode toggle

### 2. **Login Page** (`login.html`)
- Centered glassmorphism login card
- Username/Student ID and password fields
- Password visibility toggle
- Remember me checkbox
- Demo credentials display
- Form validation and error handling

### 3. **Admin Dashboard** (`admin.html`)
- **Dashboard Tab**: System statistics and overview
- **Manage Students Tab**: CRUD operations for students
- **Assign Dorm Tab**: Assign rooms to students
- **Maintenance Tab**: View maintenance requests
- **Reports Tab**: Analytics and data export
- **Settings Tab**: System configuration

### 4. **Student Dashboard** (`student.html`)
- **My Dorm Tab**: View room and personal information
- **Maintenance Tab**: Submit and track requests
- **Fees Tab**: View payment information
- **Profile Tab**: Update personal details

## 🎨 Design System

### Color Palette
- **Primary**: Dark Blue (#050b1a)
- **Secondary**: Navy (#0a1628)
- **Accent Cyan**: #00d4ff
- **Accent Purple**: #7c3aed
- **Accent Green**: #10b981
- **Accent Orange**: #f59e0b
- **Accent Pink**: #ec4899

### Typography
- **Headings**: Orbitron (futuristic)
- **Body**: Inter (clean, readable)

### Spacing
- **Border Radius**: 16px (cards), 10px (inputs)
- **Sidebar Width**: 260px
- **Navbar Height**: 70px

## 💾 Data Storage

All data is stored in browser's `localStorage`:

```javascript
// Students
localStorage.dms_students

// Admin credentials
localStorage.dms_admin

// Current user session
localStorage.dms_user

// Maintenance requests
localStorage.dms_requests

// Theme preference
localStorage.dms_theme

// Analytics events
localStorage.dms_events
```

## 🔧 JavaScript API

### Authentication
```javascript
getCurrentUser()           // Get logged-in user
logout()                   // Clear session and redirect
```

### Data Management
```javascript
getStudents()              // Retrieve all students
saveStudents(students)     // Save students to localStorage
getRequests()              // Get maintenance requests
saveRequests(requests)     // Save requests
getAdmin()                 // Get admin credentials
```

### UI Utilities
```javascript
showToast(message, type)   // Show notification
animateCounter(el, target) // Animate number counter
formatDate(date)           // Format date string
formatTime(date)           // Format time string
```

### Advanced Features
```javascript
validateEmail(email)       // Email validation
validatePhone(phone)       // Phone validation
validateStudentID(id)      // Student ID validation
exportToCSV(data, filename) // Export to CSV
exportToJSON(data, filename) // Export to JSON
trackEvent(name, data)     // Analytics tracking
```

## 🎯 Key Features Explained

### Glassmorphism Effect
```css
.glass-card {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
```

### Neon Glow Animation
```css
.neon-text {
  color: #00d4ff;
  text-shadow: 0 0 10px rgba(0,212,255,0.5);
}
```

### Smooth Transitions
```css
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Responsive Grid
```css
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}
```

## 🌙 Dark/Light Mode

Toggle between themes using the sun/moon icon in the navbar. Preference is saved to localStorage.

```javascript
// Toggle dark mode
document.body.classList.toggle('light-mode');

// Check current theme
const isLight = document.body.classList.contains('light-mode');
```

## 📊 Data Flow

```
Login Page
    ↓
Validate Credentials
    ↓
Store User Session (localStorage)
    ↓
Redirect to Dashboard
    ↓
Load User Data
    ↓
Display Dashboard
```

## 🔒 Security Considerations

- **Client-side only**: No sensitive data sent to servers
- **localStorage**: Data persists in browser only
- **Session timeout**: Auto-logout after 30 minutes
- **Input validation**: All forms validated before submission
- **Case-insensitive login**: Prevents case-sensitivity issues

## 📈 Performance

- **No external dependencies**: Fast loading
- **Optimized CSS**: Minimal file size
- **Vanilla JavaScript**: No framework overhead
- **Lazy loading**: Images and content load on demand
- **CSS animations**: GPU-accelerated for smooth performance

## 🎓 Learning Resources

This project demonstrates:
- Modern CSS (Grid, Flexbox, Backdrop Filter)
- Vanilla JavaScript (ES6+, localStorage API)
- Responsive Design (Mobile-first approach)
- UI/UX Best Practices (Glassmorphism, animations)
- Form Validation and Error Handling
- State Management (localStorage)
- Accessibility (WCAG compliance)

## 🚀 Future Enhancements

- Backend API integration
- Real database (Firebase, MongoDB)
- Email notifications
- SMS alerts
- Payment gateway integration
- Advanced analytics dashboard
- Mobile app version
- PWA support
- Multi-language support

## 📝 License

This project is open source and available for educational and commercial use.

## 👨‍💻 Author

Created as a modern, production-ready Dormitory Management System frontend.

## 🤝 Contributing

Feel free to fork, modify, and improve this project. Contributions are welcome!

## 📞 Support

For issues or questions, please refer to the documentation or create an issue in the repository.

---

**Built with ❤️ using HTML, CSS, and Vanilla JavaScript**

*No frameworks. No dependencies. Just pure web technologies.*
