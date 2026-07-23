import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminForm, type AdminFormField } from "@/components/admin/admin-form";
import { updateGalleryImage } from "../../actions";

const fields: AdminFormField[] = [
  { name: "src", label: "Image path", type: "text", required: true },
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

export default async function EditGalleryImagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const image = await db.galleryImage.findUnique({ where: { id } });

  if (!image) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">Edit Gallery Image</h1>
      <AdminForm
        fields={fields}
        initialValues={{
          src: image.src,
          alt: image.alt,
          category: image.category,
          span: image.span ?? "",
        }}
        action={updateGalleryImage.bind(null, id)}
        cancelHref="/admin/gallery"
        submitLabel="Save changes"
      />
    </div>
  );
}
