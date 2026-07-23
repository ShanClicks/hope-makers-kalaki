import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminForm, type AdminFormField } from "@/components/admin/admin-form";
import { updateTestimonial } from "../../actions";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [testimonial, focusAreas] = await Promise.all([
    db.testimonial.findUnique({ where: { id } }),
    db.focusArea.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!testimonial) notFound();

  const fields: AdminFormField[] = [
    { name: "name", label: "Name", type: "text", required: true },
    {
      name: "program",
      label: "Program",
      type: "select",
      required: true,
      options: focusAreas.map((area) => ({ value: area.id, label: area.title })),
    },
    { name: "portrait", label: "Portrait photo path", type: "text" },
    { name: "excerpt", label: "Excerpt (short quote)", type: "textarea", required: true },
    { name: "story", label: "Full story", type: "textarea", required: true },
    { name: "location", label: "Location", type: "text", required: true },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">Edit Testimonial</h1>
      <AdminForm
        fields={fields}
        initialValues={{
          name: testimonial.name,
          program: testimonial.program,
          portrait: testimonial.portrait,
          excerpt: testimonial.excerpt,
          story: testimonial.story,
          location: testimonial.location,
        }}
        action={updateTestimonial.bind(null, id)}
        cancelHref="/admin/testimonials"
        submitLabel="Save changes"
      />
    </div>
  );
}
