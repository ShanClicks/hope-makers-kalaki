"use client";

import { useState } from "react";
import Image from "next/image";
import { TEAM_MEMBERS } from "@/services/mock";
import { getInitials } from "@/lib/utils";
import { Reveal } from "@/components/common/reveal";

export function TeamSection() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section className="container-app py-16 sm:py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl sm:text-4xl">Meet Our Team</h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          The people leading our programs and driving impact across Kalaki.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM_MEMBERS.map((member, index) => (
          <Reveal key={member.id} delay={index * 0.08}>
            <div className="flex h-full flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              {!failedImages[member.id] ? (
                <div className="relative size-20 overflow-hidden rounded-full">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                    onError={() => setFailedImages((prev) => ({ ...prev, [member.id]: true }))}
                  />
                </div>
              ) : (
                <span className="flex size-20 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">
                  {getInitials(member.name)}
                </span>
              )}
              <div>
                <h3 className="text-base">{member.name}</h3>
                <p className="text-sm font-medium text-primary">{member.role}</p>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">{member.bio}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
