# Report System - Real-Time Visibility Guide

## How It Works

### Student Submits Report
1. Student logs in and goes to **Reports** section
2. Fills out the form:
   - Report Type (Complaint, Damage, Safety, Noise, Other)
   - Subject
   - Description
3. Clicks **Submit Report**
4. Report is saved to localStorage with status: **Pending**

### Admin Sees Report Immediately
1. Admin dashboard shows **Pending Reports** count card
2. Reports nav link shows a **red badge** with pending count
3. Admin clicks **Reports** section to see all reports in a table
4. Each report shows:
   - Report ID
   - Student Name
   - Report Type
   - Subject
   - Current Status
   - Submission Date
   - Review button

### Admin Reviews & Updates
1. Admin clicks the **eye icon** to review report details
2. Modal opens showing:
   - Student name
   - Report type
   - Subject
   - Full description
   - Current status dropdown
   - Comment field
3. Admin can:
   - Change status: Pending → In Review → Resolved/Rejected
   - Add comments visible to student
4. Click **Update** to save changes

### Student Sees Updates
1. Student's report list updates with new status
2. If admin added a comment, student sees it below the report
3. Status badge changes color:
   - Orange: Pending
   - Cyan: In Review
   - Green: Resolved
   - Purple: Rejected

## Real-Time Features

✓ **Instant Visibility**: Reports appear in admin dashboard immediately after submission
✓ **Notification Badge**: Red badge on Reports nav shows pending count
✓ **Dashboard Card**: Pending Reports count displayed on admin dashboard
✓ **Status Tracking**: Students see status updates in real-time
✓ **Comments**: Admin comments visible to students
✓ **Persistent Storage**: All data saved in localStorage

## Test Scenario

1. Open two browser windows/tabs
2. **Tab 1**: Login as Student (ID: 3265/17, Password: 3265/17)
3. **Tab 2**: Login as Admin (Username: admin, Password: 3265/17)
4. In Tab 1: Go to Reports → Submit a report
5. In Tab 2: Refresh or navigate to Reports → See the new report immediately
6. In Tab 2: Click review → Change status to "In Review" → Add comment
7. In Tab 1: Refresh Reports → See updated status and admin comment

## Data Structure

Reports stored in localStorage as `dms_reports`:
```javascript
{
  id: 'RPT-1234567890',
  studentId: '3265/17',
  studentName: 'Usama Awol',
  type: 'Complaint',
  subject: 'Noisy Neighbors',
  description: 'Neighbors are making too much noise at night',
  status: 'Pending',
  adminComment: '',
  date: '5/19/2026, 10:30:45 AM'
}
```

## Status Lifecycle

```
Submitted (Pending)
    ↓
Admin Reviews (In Review)
    ↓
    ├→ Resolved (Issue fixed)
    └→ Rejected (Not valid)
```
