import { db } from "@/lib/db";
import { AdminTable } from "@/components/admin/admin-table";
import { deleteGalleryImage } from "./actions";

export default async function AdminGalleryPage() {
  const images = await db.galleryImage.findMany({ orderBy: { order: "asc" } });

  return (
    <AdminTable
      title="Gallery"
      newHref="/admin/gallery/new"
      editBasePath="/admin/gallery"
      onDelete={deleteGalleryImage}
      columnLabels={["Description", "Category", "Path"]}
      rows={images.map((image) => ({
        id: image.id,
        cells: [image.alt, image.category, image.src],
      }))}
    />
  );
}
