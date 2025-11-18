"use client";

import React, { useState } from "react";
import SectionHead from "./SectionHead";

export interface AccordionItem {
  question: string;
  answer: string;
}

const faqs: AccordionItem[] = [
  {
    question: "When can I deposit/withdraw from my Investment account?",
    answer:
      "Deposit and withdrawal are available at any time. Be sure that your funds are not used in any ongoing trade before the withdrawal. The available amount is shown in your dashboard on the main page of the Investing platform.",
  },
  {
    question: "How do I check my account balance?",
    answer: "You can see this anytime on your accounts dashboard.",
  },
  {
    question: "I forgot my password, what should I do?",
    answer:
      "Visit the password reset page, type in your email address and click the Reset button.",
  },
  {
    question: "How will I know that the withdrawal has been successful?",
    answer:
      "You will get an automatic notification once we send the funds and you can always check your transactions or account balance. Your chosen payment system dictates how long it will take for the funds to reach you.",
  },
  {
    question: "How much can I withdraw?",
    answer:
      "You can withdraw the full amount of your account balance minus the funds that are currently used for supporting open positions.",
  },
];

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <SectionHead
        title="Frequently Asked"
        title2="Questions"
        description="We answer some of your Frequently Asked Questions regarding our platform. If you have a query that is not answered here, Please contact us."
      />
      <div className="space-y-4 mx-60 my-10">
        {faqs.map((item, idx) => {
          const isOpen = idx === openIndex;
          return (
            <div key={idx} className="border rounded overflow-hidden">
              <button
                onClick={() => toggle(idx)}
                className={
                  `w-full flex items-center justify-between p-4 text-white transition-colors duration-150 rounded-md bg-[#343a40] border-[1px] border-[hsla(40,54%,56%,1)]` +
                  (isOpen
                    ? ` focus:border-[#C0C0C0] bg-[hsla(40,54%,56%,1)] mb-2`
                    : ``)
                }
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-2">
                  <i className="las la-question-circle text-xl text-white" />
                  <span>{item.question}</span>
                </div>
              </button>
              <div
                className={`p-5 text-gray-200 bg-[#343a40] transition-all duration-200 ease-out ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
