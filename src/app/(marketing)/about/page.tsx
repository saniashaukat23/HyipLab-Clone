import AboutUsSection from "@/app/components/AboutUsSection";
import Accordion from "@/app/components/AccordianItem";
import CallToAction from "@/app/components/CallToAction";
import PageBanner from "@/app/components/PageBanner";
import WorkProcess from "@/app/components/WorkProcess";

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About" />
      <WorkProcess />
      <AboutUsSection />
      <section className="py-28 w-full">
        <Accordion />
      </section>
      <CallToAction />
    </>
  );
}
