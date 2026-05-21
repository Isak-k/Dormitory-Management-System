// Security Check
const user = getCurrentUser();
if (!user || user.role !== 'admin') window.location.href = 'login.html';

function switchSection(id) {
  document.querySelectorAll('.dashboard-section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  event.currentTarget.classList.add('active');
}

function updateStats() {
  const students = getStudents();
  const assigned = students.filter(s => s.dorm).length;
  const occupancy = students.length > 0 ? Math.round((assigned / students.length) * 100) : 0;
  const pendingReports = getReports().filter(r => r.status === 'Pending').length;

  document.getElementById('stat-total-students').innerText = students.length;
  document.getElementById('stat-occupied-rooms').innerText = assigned;
  document.getElementById('stat-occupancy').innerText = occupancy + '%';
  document.getElementById('stat-pending-tasks').innerText = getRequests().length;
  document.getElementById('stat-pending-reports').innerText = pendingReports;

  // Update badge
  const badge = document.getElementById('reports-badge');
  if (pendingReports > 0) {
    badge.innerText = pendingReports;
    badge.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
  }
}

function updateDashboardOverview() {
  const students = getStudents();
  const buildings = getBuildings();
  const departments = getDepartments();
  
  // Update Buildings Overview
  const buildingsOverview = document.getElementById('buildings-overview');
  buildingsOverview.innerHTML = '';
  if (buildings.length === 0) {
    buildingsOverview.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-muted);">No buildings added yet</div>';
  } else {
    buildings.forEach((b, idx) => {
      const count = students.filter(s => s.building === b.name).length;
      const colors = ['var(--accent-cyan)', 'var(--accent-purple)', 'var(--accent-pink)', 'var(--accent-green)', 'var(--accent-orange)'];
      const color = colors[idx % colors.length];
      const isLast = idx === buildings.length - 1;
      buildingsOverview.innerHTML += `
        <div style="display: flex; justify-content: space-between; padding: 10px 0; ${!isLast ? 'border-bottom: 1px solid var(--glass-border);' : ''}">
          <span>${b.name}</span>
          <span style="color: ${color}; font-weight: 600;">${count} Students</span>
        </div>
      `;
    });
  }
  
  // Update Departments Overview
  const deptsOverview = document.getElementById('departments-overview');
  deptsOverview.innerHTML = '';
  if (departments.length === 0) {
    deptsOverview.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-muted);">No departments added yet</div>';
  } else {
    departments.forEach((dept, idx) => {
      const count = students.filter(s => s.department === dept.name).length;
      const colors = ['var(--accent-green)', 'var(--accent-orange)', 'var(--accent-cyan)', 'var(--accent-purple)', 'var(--accent-pink)'];
      const color = colors[idx % colors.length];
      const isLast = idx === departments.length - 1;
      deptsOverview.innerHTML += `
        <div style="display: flex; justify-content: space-between; padding: 10px 0; ${!isLast ? 'border-bottom: 1px solid var(--glass-border);' : ''}">
          <span>${dept.name}</span>
          <span style="color: ${color}; font-weight: 600;">${count} Students</span>
        </div>
      `;
    });
  }
  
  // Update Room Occupancy
  let totalRooms = 0;
  let occupiedRooms = 0;
  buildings.forEach(b => {
    totalRooms += b.totalDorms;
    for (let dorm = 1; dorm <= b.totalDorms; dorm++) {
      const dormStr = String(dorm);
      const count = students.filter(s => s.building === b.name && s.dorm === dormStr).length;
      if (count > 0) occupiedRooms++;
    }
  });
  const availableRooms = totalRooms - occupiedRooms;
  document.getElementById('report-total-rooms').innerText = totalRooms;
  document.getElementById('report-occupied').innerText = occupiedRooms;
  document.getElementById('report-available').innerText = availableRooms;
}

