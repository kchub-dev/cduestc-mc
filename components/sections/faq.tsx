"use client";

import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/content/faq";

export function FaqSection() {
  return (
    <section id="faq" className="section-pad scroll-mt-20">
      <div className="container-site max-w-3xl">
        <Reveal className="mb-10 text-center">
          <p className="heading-eyebrow inline-block text-left">常见问题</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            FAQ
          </h2>
        </Reveal>

        <Reveal>
          <Accordion className="w-full rounded-md border border-border bg-card px-2 pixel-border">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="px-3 text-left text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-3 text-muted-foreground">
                  <ol className="list-decimal space-y-2 pl-5">
                    {faq.answer.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
