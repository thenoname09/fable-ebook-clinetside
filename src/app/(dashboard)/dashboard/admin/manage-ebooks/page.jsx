import { GetAllEBooks } from "@/lib/api/book";
import ManageEbooksTable from "./ManageEbooksTable";


const AdminManageAllBooksPage = async () => {
  const ebooks = (await GetAllEBooks()) || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Manage All E-books
          </h1>
          
        </div>
        <div className="text-xs px-3 py-1.5 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 w-fit">
          Total Books: <span className="font-semibold text-white">{ebooks.length}</span>
        </div>
      </div>

      {/* Interactive Table Component */}
      <ManageEbooksTable initialBooks={ebooks} />
    </div>
  );
};

export default AdminManageAllBooksPage;