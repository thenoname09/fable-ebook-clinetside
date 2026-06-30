"use client";

import { useState } from "react";
import {
  Modal,
  Form,
  Fieldset,
  TextField,
  TextArea,
  Label,
  Input,
  FieldError,
  Select,
  ListBox,
  Spinner,
  Button,
} from "@heroui/react";
import {
  FiEdit2,
  FiChevronDown,
  FiUploadCloud,
  FiCheck,
  FiAlertTriangle,
  FiLock,
  FiBookmark,
} from "react-icons/fi";
import Image from "next/image";
import { EbookUpdate } from "@/lib/writer/action";
import toast from "react-hot-toast";

// ── style constants ───────────────────────────────────────────────────────────
const inputCls =
  "w-full bg-zinc-900/40 border border-zinc-800 text-white text-sm rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition-colors";
const labelCls = "text-sm font-medium text-zinc-200";
const errorCls = "text-xs text-red-400 mt-1.5 flex items-center gap-1";
const triggerCls =
  "w-full bg-zinc-900/40 border border-zinc-800 text-sm rounded-lg px-3 py-2.5 flex items-center justify-between cursor-pointer outline-none hover:border-zinc-700 transition-colors";
const popoverCls =
  "bg-zinc-950 border border-zinc-800 rounded-lg p-1 shadow-xl z-50";
const listItemCls =
  "text-zinc-300 text-sm px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-800 hover:text-white outline-none data-[focused=true]:bg-zinc-800";

const genres = [
  { id: "fantasy", label: "Fantasy" },
  { id: "science-fiction", label: "Science Fiction" },
  { id: "mystery", label: "Mystery" },
  { id: "romance", label: "Romance" },
  { id: "thriller", label: "Thriller" },
  { id: "horror", label: "Horror" },
  { id: "biography", label: "Biography" },
  { id: "self-help", label: "Self Help" },
  { id: "technology", label: "Technology" },
];