function populateDepartmentSelects() {
  const departments = getDepartments();
  const deptSelects = [
    document.getElementById('studDept'),
    document.getElementById('filter-department'),
    document.getElementById('assign-department')
  ];

  deptSelects.forEach(select => {
    if (!select) return;
    const currentValue = select.value;
    select.innerHTML = select.id === 'filter-department' ? '<option value="">All Departments</option>' : '<option value="">Select Department</option>';
    departments.forEach(dept => {
      const option = document.createElement('option');
      option.value = dept.name;
      option.textContent = `${dept.code} - ${dept.name}`;
      select.appendChild(option);
    });
    if (currentValue) select.value = currentValue;
  });
}

function renderDepartmentsList() {
  const departments = getDepartments();
  const students = getStudents();
  const tbody = document.getElementById('departments-list');
  tbody.innerHTML = '';

  if (departments.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 30px; color: var(--text-muted);"><i class="fa-solid fa-inbox" style="font-size: 24px; margin-bottom: 8px; display: block; opacity: 0.5;"></i>No departments yet</td></tr>';
    return;
  }

  departments.forEach((dept, idx) => {
    const count = students.filter(s => s.department === dept.name).length;
    tbody.innerHTML += `
      <tr>
        <td><span class="badge badge-cyan">${dept.code}</span></td>
        <td>${dept.name}</td>
        <td><span class="badge badge-purple">${count}</span></td>
        <td>
          <button class="btn btn-ghost btn-sm" onclick="editDepartment(${idx})" title="Edit">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteDepartment(${idx})" title="Delete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
}

function openAddDepartmentModal() {
  document.getElementById('deptModalTitle').innerText = 'Add Department';
  document.getElementById('departmentForm').reset();
  document.getElementById('editDeptIndex').value = '';
  document.getElementById('departmentModalOverlay').classList.add('active');
}

function editDepartment(idx) {
  const departments = getDepartments();
  const dept = departments[idx];
  document.getElementById('deptCode').value = dept.code;
  document.getElementById('deptName').value = dept.name;
  document.getElementById('deptDesc').value = dept.description || '';
  document.getElementById('editDeptIndex').value = idx;
  document.getElementById('deptModalTitle').innerText = 'Edit Department';
  document.getElementById('departmentModalOverlay').classList.add('active');
}

function handleDepartmentSave(e) {
  e.preventDefault();
  const departments = getDepartments();
  const idx = document.getElementById('editDeptIndex').value;
  const data = {
    id: 'DEPT-' + Date.now(),
    code: document.getElementById('deptCode').value,
    name: document.getElementById('deptName').value,
    description: document.getElementById('deptDesc').value,
    createdAt: new Date().toLocaleString()
  };

  if (idx !== '') {
    data.id = departments[idx].id;
    data.createdAt = departments[idx].createdAt;
    const oldName = departments[idx].name;
    departments[idx] = data;
    
    const students = getStudents();
    students.forEach(s => {
      if (s.department === oldName) {
        s.department = data.name;
      }
    });
    saveStudents(students);
    showToast('Department updated successfully', 'success');
  } else {
    departments.push(data);
    showToast('Department added successfully', 'success');
  }

  saveDepartments(departments);
  renderDepartmentsList();
  populateDepartmentSelects();
  updateDashboardOverview();
  closeModal('departmentModalOverlay');
}

function deleteDepartment(idx) {
  const departments = getDepartments();
  const dept = departments[idx];
  const students = getStudents();
  const count = students.filter(s => s.department === dept.name).length;
  
  if (count > 0) {
    showToast(`Cannot delete: ${count} student(s) in this department. Reassign them first.`, 'error');
    return;
  }

  if (confirm('Are you sure you want to delete this department?')) {
    departments.splice(idx, 1);
    saveDepartments(departments);
    renderDepartmentsList();
    populateDepartmentSelects();
    updateDashboardOverview();
    showToast('Department deleted successfully', 'success');
  }
}

function renderAdminTable() {
  const students = getStudents();
  const filterDept = document.getElementById('filter-department').value;
  const filterGender = document.getElementById('filter-gender').value;
  const tbody = document.getElementById('admin-student-list');
  tbody.innerHTML = '';

  let filteredStudents = students;
  if (filterDept) {
    filteredStudents = filteredStudents.filter(s => s.department === filterDept);
  }
  if (filterGender) {
    filteredStudents = filteredStudents.filter(s => s.gender === filterGender);
  }

  if (filteredStudents.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px; color: var(--text-muted);"><i class="fa-solid fa-inbox" style="font-size: 32px; margin-bottom: 10px; display: block; opacity: 0.5;"></i>No students found</td></tr>';
    return;
  }

  filteredStudents.forEach((s, idx) => {
    const originalIdx = students.indexOf(s);
    tbody.innerHTML += `
      <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.department}</td>
        <td><span class="badge badge-cyan">${s.gender}</span></td>
        <td>${s.building || '-'}</td>
        <td><span class="badge badge-purple">${s.dorm || 'Unassigned'}</span></td>
        <td>
          <button class="btn btn-ghost btn-sm" onclick="editStudent(${originalIdx})" title="Edit">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteStudent(${originalIdx})" title="Delete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });

  updateStats();
  populateBuildingSelect();
}

