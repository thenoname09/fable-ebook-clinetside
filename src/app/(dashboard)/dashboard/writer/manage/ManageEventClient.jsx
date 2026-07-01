"use client";

import { useState } from "react";
import { Table, Spinner } from "@heroui/react";
import {
  FiEdit2,
  FiTrash2,
  FiPlusCircle,
  FiBookOpen,
  FiSearch,
  FiEyeOff,
  FiEye,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import EditModal from "@/components/Dashboard/EditModal";
import BookDeleteModal from "../../../../../components/Dashboard/BookDeleteModal";
import { EbookUpdate } from "@/lib/writer/action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const STATUS_STYLES = {
  published: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  unpublished: "bg-zinc-800 text-zinc-400 border border-zinc-700",
};

const GENRE_STYLES = {
  "science-fiction":
    "bg-sky-500/10    text-sky-400    border border-sky-500/20",
  fantasy: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  mystery: "bg-amber-500/10  text-amber-400  border border-amber-500/20",
  romance: "bg-pink-500/10   text-pink-400   border border-pink-500/20",
  horror: "bg-red-500/10    text-red-400    border border-red-500/20",
  thriller: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  biography: "bg-blue-500/10   text-blue-400   border border-blue-500/20",
  "self-help": "bg-teal-500/10   text-teal-400   border border-teal-500/20",
  technology: "bg-cyan-500/10   text-cyan-400   border border-cyan-500/20",
};

export default function ManageEbookClient({ events: initialEvents = [] }) {
  const [ebooks, setEbooks] = useState(initialEvents);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);

  // edit modal state
  const router = useRouter();
  const [editState, setEditState] = useState({ open: false, book: null });
  const openEdit = (book) => {
    setEditState({ open: true, book });
  };

  const closeEdit = () => {
    setEditState({ open: false, book: null });
  };
  // called from EditEbookModal after save
  const handleSave = (updated) => {
    setEbooks((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
  };

  const [deleteState, setDeleteState] = useState({ open: false, book: null });

  const openDelete = (book) => setDeleteState({ open: true, book });
  const closeDelete = () => setDeleteState({ open: false, book: null });

  const handleDeleted = (id) => {
    setEbooks((prev) => prev.filter((b) => b._id !== id));
  };

  const handleToggleStatus = async (bookId, currentStatus) => {
    const newStatus =
      currentStatus === "published" ? "unpublished" : "published";

    setEbooks((prev) =>
      prev.map((b) => (b._id === bookId ? { ...b, status: newStatus } : b)),
    );
    const res = await EbookUpdate({ status: newStatus }, bookId);

    if (res?.modifiedCount) {
      toast.success(`Your Book ${newStatus} successfully!`);
    } else {
      toast.error();
      ("Failed to update status");
    }
  };

  const filtered = ebooks.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2.5">
            <FiBookOpen className="text-purple-400" size={20} /> Manage Ebooks
          </h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            {ebooks.length} ebook{ebooks.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link href="/dashboard/writer/add-ebook">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#c084fc] to-[#818cf8] hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20">
            <FiPlusCircle size={15} /> Add New Ebook
          </button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <FiSearch
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search ebooks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-zinc-900/50 border border-zinc-800 text-white text-sm rounded-xl pl-9 pr-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-zinc-800/60 overflow-hidden">
        <Table variant="secondary">
          <Table.ScrollContainer>
            <Table.Content aria-label="Manage Ebooks">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3 bg-zinc-900/60"
                >
                  Cover & Title
                </Table.Column>
                <Table.Column className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3 bg-zinc-900/60">
                  Genre
                </Table.Column>
                <Table.Column className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3 bg-zinc-900/60">
                  Price
                </Table.Column>
                <Table.Column className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3 bg-zinc-900/60">
                  Status
                </Table.Column>
                <Table.Column className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3 bg-zinc-900/60">
                  Date
                </Table.Column>
                <Table.Column className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3 bg-zinc-900/60">
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body
                renderEmptyState={() => (
                  <div className="flex flex-col items-center justify-center py-16 text-zinc-500 gap-3">
                    <FiBookOpen size={32} className="text-zinc-700" />
                    <p className="text-sm">
                      {search
                        ? `No ebooks found for "${search}"`
                        : "You have not added any book yet"}
                    </p>
                    {!search && (
                      <Link href="/dashboard/writer/add-ebook">
                        <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                          + Add your first ebook
                        </button>
                      </Link>
                    )}
                  </div>
                )}
              >
                {filtered.map((book) => (
                  <Table.Row
                    key={book._id}
                    className="border-b border-zinc-800/50 hover:bg-zinc-900/40 transition-colors"
                  >
                    <Table.Cell className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-10 rounded-md bg-gradient-to-br from-purple-500/20 to-indigo-500/10 border border-zinc-800 shrink-0 overflow-hidden">
                          {book.coverImage ? (
                            <Image
                              src={book.coverImage}
                              width={32}
                              height={40}
                              alt={book.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-end justify-end p-1">
                              <FiBookOpen
                                size={9}
                                className="text-purple-400"
                              />
                            </div>
                          )}
                        </div>
                        <span className="text-sm font-medium text-white truncate max-w-[160px]">
                          {book.title}
                        </span>
                      </div>
                    </Table.Cell>

                    <Table.Cell className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${GENRE_STYLES[book.genre] ?? "bg-zinc-800 text-zinc-400"}`}
                      >
                        {book.genre}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="px-4 py-3">
                      <span className="text-sm font-semibold text-white">
                        ${Number(book.price).toFixed(2)}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[book.status]}`}
                      >
                        {book.status}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="px-4 py-3">
                      <span className="text-xs text-zinc-500">
                        {book.createdAt}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          title="Edit"
                          onClick={() => openEdit(book)}
                          className=" hover:cursor-pointer p-1.5 rounded-lg text-zinc-500 hover:text-purple-400 hover:bg-purple-500/10 transition-colors"
                        >
                          <FiEdit2 size={14} />
                        </button>
                        <button
                          title={
                            book.status === "published"
                              ? "Unpublish"
                              : "Publish"
                          }
                          onClick={() =>
                            handleToggleStatus(book._id, book.status)
                          }
                          className={`p-1.5 rounded-lg transition-colors ${
                            book.status === "published"
                              ? "text-zinc-500 hover:text-amber-400 hover:bg-amber-500/10"
                              : "text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/10"
                          }`}
                        >
                          {book.status === "published" ? (
                            <FiEyeOff size={14} />
                          ) : (
                            <FiEye size={14} />
                          )}
                        </button>
                        <button
                          title="Delete"
                          onClick={() => openDelete(book)}
                          className="hover:cursor-pointer p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* Edit Modal — Renders cleanly with fresh lifecycle hooks */}
      <EditModal
        key={editState.book?._id}
        isOpen={editState.open}
        onClose={closeEdit}
        book={editState.book}
        onSave={handleSave}
      />
      <BookDeleteModal
        isOpen={deleteState.open}
        onClose={closeDelete}
        book={deleteState.book}
        onDeleted={handleDeleted}
      />
    </div>
  );
}
