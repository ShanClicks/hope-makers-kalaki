import { db } from "@/lib/db";
import { AdminTable } from "@/components/admin/admin-table";
import { deleteTestimonial } from "./actions";

export default async function AdminTestimonialsPage() {
  const testimonials = await db.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <AdminTable
      title="Testimonials"
      newHref="/admin/testimonials/new"
      editBasePath="/admin/testimonials"
      onDelete={deleteTestimonial}
      columnLabels={["Name", "Program", "Location"]}
      rows={testimonials.map((testimonial) => ({
        id: testimonial.id,
        cells: [testimonial.name, testimonial.program, testimonial.location],
      }))}
    />
  );
}
