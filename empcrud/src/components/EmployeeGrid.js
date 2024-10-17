import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './EmployeeGrid.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const EmployeeGrid = ({ employees, setEmployees }) => {
  const [rowData, setRowData] = useState([]);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    setRowData(employees);
  }, [employees]);

  const [columnDefs] = useState([
    { headerName: "Employee ID", field: "employeeId", editable: false, sortable: true, filter: true },
    { headerName: "Name", field: "name", editable: true, sortable: true, filter: true },
    { headerName: "Email", field: "email", editable: true, sortable: true, filter: true },
    { headerName: "Position", field: "position", editable: true, sortable: true, filter: true },
    { headerName: "Location", field: "location", editable: true, sortable: true, filter: true },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <div>
          <button className="delete-btn" onClick={() => confirmDelete(params.data)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    }
  ]);

  const onCellValueChanged = (params) => {
    const updatedEmployees = rowData.map((emp) =>
      emp.employeeId === params.data.employeeId ? { ...emp, [params.colDef.field]: params.newValue } : emp
    );
    setEmployees(updatedEmployees);
    setRowData(updatedEmployees);
  };

  const confirmDelete = (employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    const updatedEmployees = employees.filter((emp) => emp.employeeId !== employeeToDelete.employeeId);
    setEmployees(updatedEmployees);
    setRowData(updatedEmployees);
    setIsDeleteConfirmOpen(false);
  };

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
  };

  return (
    <div className="employee-grid-container">
      <div className="ag-theme-alpine grid-with-spacing">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout='autoHeight'
          onCellValueChanged={onCellValueChanged} // Keep this to handle value changes
        />
      </div>

      {isDeleteConfirmOpen && (
        <div className="delete-confirm-modal">
          <div className="delete-confirm">
            <p>Are you sure you want to delete Employee ID: {employeeToDelete.employeeId}?</p>
            <div className="form-buttons">
              <button className="delete-btn" onClick={handleDelete}>Yes</button>
              <button className="cancel-btn" onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeGrid;
