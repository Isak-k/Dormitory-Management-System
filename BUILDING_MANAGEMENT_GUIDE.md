# Building & Room Management System

## Overview
Admins can now create and manage buildings with individual rooms, capacity, and gender-based assignments.

## Features

### Add Building & Rooms
Admins can add rooms with:
- **Building Name**: e.g., Block A, Block B, Block C
- **Room Number**: e.g., 101, 102, 201
- **Capacity**: 1, 2, 3, or 4 persons per room
- **Gender Based**: Male Only, Female Only, or Mixed

### View All Buildings & Rooms
Table displays:
- Building name
- Room number
- Current occupancy (e.g., 1/2 = 1 occupied out of 2 capacity)
- Gender restriction
- Availability status (Available/Full)
- Delete button (only if room is empty)

### Smart Room Assignment
When assigning students to dorms:
1. Select student from dropdown
2. Select building (auto-populated from created buildings)
3. Select room (shows available rooms with occupancy)
4. System validates:
   - Room capacity not exceeded
   - Gender compatibility (if gender-restricted)
   - Room exists in database

### Validation Rules
- ✓ Cannot assign to full rooms
- ✓ Cannot assign opposite gender to gender-restricted rooms
- ✓ Cannot delete occupied rooms
- ✓ Cannot create duplicate room (same building + room number)

## Data Structure

Buildings stored in localStorage as `dms_buildings`:
```javascript
{
  id: 'BLD-1234567890',
  building: 'Block A',
  room: '101',
  capacity: 2,
  gender: 'Male',
  createdAt: '5/19/2026, 10:30:45 AM'
}
```

## Workflow

### Step 1: Create Buildings & Rooms
1. Go to **Buildings & Rooms** section
2. Fill in room details:
   - Building: Block A
   - Room: 101
   - Capacity: 2
   - Gender: Male
3. Click **Add Room**
4. Repeat for all rooms

### Step 2: Assign Students to Rooms
1. Go to **Assign Dorm** section
2. Select student
3. Select building (auto-populated)
4. Select room (shows available rooms)
5. Click **Save Assignment**

### Step 3: Monitor Occupancy
1. Go to **Buildings & Rooms**
2. View occupancy status for each room
3. See which rooms are full/available

## Example Setup

**Block A:**
- Room 101: 2 capacity, Male
- Room 102: 2 capacity, Male
- Room 103: 2 capacity, Female
- Room 104: 2 capacity, Female

**Block B:**
- Room 201: 3 capacity, Mixed
- Room 202: 3 capacity, Mixed

## Status Indicators

- **Green Badge**: Room has available spaces
- **Orange Badge**: Room is at full capacity
- **Cyan Badge**: Gender restriction type
- **Purple Badge**: Unassigned students

## Tips

1. Create all buildings and rooms first before assigning students
2. Plan room distribution based on student gender ratio
3. Use Mixed rooms for flexibility
4. Delete empty rooms if needed
5. Cannot delete occupied rooms - reassign students first

## Files Modified
- `admin.html` - Added Buildings & Rooms section and assignment logic
- `script.js` - Added getBuildings() and saveBuildings() functions
