import { AdminForm, type AdminFormField } from "@/components/admin/admin-form";
import { createGalleryImage } from "../actions";

const fields: AdminFormField[] = [
  { name: "src", label: "Image path", type: "text", required: true, placeholder: "/images/gallery/example.jpg" },
  { name: "alt", label: "Alt text / description", type: "text", required: true },
  {
    name: "category",
    label: "Category",
    type: "select",
    required: true,
    options: [
      { value: "education", label: "Education" },
      { value: "women", label: "Women" },
      { value: "youth", label: "Youth" },
      { value: "healthcare", label: "Healthcare" },
      { value: "events", label: "Events" },
    ],
  },
  {
    name: "span",
    label: "Grid span (optional)",
    type: "select",
    options: [
      { value: "", label: "Normal" },
      { value: "tall", label: "Tall" },
      { value: "wide", label: "Wide" },
    ],
  },
];

export default function NewGalleryImagePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">New Gallery Image</h1>
      <AdminForm fields={fields} action={createGalleryImage} cancelHref="/admin/gallery" submitLabel="Create" />
    </div>
  );
}