function updateStudentOptions() {
  const mode = document.getElementById('assign-mode').value;
  const selectedDept = document.getElementById('assign-department').value;
  const selectedGender = document.getElementById('assign-gender').value;
  const searchQuery = document.getElementById('assign-student-search').value.toLowerCase().trim();
  const studentSelect = document.getElementById('assign-student-id');
  studentSelect.innerHTML = '<option value="">Choose Student...</option>';

  if (!selectedDept || !selectedGender) return;

  let students = getStudents();
  let filteredStudents = students.filter(s => s.department === selectedDept && s.gender === selectedGender);

  // Apply mode filter
  if (mode === 'assign') {
    filteredStudents = filteredStudents.filter(s => !s.dorm);
  } else if (mode === 'update') {
    filteredStudents = filteredStudents.filter(s => s.dorm);
  }

  // Apply search filter
  if (searchQuery) {
    filteredStudents = filteredStudents.filter(s => 
      s.name.toLowerCase().includes(searchQuery) || s.id.toLowerCase().includes(searchQuery)
    );
  }

  // Sort in ascending order by name
  filteredStudents.sort((a, b) => a.name.localeCompare(b.name));

  if (filteredStudents.length === 0) {
    const message = mode === 'assign' 
      ? 'No unassigned students found in this department and gender.' 
      : 'No assigned students found in this department and gender.';
    studentSelect.innerHTML = `<option value="" disabled>${message}</option>`;
    return;
  }

  filteredStudents.forEach(s => {
    const option = document.createElement('option');
    option.value = s.id;
    option.textContent = `${s.name} (${s.id}) - ${s.dorm ? `Assigned to ${s.building} Dorm ${s.dorm}` : 'Unassigned'}`;
    studentSelect.appendChild(option);
  });
}

function handleModeChange() {
  const mode = document.getElementById('assign-mode').value;
  const autoSection = document.getElementById('auto-assign-section');
  const manualSection = document.getElementById('manual-assign-section');
  const bulkUnassignSection = document.getElementById('bulk-unassign-section');
  const bulkChangeBuildingSection = document.getElementById('bulk-change-building-section');
  
  // Hide all sections first
  autoSection.style.display = 'none';
  manualSection.style.display = 'none';
  bulkUnassignSection.style.display = 'none';
  bulkChangeBuildingSection.style.display = 'none';
  
  if (mode === 'auto') {
    autoSection.style.display = 'block';
    populateAutoDepartmentSelect();
  } else if (mode === 'bulk-unassign') {
    bulkUnassignSection.style.display = 'block';
    populateBulkUnassignDepartmentSelect();
  } else if (mode === 'bulk-change-building') {
    bulkChangeBuildingSection.style.display = 'block';
    populateBulkChangeDepartmentSelect();
  } else {
    manualSection.style.display = 'block';
    updateStudentOptions();
    loadCurrentAssignment();
  }
}

function populateBulkUnassignDepartmentSelect() {
  const departments = getDepartments();
  const select = document.getElementById('bulk-unassign-department');
  select.innerHTML = '<option value="">All Departments</option>';
  departments.forEach(dept => {
    const option = document.createElement('option');
    option.value = dept.name;
    option.textContent = `${dept.code} - ${dept.name}`;
    select.appendChild(option);
  });
}

