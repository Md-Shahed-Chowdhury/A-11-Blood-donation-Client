import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

const AllUsers = () => {
  const axiosInstance = useAxios();

  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const fetchUsers = async () => {
    const res = await axiosInstance.get(
      `/all-users?page=${page}&limit=${limit}&status=${statusFilter}`
    );
    setUsers(res.data.users);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, statusFilter]);

  const updateStatus = async (email, status) => {
    await axiosInstance.patch(`/update-user-status/${email}`, { status });
    fetchUsers();
  };

  const updateRole = async (email, role) => {
    await axiosInstance.patch(`/update-user-role/${email}`, { role });
    fetchUsers();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      {/* Filter */}
      <div className="mb-4">
        <select
          className="select select-bordered"
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.email}>
                <td>
                  <img
                    src={u.photoUrl}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{u.email}</td>
                <td>{u.name}</td>
                <td className="capitalize">{u.role}</td>
                <td className="capitalize">{u.status}</td>

                <td className="flex gap-2 flex-wrap">
                  {u.status === "active" ? (
                    <button
                      onClick={() => updateStatus(u.email, "blocked")}
                      className="btn btn-xs btn-error"
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      onClick={() => updateStatus(u.email, "active")}
                      className="btn btn-xs btn-success"
                    >
                      Unblock
                    </button>
                  )}

                  {u.role !== "volunteer" && u.role!="admin" && (
                    <button
                      onClick={() => updateRole(u.email, "volunteer")}
                      className="btn btn-xs btn-warning"
                    >
                      Make Volunteer
                    </button>
                  )}

                  {u.role !== "admin" && (
                    <button
                      onClick={() => updateRole(u.email, "admin")}
                      className="btn btn-xs btn-info"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>

        <button
          className="btn btn-sm"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
