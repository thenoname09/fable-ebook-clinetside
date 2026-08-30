import ManageUsersTable from "@/components/admin/ManageUsersTable";
import { GetAllUsers } from "@/lib/api/admin/data";


const ManageUsersPage = async () => {
  const rawResult = await GetAllUsers();
const users = rawResult || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Manage Users
          </h1>
        </div>
        <div className="text-xs px-3 py-1.5 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 w-fit">
          Total Users: <span className="font-semibold text-white">{users.length}</span>
        </div>
      </div>

      <ManageUsersTable initialUsers={users} />
    </div>
  );
};

export default ManageUsersPage;