function populateBulkChangeDepartmentSelect() {
  const departments = getDepartments();
  const select = document.getElementById('bulk-change-department');
  select.innerHTML = '<option value="">Select Department</option>';
  departments.forEach(dept => {
    const option = document.createElement('option');
    option.value = dept.name;
    option.textContent = `${dept.code} - ${dept.name}`;
    select.appendChild(option);
  });
}

function populateBulkChangeBuildingSelect() {
  const selectedGender = document.getElementById('bulk-change-gender').value;
  const buildingSelect = document.getElementById('bulk-change-new-building');
  buildingSelect.innerHTML = '<option value="">Select New Building</option>';

  const buildings = getBuildings();
  const filteredBuildings = selectedGender ? buildings.filter(b => b.gender === selectedGender) : buildings;
  
  filteredBuildings.forEach(b => {
    const option = document.createElement('option');
    option.value = b.name;
    option.textContent = b.name;
    buildingSelect.appendChild(option);
  });
}

function handleBulkChangeBuildingFromSection() {
  const dept = document.getElementById('bulk-change-department').value;
  const gender = document.getElementById('bulk-change-gender').value;
  const newBuildingName = document.getElementById('bulk-change-new-building').value;

  if (!dept || !gender || !newBuildingName) {
    showToast('Please fill all fields', 'error');
    return;
  }

  const students = getStudents();
  const buildings = getBuildings();
  const newBuilding = buildings.find(b => b.name === newBuildingName);
  
  if (!newBuilding) {
    showToast('Invalid building', 'error');
    return;
  }

  let count = 0;
  students.forEach(student => {
    if (student.department === dept && student.gender === gender && student.dorm) {
      student.building = newBuildingName;
      count++;
    }
  });

  if (count === 0) {
    showToast('No assigned students found in this department and gender', 'info');
    return;
  }

  if (!confirm(`Are you sure you want to change building for ${count} student(s) to ${newBuildingName}?`)) return;

  saveStudents(students);
  showToast(`Successfully changed building for ${count} student(s)`, 'success');
  renderAdminTable();
  renderBuildingsList();
  updateDashboardOverview();
  updateStudentOptions();
}

function handleBulkUnassign() {
  const dept = document.getElementById('bulk-unassign-department').value;
  const gender = document.getElementById('bulk-unassign-gender').value;

  if (!dept && !gender) {
    showToast('Please select at least a department or gender to bulk unassign', 'error');
    return;
  }

  const students = getStudents();
  let count = 0;

  students.forEach(student => {
    if (student.dorm) {
      if ((!dept || student.department === dept) && (!gender || student.gender === gender)) {
        student.building = '';
        student.dorm = '';
        student.capacity = '';
        count++;
      }
    }
  });

  if (count === 0) {
    showToast('No assigned students found with the selected filters', 'info');
    return;
  }

  if (!confirm(`Are you sure you want to unassign ${count} student(s)?`)) return;

  saveStudents(students);
  showToast(`Successfully unassigned ${count} student(s)`, 'success');
  renderAdminTable();
  renderBuildingsList();
  updateDashboardOverview();
  updateStudentOptions();
}

function populateAutoDepartmentSelect() {
  const departments = getDepartments();
  const select = document.getElementById('auto-department');
  select.innerHTML = '<option value="">Select Department</option>';
  departments.forEach(dept => {
    const option = document.createElement('option');
    option.value = dept.name;
    option.textContent = `${dept.code} - ${dept.name}`;
    select.appendChild(option);
  });
}

function populateAutoBuildingSelect() {
  const selectedGender = document.getElementById('auto-gender').value;
  const buildingSelect = document.getElementById('auto-building');
  buildingSelect.innerHTML = '<option value="">Select Building</option>';

  const buildings = getBuildings();
  const filteredBuildings = selectedGender ? buildings.filter(b => b.gender === selectedGender) : buildings;
  
  filteredBuildings.forEach(b => {
    const option = document.createElement('option');
    option.value = b.name;
    option.textContent = b.name;
    buildingSelect.appendChild(option);
  });
}