export default function EditModal({ isOpen, onClose, book, onSave }) {
  // ── controlled input states ────────────────────────────────────────────────
  const [title, setTitle] = useState(book?.title || "");
  const [genre, setGenre] = useState(book?.genre || "");
  const [price, setPrice] = useState(book?.price || "");
  const [description, setDescription] = useState(book?.description || "");
  const [fullDescription, setFullDescription] = useState(
    book?.fullDescription || "",
  );

  const [coverUrl, setCoverUrl] = useState(book?.coverImage || "");
  const [coverPreview, setCoverPreview] = useState(book?.coverImage || "");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  // ── cover upload ────────────────────────────────────────────────────────────
  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors((p) => ({ ...p, cover: "Max 5 MB allowed." }));
      return;
    }
    setCoverPreview(URL.createObjectURL(file));
    setIsUploading(true);
    const fd = new FormData();
    fd.append("image", file);
    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: fd },
      );
      const data = await res.json();
      if (data.success) {
        setCoverUrl(data.data.url);
        setErrors((p) => ({ ...p, cover: "" }));
      } else {
        setErrors((p) => ({ ...p, cover: "Upload failed." }));
      }
    } catch {
      setErrors((p) => ({ ...p, cover: "Network error." }));
    } finally {
      setIsUploading(false);
    }
  };

  // ── submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const selectedGenre = genre || "";
    const trimmedDesc = description.trim();
    const trimmedFullDesc = fullDescription.trim();

    const errs = {};
    if (!trimmedTitle) errs.title = "Title is required.";
    if (!selectedGenre) errs.genre = "Select a genre.";
    if (!price || Number(price) <= 0) errs.price = "Enter a valid price.";
    if (!trimmedDesc) errs.description = "Description is required.";
    if (!trimmedFullDesc)
      errs.fullDescription = "Full description is required.";
    if (!coverUrl) errs.cover = "Cover image is required.";

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setIsSaving(true);

    const updated = {
      
      title: trimmedTitle,
      genre: selectedGenre,
      price: Number(price),
      description: trimmedDesc,
      fullDescription: trimmedFullDesc,
      coverImage: coverUrl,
    };

    const res = await EbookUpdate(updated, book._id);

    if (res?.modifiedCount > 0 ) {
     toast.success("Ebook updated successfully!");
      onSave({ ...book, ...updated });
      onClose();
    } else {
      toast.error("Failed to update ebook. Please try again.");
    }

    setIsSaving(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Modal.Backdrop
        isDismissable={false}
        className="bg-linear-to-t from-black/80 via-black/40 to-transparent dark:from-zinc-800/80 dark:via-zinc-800/40"
        variant="blur"
      >
        <Modal.Container className="">
          <Modal.Dialog className="bg-[#0f0f0f] border border-zinc-800 max-w-2xl w-full rounded-2xl overflow-hidden">
            {/* Header */}
            <Modal.Header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
              <Modal.Heading className="text-base font-semibold text-white flex items-center gap-2">
                <FiEdit2 size={15} className="text-purple-400" /> Edit Ebook
              </Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>

            {/* Body */}
            <div className="px-6 py-5 max-h-[75vh] overflow-y-auto">
              <Form
                onSubmit={handleSubmit}
                validationErrors={errors}
                validationBehavior="aria"
                className="space-y-5"
              >
                <Fieldset
                  className="space-y-5 w-full p-0 m-0 border-0"
                  disabled={isUploading}
                >
                  {/* ROW 1 — Title | Genre */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                    }}
                  >
                    <TextField
                      name="title"
                      isInvalid={!!errors.title}
                      className="flex flex-col gap-1.5"
                    >
                      <Label className={labelCls}>
                        Title <span className="text-red-500 ml-0.5">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="title"
                        placeholder="e.g. The Lost Meridian"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={inputCls}
                      />
                      {errors.title && (
                        <FieldError className={errorCls}>
                          <FiAlertTriangle size={11} />
                          {errors.title}
                        </FieldError>
                      )}
                    </TextField>

                    <div className="flex flex-col gap-1.5">
                      <Select
                        defaultSelectedKey={book?.genre || ""}
                        onChange={(key) => setGenre(String(key))}
                        name="genre"
                      >
                        <Label className={labelCls}>
                          Genre <span className="text-red-500 ml-0.5">*</span>
                        </Label>
                        <Select.Trigger className={triggerCls}>
                          <Select.Value placeholder="Select a genre" />
                          <Select.Indicator>
                            <FiChevronDown
                              size={15}
                              className="text-zinc-500"
                            />
                          </Select.Indicator>
                        </Select.Trigger>
                        <Select.Popover className={popoverCls}>
                          <ListBox className="outline-none">
                            {genres.map(({ id, label }) => (
                              <ListBox.Item
                                key={id}
                                id={id}
                                textValue={label}
                                className={listItemCls}
                              >
                                {label}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                      {errors.genre && (
                        <p className={errorCls}>
                          <FiAlertTriangle size={11} />
                          {errors.genre}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ROW 2 — Price | Cover */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                    }}
                  >
                    <TextField
                      name="price"
                      isInvalid={!!errors.price}
                      className="flex flex-col gap-1.5"
                    >
                      <Label className={labelCls}>
                        Price (USD){" "}
                        <span className="text-red-500 ml-0.5">*</span>
                      </Label>
                      <div className="relative flex items-center">
                        <Input
                          type="number"
                          name="price"
                          placeholder="9.99"
                          min={0}
                          step="0.01"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className={`${inputCls} pr-8`}
                        />
                        <span className="absolute right-3 text-zinc-500 text-sm select-none pointer-events-none">
                          $
                        </span>
                      </div>
                      {errors.price && (
                        <FieldError className={errorCls}>
                          <FiAlertTriangle size={11} />
                          {errors.price}
                        </FieldError>
                      )}
                    </TextField>

                    <div className="flex flex-col gap-1.5">
                      <span className={labelCls}>
                        Cover Image{" "}
                        <span className="text-red-500 ml-0.5">*</span>
                      </span>
                      <div className="w-full h-[100px] bg-zinc-900/20 border border-dashed border-zinc-800 rounded-xl relative overflow-hidden hover:border-zinc-700 transition-colors">
                        {coverPreview ? (
                          <div className="absolute inset-0 group bg-zinc-950 flex items-center justify-center p-2">
                            <Image
                              src={coverPreview}
                              alt="cover"
                              width={60}
                              height={80}
                              className="h-full w-auto object-contain rounded"
                              unoptimized
                            />
                            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                              <p className="text-xs text-emerald-400 flex items-center gap-1">
                                <FiCheck size={11} /> Uploaded
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  setCoverPreview("");
                                  setCoverUrl("");
                                }}
                                className="text-xs text-red-400 border border-red-500/20 px-2 py-1 rounded-lg hover:bg-red-500/10"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group gap-1.5">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleCoverUpload}
                              className="hidden"
                            />
                            <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                              <FiUploadCloud size={16} />
                            </div>
                            <p className="text-xs text-zinc-400 group-hover:text-white transition-colors">
                              {isUploading ? "Uploading..." : "Upload cover"}
                            </p>
                          </label>
                        )}
                      </div>
                      {errors.cover && (
                        <p className={errorCls}>
                          <FiAlertTriangle size={11} />
                          {errors.cover}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between">
                      <Label className={labelCls}>
                        Description{" "}
                        <span className="text-red-500 ml-0.5">*</span>
                      </Label>
                      <span className="text-xs text-zinc-600">
                        {description.length} / 500
                      </span>
                    </div>
                    <TextField
                      name="description"
                      isInvalid={!!errors.description}
                      className="w-full"
                    >
                      <TextArea
                        name="description"
                        placeholder="Write a compelling summary..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        maxLength={500}
                        className={`${inputCls} resize-none`}
                      />
                      {errors.description && (
                        <FieldError className={errorCls}>
                          <FiAlertTriangle size={11} />
                          {errors.description}
                        </FieldError>
                      )}
                    </TextField>
                  </div>

                  {/* Full Description */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between">
                      <Label className={labelCls}>
                        Full Description{" "}
                        <span className="text-red-500 ml-0.5">*</span>
                      </Label>
                      <span className="text-xs text-zinc-600">
                        {fullDescription.length} / 5000
                      </span>
                    </div>
                    <TextField
                      name="fullDescription"
                      isInvalid={!!errors.fullDescription}
                      className="w-full"
                    >
                      <TextArea
                        name="fullDescription"
                        placeholder="Full ebook content..."
                        value={fullDescription}
                        onChange={(e) => setFullDescription(e.target.value)}
                        rows={5}
                        maxLength={5000}
                        className={`${inputCls} resize-y`}
                      />
                      <p className="text-xs text-zinc-600 mt-1 flex items-center gap-1.5">
                        <FiLock size={11} /> Only visible after purchase.
                      </p>
                      {errors.fullDescription && (
                        <FieldError className={errorCls}>
                          <FiAlertTriangle size={11} />
                          {errors.fullDescription}
                        </FieldError>
                      )}
                    </TextField>
                  </div>
                </Fieldset>

                {/* Footer */}
                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                  <Button  variant="outline"
                    type="button"
                    onClick={onClose}
                    className="px-5 h-10 rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-900 text-sm font-medium transition-colors"
                  >
                    Cancel
                  </Button>
                  <button
                    type="submit"
                    disabled={isSaving || isUploading}
                    className="px-5 h-10 hover:cursor-pointer rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#c084fc] to-[#818cf8] hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSaving ? (
                      <Spinner size="sm" />
                    ) : (
                      <FiBookmark size={14} />
                    )}
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </Form>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
