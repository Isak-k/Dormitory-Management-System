# Report System - Troubleshooting Guide

## Issue: Student Report Not Appearing in Admin Portal

### Solution 1: Auto-Refresh (Now Enabled)
✅ **Fixed**: Admin portal now auto-refreshes reports every 2 seconds
- Reports update automatically without manual refresh
- No need to navigate away and back

### Solution 2: Manual Refresh
If reports still don't appear:
1. Click **Refresh** button in Reports section header
2. Reports table will update immediately

### Solution 3: Check Browser Storage
Reports are stored in browser's localStorage:
1. Open Browser DevTools (F12)
2. Go to **Application** → **Local Storage**
3. Look for key: `dms_reports`
4. Should contain array of report objects

### Solution 4: Verify Student Login
- Student must be logged in to submit reports
- Report is associated with student's ID
- Admin must be logged in to see reports

### Solution 5: Check Both Portals
**Student Portal:**
1. Go to **Reports** section
2. Click **Submit Report**
3. Fill in all fields (Type, Subject, Description)
4. Click **Submit Report**
5. Report appears in "My Reports" list

**Admin Portal:**
1. Go to **Reports** section
2. Should see report in table immediately
3. If not, click **Refresh** button
4. Reports auto-refresh every 2 seconds

## How Reports Work

### Data Flow
```
Student submits report
        ↓
Saved to localStorage (dms_reports)
        ↓
Admin portal auto-refreshes every 2 seconds
        ↓
Report appears in admin Reports table
        ↓
Admin clicks review
        ↓
Admin updates status & adds comment
        ↓
Changes saved to localStorage
        ↓
Student sees update in real-time
```

### Storage Keys
- `dms_reports` - All reports (student + admin)
- `dms_students` - Student data
- `dms_user` - Current logged-in user

## Test Checklist

✓ Student logged in (check sidebar shows student name)
✓ Student goes to Reports section
✓ Student fills all fields (Type, Subject, Description)
✓ Student clicks Submit Report
✓ Toast shows "Report submitted successfully"
✓ Report appears in "My Reports" list
✓ Admin logged in (check sidebar shows "DMS Admin")
✓ Admin goes to Reports section
✓ Report appears in table (or click Refresh)
✓ Admin clicks eye icon to review
✓ Modal shows report details
✓ Admin updates status and adds comment
✓ Admin clicks Update
✓ Toast shows "Report updated successfully"
✓ Student sees "Admin replied" indicator
✓ Student clicks report to view admin response

## Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Report not appearing | Browser cache | Click Refresh button or F5 |
| Report not saving | Not logged in | Login as student first |
| Admin can't see reports | Wrong section | Go to Reports section |
| Comment not visible | Page not refreshed | Click Refresh or wait 2 seconds |
| Multiple reports | Duplicate submissions | Check "My Reports" list |

## Browser Compatibility

✓ Chrome/Edge (latest)
✓ Firefox (latest)
✓ Safari (latest)
✓ Mobile browsers

## Performance

- Auto-refresh: Every 2 seconds
- No server needed: All data in localStorage
- Instant updates: Changes visible immediately
- No page reload required

## Data Persistence

- Reports persist across browser sessions
- Data stored in localStorage (not deleted on logout)
- Clear browser data to reset all reports
- Each browser has separate storage

## Advanced Troubleshooting

### Check localStorage directly:
```javascript
// In browser console (F12):
console.log(JSON.parse(localStorage.getItem('dms_reports')));
```

### Clear all data:
```javascript
// In browser console:
localStorage.clear();
// Then refresh page
```

### Check if report was saved:
```javascript
// In browser console:
const reports = JSON.parse(localStorage.getItem('dms_reports') || '[]');
console.log('Total reports:', reports.length);
console.log(reports);
```

## Features Enabled

✅ Auto-refresh every 2 seconds
✅ Manual refresh button
✅ Real-time updates
✅ Persistent storage
✅ No page reload needed
✅ Notification badges
✅ Status tracking
✅ Admin comments
✅ Full conversation history
