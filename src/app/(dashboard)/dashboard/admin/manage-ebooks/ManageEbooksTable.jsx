"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TextField,
  InputGroup,
  CloseButton,
  Button,
  Chip,
  Tooltip,
} from "@heroui/react";
import {
  FiSearch,
  FiTrash2,
  FiCheckCircle,
  FiEyeOff,
  FiBook,
} from "react-icons/fi";
import { adminEbookUpdate } from "@/lib/api/admin/action";
import toast from "react-hot-toast"; // ADDED
import AdminBookDeleteModal from "./AdminBookDeleteModal";

export default function ManageEbooksTable({ initialBooks = [] }) {
  const router = useRouter();
  const [books, setBooks] = useState(initialBooks);
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null); // 

  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) =>
        book.title?.toLowerCase().includes(search.toLowerCase()) ||
        book.writerName?.toLowerCase().includes(search.toLowerCase()) ||
        book.writerEmail?.toLowerCase().includes(search.toLowerCase())
    );
  }, [books, search]);

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "published" ? "unpublished" : "published";
    setLoadingId(id);

    try {
      const result = await adminEbookUpdate({ status: newStatus }, id);
console.log("adminEbookUpdate result:", result);
      if (result?.acknowledged || result?.modifiedCount || result?.matchedCount) {
        setBooks((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
        );
        router.refresh();
        toast.success(`Book ${newStatus} successfully!`); // CHANGED
      } else {
        toast.error("Failed to update status. Please try again."); // CHANGED
      }
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Network error while updating status."); // CHANGED
    } finally {
      setLoadingId(null);
    }
  };

 

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <TextField
          aria-label="Search ebooks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-xs"
        >
          <InputGroup className="bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 rounded-xl">
            <InputGroup.Prefix>
              <FiSearch className="text-zinc-500" size={16} />
            </InputGroup.Prefix>
            <InputGroup.Input placeholder="Search by title, writer, or email..." />
            {search && (
              <InputGroup.Suffix>
                <CloseButton
                  aria-label="Clear search"
                  size="sm"
                  onPress={() => setSearch("")}
                />
              </InputGroup.Suffix>
            )}
          </InputGroup>
        </TextField>
        <span className="text-xs text-zinc-500 shrink-0">
          Showing {filteredBooks.length} of {books.length} books
        </span>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-zinc-800/60 overflow-hidden">
        <Table variant="secondary">
          <Table.ScrollContainer>
            <Table.Content aria-label="Manage All Ebooks">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3 bg-zinc-900/60"
                >
                  Book
                </Table.Column>
                <Table.Column className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3 bg-zinc-900/60">
                  Writer
                </Table.Column>
                <Table.Column className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3 bg-zinc-900/60">
                  Price
                </Table.Column>
                <Table.Column className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3 bg-zinc-900/60">
                  Status
                </Table.Column>
                <Table.Column className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3 bg-zinc-900/60">
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body
                items={filteredBooks}
                renderEmptyState={() => (
                  <div className="flex flex-col items-center justify-center py-16 text-zinc-500 gap-3">
                    <FiBook size={32} className="text-zinc-700" />
                    <p className="text-sm">No e-books found.</p>
                  </div>
                )}
              >
                {(book) => {
                  const isPublished = book.status === "published";
                  const isBusy = loadingId === book._id;

                  return (
                    <Table.Row
                      key={book._id}
                      className="border-b border-zinc-800/50 hover:bg-zinc-900/40 transition-colors"
                    >
                      <Table.Cell className="px-4 py-3">
                        <div>
                          <p className="font-medium text-white line-clamp-1">{book.title}</p>
                          <p className="text-xs text-zinc-500 capitalize">{book.genre || "General"}</p>
                        </div>
                      </Table.Cell>

                      <Table.Cell className="px-4 py-3">
                        <p className="text-zinc-200 font-medium">{book.writerName || "Anonymous"}</p>
                        <p className="text-xs text-zinc-500">{book.writerEmail || "No email"}</p>
                      </Table.Cell>

                      <Table.Cell className="px-4 py-3">
                        <span className="font-semibold text-white">
                          ${Number(book.price || 0).toFixed(2)}
                        </span>
                      </Table.Cell>

                      <Table.Cell className="px-4 py-3">
                        <Chip
                          size="sm"
                          variant="flat"
                          color={isPublished ? "success" : "warning"}
                        >
                          <span className="flex items-center gap-1.5">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isPublished ? "bg-emerald-400" : "bg-amber-400"
                              }`}
                            />
                            {isPublished ? "Published" : "Unpublished"}
                          </span>
                        </Chip>
                      </Table.Cell>

                      <Table.Cell className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <Tooltip content={isPublished ? "Unpublish Book" : "Publish Book"}>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="flat"
                              color={isPublished ? "default" : "success"}
                              isLoading={isBusy}
                              onPress={() => handleToggleStatus(book._id, book.status)}
                            >
                              {isPublished ? <FiEyeOff size={15} /> : <FiCheckCircle size={15} />}
                            </Button>
                          </Tooltip>

                          <Tooltip color="danger" content="Delete Book">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="flat"
                              color="danger"
                              onPress={() => setDeleteTarget(book)} // CHANGED — opens modal instead of calling handleDelete directly
                            >
                              <FiTrash2 size={15} />
                            </Button>
                          </Tooltip>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                }}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* ADDED — delete confirmation modal */}
      <AdminBookDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        book={deleteTarget}
        onDeleted={(id) => {
          setBooks((prev) => prev.filter((b) => b._id !== id));
          router.refresh();
        }}
      />
    </div>
  );
}