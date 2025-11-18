import PageBanner from "@/app/components/PageBanner";
import { plans } from "@/app/data/file";
import PriceCard from "@/app/components/PriceCard";
export default function PlanPage() {
  return (
    <>
      <PageBanner title="Plans" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 py-28 mx-4 ">
        {plans.map((plan) => (
          <PriceCard
            key={plan.title}
            title={plan.title}
            price={plan.price}
            features={plan.features}
            backgroundImage={plan.backgroundImage}
          />
        ))}
      </div>
    </>
  );
}
