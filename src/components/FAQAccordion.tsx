import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  title?: string;
  /** Show section header */
  showTitle?: boolean;
}

const FAQAccordion = ({ faqs, title = "Frequently Asked Questions", showTitle = true }: FAQAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="section-padding bg-surface">
      <div className="container mx-auto max-w-3xl">
        {showTitle && (
          <div className="text-center mb-10">
            <h2 className="section-heading">{title}</h2>
            <p className="section-subheading mx-auto mt-2">
              Everything you need to know — if your question isn't here, WhatsApp us directly.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-background border border-border rounded-xl overflow-hidden transition-all duration-200"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-body font-semibold text-sm md:text-base text-foreground leading-snug">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === i && (
                <div className="px-5 pb-5">
                  <div className="border-t border-border pt-4">
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
