# Report System - DMS

## Overview
A complete report submission and review system has been added to the DMS platform, allowing students to submit reports and admins to review and update their status.

## Student Features

### Submit Report
Students can submit reports with:
- **Report Type**: Complaint, Damage Report, Safety Issue, Noise Complaint, Other
- **Subject**: Brief title of the report
- **Description**: Detailed information about the issue

### View My Reports
Students can see all their submitted reports with:
- Report type and subject
- Current status (Pending, In Review, Resolved, Rejected)
- Admin comments (if any)
- Submission date and time

## Admin Features

### Review Reports
Admins can:
- View all student reports in a table
- Click "Review" to open detailed report view
- See student name, report type, subject, and full description

### Update Report Status
Admins can change report status to:
- **Pending**: Initial state when submitted
- **In Review**: Currently being reviewed
- **Resolved**: Issue has been resolved
- **Rejected**: Report was rejected

### Add Comments
Admins can add comments to reports which are visible to students.

## Data Storage
All reports are stored in localStorage under `dms_reports` key with the following structure:

```javascript
{
  id: 'RPT-timestamp',
  studentId: 'student-id',
  studentName: 'Student Name',
  type: 'Report Type',
  subject: 'Report Subject',
  description: 'Full description',
  status: 'Pending|In Review|Resolved|Rejected',
  adminComment: 'Admin comment',
  date: 'submission date'
}
```

## Navigation

**Student Dashboard:**
- Click "Reports" in sidebar to access report system
- Left panel: Submit new report
- Right panel: View all your reports

**Admin Dashboard:**
- Click "Reports" in sidebar to access report management
- View all student reports in table format
- Click eye icon to review and update report status

## Status Badges
- **Pending** (Orange): Awaiting admin review
- **In Review** (Cyan): Currently being reviewed
- **Resolved** (Green): Issue resolved
- **Rejected** (Purple): Report rejected

## Files Modified
- `student.html` - Added Reports section and navigation
- `admin.html` - Added Reports section and review modal
- `script.js` - Added getReports() and saveReports() functions
