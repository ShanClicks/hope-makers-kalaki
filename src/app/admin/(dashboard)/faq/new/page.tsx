import { AdminForm, type AdminFormField } from "@/components/admin/admin-form";
import { createFaqItem } from "../actions";

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

export default function NewFaqItemPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">New FAQ Item</h1>
      <AdminForm fields={fields} action={createFaqItem} cancelHref="/admin/faq" submitLabel="Create" />
    </div>
  );
}