function handleAutoAssign() {
  const dept = document.getElementById('auto-department').value;
  const gender = document.getElementById('auto-gender').value;
  const buildingName = document.getElementById('auto-building').value;

  if (!dept || !gender || !buildingName) {
    showToast('Please fill all fields', 'error');
    return;
  }

  const students = getStudents();
  const buildings = getBuildings();
  const building = buildings.find(b => b.name === buildingName);

  if (!building) {
    showToast('Invalid building', 'error');
    return;
  }

  // Get unassigned students in this dept and gender, sorted by name
  let unassignedStudents = students.filter(s => 
    s.department === dept && 
    s.gender === gender && 
    !s.dorm
  ).sort((a, b) => a.name.localeCompare(b.name));

  if (unassignedStudents.length === 0) {
    showToast('No unassigned students in this department and gender', 'info');
    return;
  }

  // Calculate total capacity
  const totalCapacity = building.totalDorms * building.capacity;
  const studentsToAssign = unassignedStudents.slice(0, totalCapacity);
  const overflow = unassignedStudents.length - totalCapacity;

  if (overflow > 0) {
    showToast(`${overflow} student(s) exceed dorm capacity. They will remain unassigned.`, 'warning');
  }

  // Assign students
  const startRoom = building.startRoom || 1;
  let currentDorm = startRoom;
  let currentDormCount = 0;

  studentsToAssign.forEach(student => {
    const studentObj = students.find(s => s.id === student.id);
    if (studentObj) {
      studentObj.building = buildingName;
      studentObj.dorm = String(currentDorm);
      studentObj.capacity = String(building.capacity);
      currentDormCount++;
      
      if (currentDormCount >= building.capacity) {
        currentDorm++;
        currentDormCount = 0;
      }
    }
  });

  saveStudents(students);
  showToast(`Successfully assigned ${studentsToAssign.length} student(s)`, 'success');
  
  // Refresh all relevant sections
  renderAdminTable();
  renderBuildingsList();
  updateDashboardOverview();
  updateStudentOptions();
}

function loadCurrentAssignment() {
  const mode = document.getElementById('assign-mode').value;
  const studentId = document.getElementById('assign-student-id').value;
  const unassignBtn = document.getElementById('unassign-btn');
  
  if (!studentId) {
    unassignBtn.style.display = 'none';
    return;
  }

  const students = getStudents();
  const student = students.find(s => s.id === studentId);
  if (student) {
    document.getElementById('assign-building').value = student.building || '';
    updateDormOptions();
    if (student.dorm) {
      document.getElementById('assign-dorm').value = String(student.dorm);
    }
    
    // Show unassign button only in update mode and if student is assigned
    if (mode === 'update' && student.dorm) {
      unassignBtn.style.display = 'block';
    } else {
      unassignBtn.style.display = 'none';
    }
  }
}

function handleUnassign() {
  const studentId = document.getElementById('assign-student-id').value;
  if (!studentId) return;
  
  if (!confirm('Are you sure you want to unassign this student from their dorm?')) return;

  const students = getStudents();
  const student = students.find(s => s.id === studentId);
  if (student) {
    student.building = '';
    student.dorm = '';
    student.capacity = '';
    saveStudents(students);
    showToast('Student unassigned successfully', 'success');
    document.getElementById('assignForm').reset();
    updateStudentOptions();
    renderAdminTable();
    renderBuildingsList();
    updateDashboardOverview();
  }
}



