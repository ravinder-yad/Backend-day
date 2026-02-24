import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_BASE_URL = "http://localhost:5001/api";

const initialCreateForm = {
  Name: "",
  Email: "",
  Phone: "",
  Department: "",
  Role: "",
  JoiningDate: "",
};

const initialUpdateForm = {
  Department: "",
  Role: "",
  Phone: "",
};

function formatDate(dateValue) {
  if (!dateValue) return "-";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toISOString().slice(0, 10);
}

function App() {
  const [createForm, setCreateForm] = useState(initialCreateForm);
  const [employees, setEmployees] = useState([]);
  const [singleId, setSingleId] = useState("");
  const [singleEmployee, setSingleEmployee] = useState(null);
  const [updateId, setUpdateId] = useState("");
  const [updateForm, setUpdateForm] = useState(initialUpdateForm);
  const [deleteId, setDeleteId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const hasEmployees = useMemo(() => employees.length > 0, [employees]);

  const clearAlerts = () => {
    setMessage("");
    setError("");
  };

  const handleError = (err) => {
    setError(err.message || "Request failed");
  };

  const parseResponse = async (response) => {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }
    return data;
  };

  const callApi = async (path, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${path}`, options);
    return parseResponse(response);
  };

  const getAllEmployees = async (showSuccess = true) => {
    setLoading(true);
    if (showSuccess) clearAlerts();

    try {
      const data = await callApi("/get-all-employees", { method: "GET" });
      setEmployees(Array.isArray(data) ? data : []);
      if (showSuccess) setMessage("Fetched all employees");
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllEmployees(false);
  }, []);

  const addEmployee = async (event) => {
    event.preventDefault();
    clearAlerts();
    setLoading(true);

    try {
      const data = await callApi("/add-employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createForm),
      });

      setMessage(data.message || "Employee added");
      setCreateForm(initialCreateForm);
      await getAllEmployees(false);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const getSingleEmployee = async (idFromArg) => {
    const targetId = (idFromArg || singleId).trim();

    if (!targetId) {
      setError("Enter employee id for single fetch");
      return;
    }

    clearAlerts();
    setLoading(true);

    try {
      const data = await callApi(`/get-single-employee/${targetId}`, { method: "GET" });
      setSingleEmployee(data);
      setSingleId(targetId);
      setMessage("Fetched single employee");
    } catch (err) {
      setSingleEmployee(null);
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async () => {
    if (!updateId.trim()) {
      setError("Enter update id");
      return;
    }

    const payload = Object.fromEntries(
      Object.entries(updateForm).filter(([, value]) => String(value).trim())
    );

    if (Object.keys(payload).length === 0) {
      setError("Enter at least one field to update");
      return;
    }

    clearAlerts();
    setLoading(true);

    try {
      const data = await callApi(`/update-employee/${updateId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setMessage(data.message || "Employee updated");
      setUpdateForm(initialUpdateForm);
      await getAllEmployees(false);
      if (singleEmployee?._id === updateId) {
        setSingleEmployee(data.employee);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async () => {
    if (!deleteId.trim()) {
      setError("Enter employee id to delete");
      return;
    }

    clearAlerts();
    setLoading(true);

    try {
      const data = await callApi(`/delete-employee/${deleteId}`, {
        method: "DELETE",
      });

      setMessage(data.message || "Employee deleted");
      setEmployees((prev) => prev.filter((item) => item._id !== deleteId));
      setSearchResults((prev) => prev.filter((item) => item._id !== deleteId));
      if (singleEmployee?._id === deleteId) {
        setSingleEmployee(null);
      }
      setDeleteId("");
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const searchEmployee = async () => {
    if (!searchName.trim()) {
      setError("Enter name for search");
      return;
    }

    clearAlerts();
    setLoading(true);

    try {
      const data = await callApi(`/search-employee?Name=${encodeURIComponent(searchName)}`, {
        method: "GET",
      });

      setSearchResults(Array.isArray(data) ? data : []);
      setMessage("Search complete");
    } catch (err) {
      setSearchResults([]);
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const applyQuickActions = (employee) => {
    setSingleId(employee._id);
    setUpdateId(employee._id);
    setDeleteId(employee._id);
    setUpdateForm({
      Department: employee.Department || "",
      Role: employee.Role || "",
      Phone: employee.Phone || "",
    });
  };

  const loadEmployeeForUpdate = async () => {
    const targetId = updateId.trim();
    if (!targetId) {
      setError("Enter update id");
      return;
    }

    clearAlerts();
    setLoading(true);
    try {
      const employee = await callApi(`/get-single-employee/${targetId}`, { method: "GET" });
      setUpdateForm({
        Department: employee.Department || "",
        Role: employee.Role || "",
        Phone: employee.Phone || "",
      });
      setMessage("Employee data loaded for update");
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <header className="hero">
        <h1>Employee Management</h1>
        {/* <p>Backend API: http://localhost:5001/api</p> */}
      </header>

      {message && <p className="alert success">{message}</p>}
      {error && <p className="alert error">{error}</p>}

      <main className="dashboard">
      <section className="card add-card">
        <h2>Add Employee (POST)</h2>
        <form className="grid" onSubmit={addEmployee}>
          <input
            name="Name"
            placeholder="Name"
            value={createForm.Name}
            onChange={(e) => setCreateForm((p) => ({ ...p, Name: e.target.value }))}
          />
          <input
            name="Email"
            placeholder="Email"
            value={createForm.Email}
            onChange={(e) => setCreateForm((p) => ({ ...p, Email: e.target.value }))}
          />
          <input
            name="Phone"
            placeholder="Phone"
            value={createForm.Phone}
            onChange={(e) => setCreateForm((p) => ({ ...p, Phone: e.target.value }))}
          />
          <input
            name="Department"
            placeholder="Department"
            value={createForm.Department}
            onChange={(e) => setCreateForm((p) => ({ ...p, Department: e.target.value }))}
          />
          <input
            name="Role"
            placeholder="Role"
            value={createForm.Role}
            onChange={(e) => setCreateForm((p) => ({ ...p, Role: e.target.value }))}
          />
          <input
            name="JoiningDate"
            type="date"
            value={createForm.JoiningDate}
            onChange={(e) => setCreateForm((p) => ({ ...p, JoiningDate: e.target.value }))}
          />
          <button type="submit" disabled={loading}>Add Employee</button>
        </form>
      </section>

      <section className="card list-card">
        <div className="section-head">
          <h2>All Employees (GET)</h2>
          <button onClick={() => getAllEmployees(true)} disabled={loading}>Refresh</button>
        </div>

        {!hasEmployees && <p className="empty">No employees found.</p>}

        {hasEmployees && (
          <div className="list">
            {employees.map((employee) => (
              <article key={employee._id} className="item">
                <p><strong>ID:</strong> {employee._id}</p>
                <p><strong>Name:</strong> {employee.Name}</p>
                <p><strong>Email:</strong> {employee.Email}</p>
                <p><strong>Phone:</strong> {employee.Phone}</p>
                <p><strong>Department:</strong> {employee.Department}</p>
                <p><strong>Role:</strong> {employee.Role}</p>
                <p><strong>Joining Date:</strong> {formatDate(employee.JoiningDate)}</p>
                <div className="actions">
                  <button onClick={() => applyQuickActions(employee)} disabled={loading}>Use This ID</button>
                  <button onClick={() => getSingleEmployee(employee._id)} disabled={loading}>View</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="card single-card">
        <h2>Get Single Employee (GET)</h2>
        <div className="row">
          <input
            placeholder="Employee ID"
            value={singleId}
            onChange={(e) => setSingleId(e.target.value)}
          />
          <button onClick={getSingleEmployee} disabled={loading}>Get Single</button>
        </div>
        {singleEmployee && (
          <div className="item single-box">
            <p><strong>ID:</strong> {singleEmployee._id}</p>
            <p><strong>Name:</strong> {singleEmployee.Name}</p>
            <p><strong>Email:</strong> {singleEmployee.Email}</p>
            <p><strong>Phone:</strong> {singleEmployee.Phone}</p>
            <p><strong>Department:</strong> {singleEmployee.Department}</p>
            <p><strong>Role:</strong> {singleEmployee.Role}</p>
          </div>
        )}
      </section>

      <section className="card update-card">
        <h2>Update Employee (PUT)</h2>
        <div className="row">
          <input
            placeholder="Employee ID"
            value={updateId}
            onChange={(e) => setUpdateId(e.target.value)}
          />
          <input
            placeholder="Department"
            value={updateForm.Department}
            onChange={(e) => setUpdateForm((p) => ({ ...p, Department: e.target.value }))}
          />
          <input
            placeholder="Role"
            value={updateForm.Role}
            onChange={(e) => setUpdateForm((p) => ({ ...p, Role: e.target.value }))}
          />
          <input
            placeholder="Phone"
            value={updateForm.Phone}
            onChange={(e) => setUpdateForm((p) => ({ ...p, Phone: e.target.value }))}
          />
          <button onClick={loadEmployeeForUpdate} disabled={loading}>Load Current Data</button>
          <button onClick={updateEmployee} disabled={loading}>Update</button>
        </div>
      </section>

      <section className="card delete-card">
        <h2>Delete Employee (DELETE)</h2>
        <div className="row">
          <input
            placeholder="Employee ID"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
          />
          <button className="danger" onClick={deleteEmployee} disabled={loading}>Delete</button>
        </div>
      </section>

      <section className="card search-card">
        <h2>Search Employee By Name (GET)</h2>
        <div className="row">
          <input
            placeholder="Name (e.g. rahul)"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button onClick={searchEmployee} disabled={loading}>Search</button>
        </div>

        {searchName && searchResults.length === 0 && !loading && (
          <p className="empty">No matching employee found.</p>
        )}

        {searchResults.length > 0 && (
          <div className="list">
            {searchResults.map((employee) => (
              <article key={employee._id} className="item">
                <p><strong>ID:</strong> {employee._id}</p>
                <p><strong>Name:</strong> {employee.Name}</p>
                <p><strong>Email:</strong> {employee.Email}</p>
                <p><strong>Department:</strong> {employee.Department}</p>
              </article>
            ))}
          </div>
        )}
      </section>
      </main>
    </div>
  );
}

export default App;
