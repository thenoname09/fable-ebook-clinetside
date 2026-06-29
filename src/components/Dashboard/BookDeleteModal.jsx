"use client";

import { useState } from "react";
import { Button, Modal,  Spinner } from "@heroui/react";
import { FiAlertTriangle, FiTrash2, FiX } from "react-icons/fi";
import { EbookDelete } from "@/lib/writer/action";

export default function BookDeleteModal({ isOpen, onClose, book, onDeleted }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!book?._id) return;

    setIsDeleting(true);

    const res = await EbookDelete(book._id);

    if (res?.deletedCount > 0 || res?.acknowledged) {
      onDeleted(book._id);
      onClose();
    } else {
      alert("Failed to delete ebook. Please try again.");
    }

    setIsDeleting(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Modal.Backdrop
        
        className=""
        variant="blur"
      >
        <Modal.Container className="">
          <Modal.Dialog className="bg-[#0f0f0f] border border-zinc-800 max-w-sm w-full rounded-2xl overflow-hidden">
            
            {/* Header */}
            <Modal.Header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
              <Modal.Heading className="text-base font-semibold text-white flex items-center gap-2">
                <FiAlertTriangle size={15} className="text-red-400" /> Delete Ebook
              </Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>

            {/* Body */}
            <div className="px-6 py-5 max-h-[75vh] overflow-y-auto">
              <div className="flex flex-col items-center text-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <FiAlertTriangle size={24} className="text-red-400" />
                </div>

                <div className="space-y-1.5">
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Are you sure you want to delete{" "}
                    <span className="text-zinc-300 font-medium">
                      "{book?.title || "this ebook"}"
                    </span>
                    ? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 pt-4 border-t border-zinc-800">
              <Button variant="outline"
                type="button"
                onClick={onClose}
                disabled={isDeleting}
                className="px-5 h-10 rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-900 text-sm font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-5 h-10 rounded-lg text-sm font-semibold hover:cursor-pointer text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <Spinner size="sm" />
                ) : (
                  <FiTrash2 size={14} />
                )}
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}