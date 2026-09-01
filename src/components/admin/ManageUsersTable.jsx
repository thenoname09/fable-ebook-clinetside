"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Table, Button, Tooltip, Select, ListBox } from "@heroui/react";
import { FiTrash2, FiUser, FiChevronDown } from "react-icons/fi";
import { adminUserRoleUpdate, adminUserDelete } from "@/lib/api/admin/action";
import toast from "react-hot-toast";

const ROLES = [
  { id: "reader", label: "Reader" },
  { id: "writer", label: "Writer" },
  { id: "admin", label: "Admin" },
];
export default function ManageUsersTable({ initialUsers = [] }) {
  const router = useRouter();
  const [users, setUsers] = useState(initialUsers);
  const [loadingId, setLoadingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleRoleChange = async (id, newRole) => {
    setLoadingId(id);
    try {
      const result = await adminUserRoleUpdate({ role: newRole }, id);

      if (
        result?.acknowledged ||
        result?.modifiedCount ||
        result?.matchedCount
      ) {
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: newRole } : u)),
        );
        router.refresh();
        toast.success(`Role updated to ${newRole}!`);
      } else {
        toast.error("Failed to update role. Please try again.");
      }
    } catch (err) {
      console.error("Error updating role:", err);
      toast.error("Network error while updating role.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?._id) return;
    setLoadingId(deleteTarget._id);
    try {
      const result = await adminUserDelete(deleteTarget._id);

      if (result?.deletedCount || result?.acknowledged) {
        setUsers((prev) => prev.filter((u) => u._id !== deleteTarget._id));
        router.refresh();
        toast.success("User deleted successfully!");
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Network error while deleting.");
    } finally {
      setLoadingId(null);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="rounded-xl border border-zinc-800/60 overflow-hidden">
        <Table variant="secondary">
          <Table.ScrollContainer>
            <Table.Content aria-label="Manage All Users">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3 bg-zinc-900/60"
                >
                  Name
                </Table.Column>
                <Table.Column className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3 bg-zinc-900/60">
                  Email
                </Table.Column>
                <Table.Column className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3 bg-zinc-900/60">
                  Role
                </Table.Column>
                <Table.Column className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3 bg-zinc-900/60">
                  Actions
                </Table.Column>
              </Table.Header>

              {/* CHANGED: items={users} instead of filteredUsers */}
              <Table.Body
                items={users}
                renderEmptyState={() => (
                  <div className="flex flex-col items-center justify-center py-16 text-zinc-500 gap-3">
                    <FiUser size={32} className="text-zinc-700" />
                    <p className="text-sm">No users found.</p>
                  </div>
                )}
              >
                {(user) => {
                  const isBusy = loadingId === user._id;

                  return (
                    <Table.Row
                      key={user._id}
                      className="border-b border-zinc-800/50 hover:bg-zinc-900/40 transition-colors"
                    >
                      <Table.Cell className="px-4 py-3">
                        <p className="font-medium text-white">
                          {user.name || "Unnamed"}
                        </p>
                      </Table.Cell>

                      <Table.Cell className="px-4 py-3">
                        <p className="text-zinc-400">{user.email}</p>
                      </Table.Cell>

                      <Table.Cell className="px-4 py-3">
                        <Select
                          selectedKey={user.role}
                          onChange={(key) =>
                            handleRoleChange(user._id, String(key))
                          }
                          isDisabled={isBusy}
                        >
                          <Select.Trigger className="min-w-[110px] flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-white capitalize">
                            <Select.Value />
                            <Select.Indicator>
                              <FiChevronDown
                                size={13}
                                className="text-zinc-500"
                              />
                            </Select.Indicator>
                          </Select.Trigger>
                          <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                            <ListBox className="outline-none">
                              {ROLES.map(({ id, label }) => (
                                <ListBox.Item
                                  key={id}
                                  id={id}
                                  textValue={label}
                                  className="px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800 cursor-pointer capitalize"
                                >
                                  {label}
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                              ))}
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      </Table.Cell>

                      <Table.Cell className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <Tooltip color="danger" content="Delete User">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="flat"
                              color="danger"
                              onPress={() => setDeleteTarget(user)}
                              className="hover:bg-red-500/20 hover:text-red-400 transition-colors" // ADDED
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

      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-white font-semibold text-sm">
              Delete this user?
            </h3>
            <p className="text-sm text-zinc-400">
              "{deleteTarget.name || deleteTarget.email}" will be permanently
              removed. This does not delete their books or purchase history.
            </p>
            <div className="flex gap-2 pt-1">
              {/* Cancel Button */}
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2 rounded-xl border border-zinc-700 text-zinc-300 text-sm font-medium cursor-pointer hover:bg-zinc-800 hover:text-white hover:border-zinc-600 active:scale-[0.98] transition-all"
              >
                Cancel
              </button>

              {/* Delete Confirm Button */}
              <button
                type="button"
                onClick={handleDelete}
                disabled={loadingId === deleteTarget._id}
                className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold cursor-pointer hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-600 disabled:active:scale-100"
              >
                {loadingId === deleteTarget._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
