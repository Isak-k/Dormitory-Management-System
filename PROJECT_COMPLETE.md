# DMS - Dormitory Management System
## Project Complete ✓

A fully functional dormitory management system built with **pure HTML, CSS, and JavaScript** (no frameworks).

### Features Implemented

#### 1. **Home Page** (`index.html`)
- Modern hero section with gradient text
- Navigation bar with dark mode toggle
- About section with feature cards
- Contact form
- Responsive design
- Animated background orbs

#### 2. **Login Page** (`login.html`)
- Dual-role authentication (Admin & Student)
- Username/password input with icons
- Password visibility toggle
- Remember me checkbox
- Demo credentials display
- Form validation
- Toast notifications

#### 3. **Student Dashboard** (`student.html`)
- Sidebar navigation
- Student profile display
- Room/dorm details
- Maintenance request form
- Dark mode support
- Responsive layout

#### 4. **Admin Dashboard** (`admin.html`)
- Multi-section dashboard:
  - **Overview**: Statistics cards (total students, dorms, occupancy)
  - **Manage Students**: Add, edit, delete students
  - **Assign Dorm**: Assign/reassign dorm rooms
- Student management modal
- Data table with actions
- Form validation
- Dark mode support

#### 5. **Shared Utilities** (`script.js`)
- LocalStorage data persistence
- Authentication management
- Toast notifications
- Dark mode toggle
- Date/time formatting
- Counter animations

#### 6. **Styling** (`style.css` + `dashboard.css`)
- Glassmorphism design
- Neon glows and gradients
- Smooth animations
- Dark/Light mode support
- Responsive grid layouts
- Custom form elements
- Modal dialogs
- Toast notifications

### Authentication

**Admin Login:**
- Username: `admin`
- Password: `3265/17`

**Student Login (use any student ID as both username and password):**
- ID: `3265/17` / Password: `3265/17`
- ID: `1580/17` / Password: `1580/17`
- ID: `3445/17` / Password: `3445/17`

### Data Storage
- All data stored in browser's localStorage
- Default students pre-loaded
- Persistent across sessions

### Tech Stack
- **HTML5** - Semantic markup
- **CSS3** - Glassmorphism, animations, gradients
- **Vanilla JavaScript** - No dependencies
- **Font Awesome 6.5** - Icons
- **Google Fonts** - Inter & Orbitron

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

### File Structure
```
├── index.html           # Home page
├── login.html           # Login page
├── student.html         # Student dashboard
├── admin.html           # Admin dashboard
├── script.js            # Shared utilities
├── style.css            # Global styles
├── dashboard.css        # Dashboard layout
└── default_shadcn_theme.css  # Theme reference
```

### Ready to Deploy
The project is complete and ready for deployment. Simply serve the files over HTTP/HTTPS.
