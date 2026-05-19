# Building & Dorm Management System - Updated

## Overview
Admins can create buildings with multiple dorms, where each dorm has a capacity and gender restriction.

## System Structure

### Building Setup
- **Building Name**: e.g., "Amel 1 A", "Block B", "Hostel C"
- **Total Dorms**: Maximum number of dorms (e.g., 50 means dorms numbered 1-50)
- **Capacity per Dorm**: How many students per dorm (1, 2, 3, or 4)
- **Gender Based**: Male Only, Female Only, or Mixed

### Example
```
Building: Amel 1 A
Total Dorms: 50
Capacity: 2 persons per dorm
Gender: Male Only

Result: 50 dorms (1-50), each can hold 2 male students
```

## Admin Workflow

### Step 1: Create Buildings
1. Go to **Buildings & Dorms Management**
2. Fill in the form:
   - Building Name: "Amel 1 A"
   - Total Dorms: 50
   - Capacity per Dorm: 2
   - Gender Based: Male
3. Click **Add Building**

### Step 2: View Buildings
Table shows:
- Building name
- Total dorms available
- Capacity per dorm
- Gender restriction
- Occupied dorms count
- Available dorms count
- Delete button

### Step 3: Assign Students to Dorms
1. Go to **Assign Dorm**
2. Select student
3. Select building (auto-populated from created buildings)
4. Select dorm number (1-50, shows availability)
5. Click **Save Assignment**

## Validation Rules

✓ **Capacity Check**: Cannot assign if dorm is full
✓ **Gender Check**: Cannot assign opposite gender to gender-restricted buildings
✓ **Dorm Range**: Dorm numbers auto-generated from 1 to Total Dorms
✓ **Occupancy Display**: Shows current occupancy (e.g., 1/2 = 1 occupied out of 2 capacity)
✓ **Delete Protection**: Cannot delete building with occupied dorms

## Data Structure

Buildings stored in localStorage as `dms_buildings`:
```javascript
{
  id: 'BLD-1234567890',
  name: 'Amel 1 A',
  totalDorms: 50,
  capacity: 2,
  gender: 'Male',
  createdAt: '5/19/2026, 10:30:45 AM'
}
```

Students store building and dorm number:
```javascript
{
  id: '3265/17',
  name: 'Usama Awol',
  building: 'Amel 1 A',
  dorm: 5,  // Dorm number 1-50
  capacity: 2,
  ...
}
```

## Dashboard Display

**Buildings & Dorms Table:**
| Building | Total Dorms | Capacity | Gender | Occupied | Available | Actions |
|----------|------------|----------|--------|----------|-----------|---------|
| Amel 1 A | 50 | 2 Person(s) | Male | 25 | 25 | Delete |
| Block B | 30 | 3 Person(s) | Female | 20 | 10 | Delete |

## Dorm Assignment Example

**Building: Amel 1 A (Male, 2 capacity)**
- Dorm 1: 2/2 (Full)
- Dorm 2: 1/2 (1 Available)
- Dorm 3: 0/2 (2 Available)
- Dorm 4: 2/2 (Full)
- Dorm 5: 1/2 (1 Available)

When assigning a student:
- Can assign to Dorm 2, 3, or 5 (have space)
- Cannot assign to Dorm 1 or 4 (full)
- Cannot assign female student (building is Male only)

## Features

✓ Unlimited buildings
✓ Flexible dorm count per building (1-200)
✓ Flexible capacity per dorm (1-4 persons)
✓ Gender-based restrictions
✓ Real-time occupancy tracking
✓ Automatic dorm numbering (1 to Total Dorms)
✓ Prevent deletion of occupied buildings
✓ Gender compatibility validation

## Files Modified
- `admin.html` - Updated Buildings & Dorms section and Assign Dorm form
- `script.js` - getBuildings() and saveBuildings() functions
