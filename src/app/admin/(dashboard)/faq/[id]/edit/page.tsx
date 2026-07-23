import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminForm, type AdminFormField } from "@/components/admin/admin-form";
import { updateFaqItem } from "../../actions";

const fields: AdminFormField[] = [
  {
    name: "category",
    label: "Category",
    type: "select",
    required: true,
    options: [
      { value: "Donations & Giving", label: "Donations & Giving" },
      { value: "Programs & Impact", label: "Programs & Impact" },
      { value: "Volunteering & Partnerships", label: "Volunteering & Partnerships" },
      { value: "About Us", label: "About Us" },
    ],
  },
  { name: "question", label: "Question", type: "text", required: true },
  { name: "answer", label: "Answer", type: "textarea", required: true },
];

export default async function EditFaqItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.faqItem.findUnique({ where: { id } });

  if (!item) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">Edit FAQ Item</h1>
      <AdminForm
        fields={fields}
        initialValues={{ category: item.category, question: item.question, answer: item.answer }}
        action={updateFaqItem.bind(null, id)}
        cancelHref="/admin/faq"
        submitLabel="Save changes"
      />
    </div>
  );
}
