# DMS - Quick Start Guide

## 🚀 Get Started in 30 Seconds

### Step 1: Open the Project
Simply open `index.html` in your web browser or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx http-server
```

Then visit: `http://localhost:8000`

### Step 2: Login
Click "Login" or go to `login.html`

**Admin Account:**
- Username: `admin`
- Password: `3265/17`

**Student Account:**
- Username: `3265/17`
- Password: `3265/17`

### Step 3: Explore
- **Admin**: Manage students, assign dorms, view reports
- **Student**: View dorm info, submit maintenance requests

---

## 📋 Demo Credentials

### Admin
```
Username: admin
Password: 3265/17
```

### Students
```
ID: 3265/17  | Password: 3265/17  | Name: Usama Awol
ID: 1580/17  | Password: 1580/17  | Name: Hisak Kedi
ID: 3445/17  | Password: 3445/17  | Name: Zinedin Mujibu
```

---

## 🎯 Key Features to Try

### As Admin
1. **Dashboard**: View system statistics
2. **Add Student**: Click "Add Student" button
3. **Assign Dorm**: Select student and assign room
4. **View Reports**: Export student data
5. **Settings**: Configure system

### As Student
1. **My Dorm**: View room assignment
2. **Maintenance**: Submit a maintenance request
3. **Fees**: Check payment status
4. **Profile**: Update personal info

---

## 🌙 Dark Mode
Click the sun/moon icon in the top-right corner to toggle dark/light mode.

---

## 📱 Responsive Design
- **Desktop**: Full sidebar navigation
- **Tablet**: Optimized layout
- **Mobile**: Horizontal navigation bar

---

## 💾 Data Storage
All data is stored in your browser's localStorage:
- Students list
- Maintenance requests
- User sessions
- Theme preference

**Note**: Data persists until you clear browser cache.

---

## 🔑 Important Notes

1. **No Backend Required**: Everything runs in the browser
2. **No Database**: Uses localStorage for data persistence
3. **No Installation**: Just open and use
4. **Case-Insensitive Login**: "ADMIN", "admin", "Admin" all work
5. **Auto-Logout**: Session expires after 30 minutes of inactivity

---

## 🎨 Customization

### Change Colors
Edit `style.css` CSS variables:
```css
:root {
  --accent-cyan: #00d4ff;
  --accent-purple: #7c3aed;
  /* ... more colors ... */
}
```

### Change Fonts
Update font imports in `style.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=...');
```

### Add More Students
Edit `script.js` DEFAULT_STUDENTS array:
```javascript
const DEFAULT_STUDENTS = [
  { id: '1234/17', name: 'New Student', ... },
  // ...
];
```

---

## 🐛 Troubleshooting

### Login Not Working
- Check credentials (case-insensitive)
- Clear browser cache
- Try incognito/private mode

### Data Not Saving
- Check if localStorage is enabled
- Try a different browser
- Clear browser cache and try again

### Styling Issues
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Try a different browser

---

## 📚 File Guide

| File | Purpose |
|------|---------|
| `index.html` | Landing page |
| `login.html` | Login page |
| `admin.html` | Admin dashboard |
| `student.html` | Student dashboard |
| `style.css` | Global styles |
| `dashboard.css` | Dashboard layout |
| `script.js` | JavaScript utilities |

---

## 🔐 Security Notes

- All data stored locally in browser
- No data sent to external servers
- No sensitive information exposed
- Session auto-expires after 30 minutes
- Input validation on all forms

---

## 📞 Need Help?

1. Check `README.md` for detailed documentation
2. Review `PROJECT_AUDIT.md` for feature checklist
3. Inspect browser console for errors (F12)
4. Check localStorage data (DevTools → Application → Storage)

---

## ✨ Pro Tips

1. **Search**: Press Ctrl+K to focus search bar
2. **Close Modals**: Press Esc key
3. **Export Data**: Use "Export" button in Reports
4. **Dark Mode**: Preference is saved automatically
5. **Mobile**: Swipe to navigate on mobile devices

---

**Enjoy using DMS! 🎓**

Built with ❤️ using pure HTML, CSS, and JavaScript.