function openAddModal() {
  document.getElementById('modalTitle').innerText = 'Add Student';
  document.getElementById('studentForm').reset();
  document.getElementById('editIndex').value = '';
  populateDepartmentSelects();
  document.getElementById('studentModalOverlay').classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

function handleStudentSave(e) {
  e.preventDefault();
  const students = getStudents();
  const idx = document.getElementById('editIndex').value;
  const data = {
    id: document.getElementById('studId').value,
    name: document.getElementById('studName').value,
    department: document.getElementById('studDept').value,
    gender: document.getElementById('studGender').value,
    building: '',
    dorm: '',
    capacity: '2'
  };

  if (idx !== '') {
    data.building = students[idx].building;
    data.dorm = students[idx].dorm;
    data.capacity = students[idx].capacity;
    students[idx] = data;
    showToast('Student updated successfully', 'success');
  } else {
    students.push(data);
    showToast('Student added successfully', 'success');
  }

  saveStudents(students);
  renderAdminTable();
  renderDepartmentsList();
  updateDashboardOverview();
  closeModal('studentModalOverlay');
}

function editStudent(idx) {
  const students = getStudents();
  const s = students[idx];
  populateDepartmentSelects();
  document.getElementById('studId').value = s.id;
  document.getElementById('studName').value = s.name;
  document.getElementById('studDept').value = s.department;
  document.getElementById('studGender').value = s.gender;
  document.getElementById('editIndex').value = idx;
  document.getElementById('modalTitle').innerText = 'Edit Student';
  document.getElementById('studentModalOverlay').classList.add('active');
}

function deleteStudent(idx) {
  if (confirm('Are you sure you want to delete this student?')) {
    const students = getStudents();
    students.splice(idx, 1);
    saveStudents(students);
  renderAdminTable();
  renderDepartmentsList();
  updateDashboardOverview();
  showToast('Student deleted successfully', 'success');
  }
}

function handleAssign(e) {
  e.preventDefault();
  const sid = document.getElementById('assign-student-id').value;
  const buildingName = document.getElementById('assign-building').value;
  const dormNum = document.getElementById('assign-dorm').value;

  if (!sid || !buildingName || !dormNum) {
    showToast('Please fill all fields', 'error');
    return;
  }

  const buildings = getBuildings();
  const building = buildings.find(b => b.name === buildingName);
  
  if (!building) {
    showToast('Invalid building selection', 'error');
    return;
  }

  // Check capacity
  const students = getStudents();
  const occupants = students.filter(s => s.building === buildingName && s.dorm === dormNum).length;
  
  if (occupants >= building.capacity) {
    showToast('This dorm is at full capacity', 'error');
    return;
  }

  // Check gender compatibility
  const student = students.find(s => s.id === sid);
  if (student.gender !== building.gender) {
    showToast(`This building is for ${building.gender} students only`, 'error');
    return;
  }

  const s = students.find(x => x.id === sid);
  if (s) {
    s.building = buildingName;
    s.dorm = dormNum;
    s.capacity = building.capacity;
    saveStudents(students);
    showToast('Dorm assigned successfully', 'success');
    renderAdminTable();
    renderBuildingsList();
    updateStudentOptions();
    document.getElementById('assignForm').reset();
    populateDepartmentSelects();
    updateDashboardOverview();
  }
}

function updateDormOptions() {
  const selectedBuilding = document.getElementById('assign-building').value;
  const dormSelect = document.getElementById('assign-dorm');
  dormSelect.innerHTML = '<option value="">Select Dorm</option>';

  if (!selectedBuilding) return;

  const buildings = getBuildings();
  const building = buildings.find(b => b.name === selectedBuilding);

  if (!building) return;

  const students = getStudents();
  const startRoom = building.startRoom || 1; // Default to 1 if not set

  // Generate dorm numbers from startRoom to startRoom + totalDorms - 1
  for (let i = 0; i < building.totalDorms; i++) {
    const dorm = startRoom + i;
    const dormStr = String(dorm);
    const occupants = students.filter(s => s.building === building.name && s.dorm === dormStr).length;
    const available = building.capacity - occupants;
    const status = available > 0 ? `(${available}/${building.capacity})` : '(Full)';
    
    const option = document.createElement('option');
    option.value = dormStr;
    option.textContent = `Dorm ${dorm} ${status}`;
    option.disabled = available <= 0;
    dormSelect.appendChild(option);
  }
}

function populateBuildingSelect() {
  const buildingSelect = document.getElementById('assign-building');
  buildingSelect.innerHTML = '<option value="">Select Building</option>';

  const selectedGender = document.getElementById('assign-gender').value;
  const buildings = getBuildings();
  const filteredBuildings = selectedGender ? buildings.filter(b => b.gender === selectedGender) : buildings;
  
  filteredBuildings.forEach(b => {
    const option = document.createElement('option');
    option.value = b.name;
    option.textContent = b.name;
    buildingSelect.appendChild(option);
  });
}

function exportReport() {
  const students = getStudents();
  let csv = 'ID,Name,Department,Gender,Building,Dorm\n';
  students.forEach(s => {
    csv += `${s.id},${s.name},${s.department},${s.gender},${s.building || '-'},${s.dorm || '-'}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'dms_report_' + new Date().toISOString().split('T')[0] + '.csv';
  a.click();
  showToast('Report exported successfully', 'success');
}

function saveSettings() {
  showToast('Settings saved successfully', 'success');
}

// Search functionality
document.getElementById('studentSearch')?.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const rows = document.querySelectorAll('#admin-student-list tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? '' : 'none';
  });
});

// Initialize
document.getElementById('lastUpdated').value = new Date().toLocaleString();
populateDepartmentSelects();
renderAdminTable();
renderDepartmentsList();
renderAdminReports();
renderBuildingsList();
updateDashboardOverview();

// Auto-refresh reports every 2 seconds
setInterval(() => {
  renderAdminReports();
  updateStats();
  updateDashboardOverview();
}, 2000);

function refreshReports() {
  renderAdminReports();
  showToast('Reports refreshed', 'info');
}

function renderBuildingsList() {
  const buildings = getBuildings();
  const tbody = document.getElementById('buildings-list');
  tbody.innerHTML = '';

  if (buildings.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px; color: var(--text-muted);"><i class="fa-solid fa-inbox" style="font-size: 32px; margin-bottom: 10px; display: block; opacity: 0.5;"></i>No buildings added yet</td></tr>';
    return;
  }

  buildings.forEach((b, idx) => {
    const students = getStudents();
    let occupied = 0;
    
    // Count occupied dorms in this building
    for (let dorm = 1; dorm <= b.totalDorms; dorm++) {
      const dormStr = String(dorm);
      const count = students.filter(s => s.building === b.name && s.dorm === dormStr).length;
      occupied += Math.ceil(count / b.capacity);
    }

    const available = b.totalDorms - occupied;
    const statusColor = available > 0 ? 'green' : 'orange';

    tbody.innerHTML += `
      <tr>
        <td><strong>${b.name}</strong></td>
        <td>${b.totalDorms}</td>
        <td>${b.capacity} Person(s)</td>
        <td><span class="badge badge-cyan">${b.gender}</span></td>
        <td>${occupied}</td>
        <td><span class="badge badge-${statusColor}">${available}</span></td>
        <td>
          <button class="btn btn-ghost btn-sm" onclick="editBuilding(${idx})" title="Edit">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteBuilding(${idx})" title="Delete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
}

function handleAddBuilding(e) {
  e.preventDefault();
  const name = document.getElementById('building-name').value;
  const totalDorms = parseInt(document.getElementById('total-dorms').value);
  const startRoom = parseInt(document.getElementById('start-room').value);
  const capacity = parseInt(document.getElementById('dorm-capacity').value);
  const gender = document.getElementById('building-gender').value;

  const buildings = getBuildings();
  
  // Check if building already exists
  if (buildings.find(b => b.name === name)) {
    showToast('This building already exists', 'error');
    return;
  }

  buildings.push({
    id: 'BLD-' + Date.now(),
    name,
    totalDorms,
    startRoom,
    capacity,
    gender,
    createdAt: new Date().toLocaleString()
  });

  saveBuildings(buildings);
  showToast('Building added successfully', 'success');
  document.getElementById('buildingForm').reset();
  document.getElementById('start-room').value = '1'; // Reset to default
  renderBuildingsList();
  populateBuildingSelect();
  updateDashboardOverview();
}

function deleteBuilding(idx) {
  if (confirm('Are you sure you want to delete this building? All dorms will be removed.')) {
    const buildings = getBuildings();
    const building = buildings[idx];
    
    // Check if any dorms are occupied
    const students = getStudents();
    const occupied = students.filter(s => s.building === building.name).length;
    
    if (occupied > 0) {
      showToast('Cannot delete building with occupied dorms. Reassign students first.', 'error');
      return;
    }

    buildings.splice(idx, 1);
    saveBuildings(buildings);
    showToast('Building deleted successfully', 'success');
    renderBuildingsList();
    populateBuildingSelect();
    updateDashboardOverview();
  }
}

function editBuilding(idx) {
  const buildings = getBuildings();
  const b = buildings[idx];

  document.getElementById('editBuildingIndex').value = idx;
  document.getElementById('edit-building-name').value = b.name;
  document.getElementById('edit-total-dorms').value = b.totalDorms;
  document.getElementById('edit-dorm-capacity').value = b.capacity;
  document.getElementById('edit-building-gender').value = b.gender;

  document.getElementById('editBuildingModalOverlay').classList.add('active');
}

function handleEditBuilding(e) {
  e.preventDefault();
  const idx = document.getElementById('editBuildingIndex').value;
  const name = document.getElementById('edit-building-name').value;
  const totalDorms = parseInt(document.getElementById('edit-total-dorms').value);
  const capacity = parseInt(document.getElementById('edit-dorm-capacity').value);
  const gender = document.getElementById('edit-building-gender').value;

  const buildings = getBuildings();
  const building = buildings[idx];

  // Check if name changed and already exists
  if (name !== building.name && buildings.find(b => b.name === name)) {
    showToast('Building name already exists', 'error');
    return;
  }

  // If reducing total dorms, check if occupied dorms exceed new total
  if (totalDorms < building.totalDorms) {
    const students = getStudents();
    const maxOccupiedDorm = Math.max(...students.filter(s => s.building === building.name).map(s => s.dorm || 0));
    
    if (maxOccupiedDorm > totalDorms) {
      showToast(`Cannot reduce dorms below ${maxOccupiedDorm}. Students are assigned to higher dorm numbers.`, 'error');
      return;
    }
  }

  // Update building
  building.name = name;
  building.totalDorms = totalDorms;
  building.capacity = capacity;
  building.gender = gender;

  saveBuildings(buildings);
  showToast('Building updated successfully', 'success');
  renderBuildingsList();
  populateBuildingSelect();
  updateDashboardOverview();
  closeModal('editBuildingModalOverlay');
}

function renderAdminReports() {
  const reports = getReports();
  const tbody = document.getElementById('admin-reports-list');
  tbody.innerHTML = '';

  if (reports.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px; color: var(--text-muted);"><i class="fa-solid fa-inbox" style="font-size: 32px; margin-bottom: 10px; display: block; opacity: 0.5;"></i>No reports submitted</td></tr>';
    return;
  }

  reports.forEach((r, idx) => {
    const statusColor = r.status === 'Pending' ? 'orange' : r.status === 'In Review' ? 'cyan' : r.status === 'Resolved' ? 'green' : 'purple';
    tbody.innerHTML += `
      <tr>
        <td>${r.id}</td>
        <td>${r.studentName}</td>
        <td><span class="badge badge-cyan">${r.type}</span></td>
        <td>${r.subject}</td>
        <td><span class="badge badge-${statusColor}">${r.status}</span></td>
        <td style="font-size: 12px;">${r.date}</td>
        <td>
          <button class="btn btn-ghost btn-sm" onclick="openReportReview(${idx})" title="Review">
            <i class="fa-solid fa-eye"></i>
          </button>
        </td>
      </tr>
    `;
  });

  updateStats();
}

function openReportReview(idx) {
  const reports = getReports();
  const r = reports[idx];

  document.getElementById('reviewReportId').value = idx;
  document.getElementById('reviewStudentName').value = r.studentName;
  document.getElementById('reviewReportType').value = r.type;
  document.getElementById('reviewReportSubject').value = r.subject;
  document.getElementById('reviewReportDesc').value = r.description;
  document.getElementById('reviewReportStatus').value = r.status;
  document.getElementById('reviewReportComment').value = r.adminComment || '';

  document.getElementById('reportModalOverlay').classList.add('active');
}

function handleReportReview(e) {
  e.preventDefault();
  const idx = document.getElementById('reviewReportId').value;
  const status = document.getElementById('reviewReportStatus').value;
  const comment = document.getElementById('reviewReportComment').value;

  const reports = getReports();
  reports[idx].status = status;
  reports[idx].adminComment = comment;

  saveReports(reports);
  showToast('Report updated successfully', 'success');
  renderAdminReports();
  closeModal('reportModalOverlay');
}
