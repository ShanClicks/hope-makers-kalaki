import { db } from "@/lib/db";
import { AdminForm, type AdminFormField } from "@/components/admin/admin-form";
import { createTestimonial } from "../actions";

export default async function NewTestimonialPage() {
  const focusAreas = await db.focusArea.findMany({ orderBy: { order: "asc" } });

  const fields: AdminFormField[] = [
    { name: "name", label: "Name", type: "text", required: true },
    {
      name: "program",
      label: "Program",
      type: "select",
      required: true,
      options: focusAreas.map((area) => ({ value: area.id, label: area.title })),
    },
    { name: "portrait", label: "Portrait photo path", type: "text", placeholder: "/images/testimonials/example.jpg" },
    { name: "excerpt", label: "Excerpt (short quote)", type: "textarea", required: true },
    { name: "story", label: "Full story", type: "textarea", required: true },
    { name: "location", label: "Location", type: "text", required: true },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">New Testimonial</h1>
      <AdminForm fields={fields} action={createTestimonial} cancelHref="/admin/testimonials" submitLabel="Create" />
    </div>
  );
}
