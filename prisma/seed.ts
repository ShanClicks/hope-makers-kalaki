import { PrismaClient } from "@prisma/client";
import { FOCUS_AREAS } from "../src/services/mock/focus-areas";
import { PROJECTS } from "../src/services/mock/projects";
import { TEAM_MEMBERS, CORE_VALUES } from "../src/services/mock/about";
import { TESTIMONIALS } from "../src/services/mock/testimonials";
import { GALLERY_IMAGES } from "../src/services/mock/gallery";
import { NEWS_ITEMS } from "../src/services/mock/news";
import {
  IMPACT_STATS,
  ANNUAL_GROWTH,
  PROGRAM_DISTRIBUTION,
} from "../src/services/mock/impact-stats";
import { FAQ_ITEMS } from "../src/services/mock/faq";

const db = new PrismaClient();

async function main() {
  console.log("Seeding focus areas...");
  for (const [i, area] of FOCUS_AREAS.entries()) {
    await db.focusArea.upsert({
      where: { id: area.id },
      update: {},
      create: {
        id: area.id,
        slug: area.slug,
        title: area.title,
        teaser: area.teaser,
        description: area.description,
        icon: area.icon,
        gradient: area.gradient,
        order: i,
      },
    });
  }

  console.log("Seeding projects...");
  for (const [i, project] of PROJECTS.entries()) {
    await db.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: {
        slug: project.slug,
        title: project.title,
        categoryId: project.category,
        summary: project.summary,
        description: project.description,
        location: project.location,
        coverImage: project.images[0] ?? "",
        progress: project.progress,
        goalLabel: project.goalLabel,
        status: project.status,
        order: i,
      },
    });
  }

  console.log("Seeding team members...");
  for (const [i, member] of TEAM_MEMBERS.entries()) {
    await db.teamMember.create({
      data: {
        name: member.name,
        role: member.role,
        photo: member.photo,
        bio: member.bio,
        order: i,
      },
    });
  }

  console.log("Seeding core values...");
  for (const [i, value] of CORE_VALUES.entries()) {
    await db.coreValue.create({
      data: {
        title: value.title,
        description: value.description,
        icon: value.icon,
        order: i,
      },
    });
  }

  console.log("Seeding testimonials...");
  for (const [i, t] of TESTIMONIALS.entries()) {
    await db.testimonial.create({
      data: {
        name: t.name,
        program: t.program,
        portrait: t.portrait,
        excerpt: t.excerpt,
        story: t.story,
        location: t.location,
        order: i,
      },
    });
  }

  console.log("Seeding gallery images...");
  for (const [i, img] of GALLERY_IMAGES.entries()) {
    await db.galleryImage.create({
      data: {
        src: img.src,
        alt: img.alt,
        category: img.category,
        span: img.span,
        order: i,
      },
    });
  }

  console.log("Seeding news items...");
  for (const item of NEWS_ITEMS) {
    await db.newsItem.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        slug: item.slug,
        title: item.title,
        summary: item.summary,
        content: item.content,
        image: item.image,
        date: new Date(item.date),
        category: item.category,
        type: item.type,
        eventDate: item.eventDate ? new Date(item.eventDate) : null,
        location: item.location,
      },
    });
  }

  console.log("Seeding impact stats...");
  for (const [i, stat] of IMPACT_STATS.entries()) {
    await db.impactStat.upsert({
      where: { id: stat.id },
      update: {},
      create: {
        id: stat.id,
        label: stat.label,
        value: stat.value,
        suffix: stat.suffix,
        icon: stat.icon,
        order: i,
      },
    });
  }

  console.log("Seeding annual growth...");
  for (const datum of ANNUAL_GROWTH) {
    await db.annualGrowthDatum.upsert({
      where: { year: datum.year },
      update: {},
      create: {
        year: datum.year,
        beneficiaries: datum.beneficiaries,
        projects: datum.projects,
      },
    });
  }

  console.log("Seeding program distribution...");
  for (const datum of PROGRAM_DISTRIBUTION) {
    await db.programDistributionDatum.upsert({
      where: { label: datum.label },
      update: {},
      create: {
        label: datum.label,
        value: datum.value,
      },
    });
  }

  console.log("Seeding FAQ items...");
  for (const [i, item] of FAQ_ITEMS.entries()) {
    await db.faqItem.create({
      data: {
        category: item.category,
        question: item.question,
        answer: item.answer,
        order: i,
      },
    });
  }

  console.log("Done.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
