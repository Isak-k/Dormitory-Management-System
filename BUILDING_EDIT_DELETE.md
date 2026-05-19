# Building Edit & Delete Features

## Overview
Admins can now edit and delete buildings with full validation and safety checks.

## Edit Building

### How to Edit
1. Go to **Buildings & Dorms Management**
2. Click the **Edit (Pen)** icon on any building row
3. Modal opens with current building details
4. Update any field:
   - Building Name
   - Total Dorms
   - Capacity per Dorm
   - Gender
5. Click **Update** to save changes

### Edit Validations
✓ **Duplicate Name Check**: Cannot rename to existing building name
✓ **Dorm Reduction Check**: Cannot reduce total dorms below occupied dorm numbers
  - Example: If students are in dorms 1-25, cannot reduce total to 20
✓ **Real-time Updates**: All references updated (student assignments, dorm options)

### Example Edit Scenario
```
Original: Amel 1 A (50 dorms, 2 capacity, Male)
Edit to: Amel 1 B (50 dorms, 3 capacity, Male)
Result: Building renamed, capacity updated to 3 persons per dorm
```

## Delete Building

### How to Delete
1. Go to **Buildings & Dorms Management**
2. Click the **Delete (Trash)** icon on any building row
3. Confirmation dialog appears
4. Click **OK** to confirm deletion

### Delete Validations
✓ **Occupancy Check**: Cannot delete if any dorms are occupied
✓ **Confirmation Required**: Must confirm before deletion
✓ **Cascade Updates**: Removes building from all dropdowns

### Error Messages
- "Cannot delete building with occupied dorms. Reassign students first."
  - Solution: Reassign all students to other buildings first

## Safety Features

### Occupied Building Protection
- Cannot delete buildings with students
- Cannot reduce dorm count below occupied dorms
- Prevents data loss and inconsistency

### Name Uniqueness
- Cannot have duplicate building names
- Prevents confusion in student assignments

### Automatic Updates
- When building is edited/deleted, all related data updates:
  - Building dropdown in Assign Dorm
  - Dorm options
  - Student assignments (if building name changed)

## Workflow Example

### Scenario: Merge Two Buildings
1. **Current State:**
   - Amel 1 A: 50 dorms, 2 capacity, Male
   - Amel 1 B: 30 dorms, 2 capacity, Female

2. **Action:**
   - Reassign all students from Amel 1 B to other buildings
   - Delete Amel 1 B
   - Edit Amel 1 A to increase capacity or dorms

3. **Result:**
   - Single building with consolidated students

## Table Actions

| Icon | Action | Condition |
|------|--------|-----------|
| ✏️ Pen | Edit | Always available |
| 🗑️ Trash | Delete | Only if no occupied dorms |

## Modal Fields

**Edit Building Modal:**
- Building Name (text input)
- Total Dorms (number input, 1-200)
- Capacity per Dorm (number input, 1-10)
- Gender (Male/Female dropdown)

## Validation Messages

| Message | Cause | Solution |
|---------|-------|----------|
| "Building name already exists" | Renaming to duplicate name | Choose different name |
| "Cannot reduce dorms below X" | Reducing below occupied dorms | Reassign students first |
| "Cannot delete building with occupied dorms" | Deleting occupied building | Reassign students first |
| "Building updated successfully" | Edit successful | Changes applied |
| "Building deleted successfully" | Delete successful | Building removed |

## Files Modified
- `admin.html` - Added edit modal, edit/delete buttons, edit and delete functions
