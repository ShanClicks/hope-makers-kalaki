import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.string().trim().min(3, "Please enter a subject.").max(150),
  message: z.string().trim().min(10, "Please share a bit more detail (at least 10 characters).").max(2000),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;

export const newsletterFormSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
});

export type NewsletterFormSchema = z.infer<typeof newsletterFormSchema>;

export const donateFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  amount: z.coerce.number().positive("Please enter an amount greater than zero."),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type DonateFormSchema = z.infer<typeof donateFormSchema>;
