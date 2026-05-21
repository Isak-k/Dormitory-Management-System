# Report Communication System - Complete Guide

## Overview
Students and admins can now communicate through reports with a full conversation interface. When a student submits a report, the admin sees it immediately and can reply with comments and status updates.

## Student Workflow

### Step 1: Submit Report
1. Go to **Reports** section in student portal
2. Fill in the form:
   - Report Type (Complaint, Damage, Safety, Noise, Other)
   - Subject
   - Description
3. Click **Submit Report**
4. Report appears in "My Reports" list with status: **Pending**

### Step 2: View Report Status
1. Reports list shows:
   - Report type
   - Subject
   - Current status (Pending, In Review, Resolved, Rejected)
   - Submission date
   - **"Admin replied"** indicator if admin has responded

### Step 3: View Admin Response
1. Click on any report in the list
2. **Report Details** panel opens showing:
   - Your original report (subject, description, date)
   - Current status badge
   - **Admin Response** section (if admin replied)
3. Click **Close** to return to reports list

### Example Student View
```
My Reports:
┌─────────────────────────────────────┐
│ Complaint                    Pending │
│ Noisy Neighbors                     │
│ Admin replied                       │
│ 5/19/2026, 10:30 AM                 │
└─────────────────────────────────────┘

Click to view details:
┌─────────────────────────────────────┐
│ Report Details              [Close]  │
├─────────────────────────────────────┤
│ Your Report:                        │
│ Subject: Noisy Neighbors            │
│ Description: Neighbors making noise │
│ Status: [In Review]                 │
├─────────────────────────────────────┤
│ Admin Response:                     │
│ We are investigating this issue.    │
│ Please document the times when      │
│ noise occurs.                       │
└─────────────────────────────────────┘
```

## Admin Workflow

### Step 1: See New Reports
1. Dashboard shows **Pending Reports** count
2. Reports nav link shows red badge with count
3. Go to **Reports** section

### Step 2: View All Reports
Table displays:
- Report ID
- Student Name
- Report Type
- Subject
- Status (Pending, In Review, Resolved, Rejected)
- Submission Date
- Review button (eye icon)

### Step 3: Review & Reply
1. Click **eye icon** to review report
2. Modal opens showing:
   - Student name
   - Report type
   - Subject
   - Full description
   - Current status dropdown
   - Comment field
3. Update status: Pending → In Review → Resolved/Rejected
4. Add comment (visible to student)
5. Click **Update** to save

### Example Admin View
```
Reports Table:
┌──────────────────────────────────────────────────┐
│ ID    │ Student │ Type      │ Subject │ Status   │
├──────────────────────────────────────────────────┤
│ RPT-1 │ Usama   │ Complaint │ Noise   │ Pending  │
│ RPT-2 │ Hisak   │ Damage    │ Broken  │ In Review│
└──────────────────────────────────────────────────┘

Click review:
┌──────────────────────────────────────────────────┐
│ Review Report                                    │
├──────────────────────────────────────────────────┤
│ Student: Usama Awol                              │
│ Type: Complaint                                  │
│ Subject: Noisy Neighbors                         │
│ Description: Neighbors making too much noise...  │
│ Status: [In Review ▼]                            │
│ Comment: [We are investigating...]               │
│ [Update] [Cancel]                                │
└──────────────────────────────────────────────────┘
```

## Communication Flow

```
Student Submits Report
        ↓
Report saved to localStorage
        ↓
Admin sees report in Reports section
        ↓
Admin clicks review
        ↓
Admin updates status & adds comment
        ↓
Comment saved to report
        ↓
Student sees "Admin replied" indicator
        ↓
Student clicks report to view admin response
        ↓
Student sees full conversation
```

## Status Lifecycle

| Status | Meaning | Admin Action |
|--------|---------|--------------|
| Pending | Just submitted | Review and investigate |
| In Review | Being investigated | Add comment with findings |
| Resolved | Issue fixed | Confirm resolution |
| Rejected | Not valid | Explain why rejected |

## Real-Time Features

✓ **Instant Visibility**: Reports appear in admin portal immediately
✓ **Live Updates**: Status changes visible to student in real-time
✓ **Notification Badge**: Red badge shows pending report count
✓ **Reply Indicator**: Student sees "Admin replied" when comment added
✓ **Full Conversation**: Both parties see complete exchange
✓ **Persistent Storage**: All data saved in localStorage

## Data Structure

Report object in localStorage:
```javascript
{
  id: 'RPT-1234567890',
  studentId: '3265/17',
  studentName: 'Usama Awol',
  type: 'Complaint',
  subject: 'Noisy Neighbors',
  description: 'Neighbors making too much noise at night',
  status: 'In Review',
  adminComment: 'We are investigating this issue. Please document times.',
  date: '5/19/2026, 10:30:45 AM'
}
```

## Test Scenario

1. **Open two browser windows:**
   - Window 1: Student (ID: 3265/17)
   - Window 2: Admin (Username: admin)

2. **Student submits report:**
   - Go to Reports → Submit Report
   - Type: Complaint
   - Subject: Noisy Neighbors
   - Description: Too much noise at night
   - Click Submit

3. **Admin sees report:**
   - Window 2 shows "Pending Reports: 1"
   - Go to Reports section
   - See report in table
   - Click review

4. **Admin replies:**
   - Change status to "In Review"
   - Add comment: "We will investigate"
   - Click Update

5. **Student sees reply:**
   - Window 1 shows "Admin replied" indicator
   - Click report to view details
   - See admin comment and status

## Features

✓ Unlimited reports per student
✓ Multiple status options
✓ Admin comments visible to students
✓ Real-time updates across windows
✓ Full conversation history
✓ Status tracking
✓ Notification badges
✓ Persistent storage

## Files Modified
- `student.html` - Added report details view and conversation interface
- `admin.html` - Report review modal (already complete)
