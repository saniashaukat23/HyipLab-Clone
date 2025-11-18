import SectionHead from "../components/SectionHead";
import PriceCard from "../components/PriceCard";
import ChooseCard from "../components/ChooseCard";
import InvestmentCalculator from "../components/InvestmentCalculator";
import TransactionTabs from "../components/TransactionTabs";
import WorkProcess from "../components/WorkProcess";
import Accordion, { AccordionItem } from "../components/AccordianItem";
import PaymentSlider from "../components/PaymentSlider";
import TestimonialSlider from "../components/Slider";
import InvestorCard, { Investor } from "../components/InvestorCard";
import styles from "../components/PriceCard.module.css";
import { plans } from "../data/file";
import LatestNews, { allPosts } from "@/app/components/LatestNews";
import TeamCard, { TeamMember } from "../components/TeamCard";
import AboutUsSection from "../components/AboutUsSection";
import CallToAction from "../components/CallToAction";
export default function Home() {
  const investors: Investor[] = [
    {
      rank: "1st",
      fullName: "Stefan Cajavilca",
      username: "jocare52",
      investment: "$1,342,798,612.89",
    },
    {
      rank: "2nd",
      fullName: "MORI YOU",
      username: "motoxxx",
      investment: "$9,348,100.00",
    },
    {
      rank: "3rd",
      fullName: "Md Belal Hosen",
      username: "mdbelalhosen002",
      investment: "$6,239,213.67",
    },
    {
      rank: "4th",
      fullName: "Abdul Basit",
      username: "basit123",
      investment: "$1,220,900.00",
    },
    {
      rank: "5th",
      fullName: "User Name",
      username: "username",
      investment: "$214,751.95",
    },
    {
      rank: "6th",
      fullName: "azzd fzfz",
      username: "rooted",
      investment: "$125,294.85",
    },
    {
      rank: "7th",
      fullName: "testingo testingo",
      username: "nekotreci66",
      investment: "$76,200.00",
    },
    {
      rank: "8th",
      fullName: "David Doe",
      username: "whoami420",
      investment: "$61,227.85",
    },
  ];
  const team: TeamMember[] = [
    {
      name: "Callie Mcdowell",
      designation: "CEO",
      avatar:
        "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/team/631d7d27b87b91662876967.jpg",
    },
    {
      name: "Marcia Weeks",
      designation: "CTO",
      avatar:
        "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/team/631d7d3659a841662876982.jpg",
    },
    {
      name: "Sage Bray",
      designation: "Marketing Head",
      avatar:
        "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/team/631d7d451b43e1662876997.jpg",
    },
    {
      name: "Cyrus Briggs",
      designation: "Developer",
      avatar:
        "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/team/631d7d59199b41662877017.jpg",
    },
    {
      name: "Colette Mccarty",
      designation: "UX Expert",
      avatar:
        "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/team/631d7d67880c71662877031.jpg",
    },
    {
      name: "Alden Odom",
      designation: "SEO Expert",
      avatar:
        "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/team/631d7d89303111662877065.jpg",
    },
    {
      name: "Tanek Gilmore",
      designation: "SEO Expert",
      avatar:
        "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/team/631d7da2f198c1662877090.jpg",
    },
    {
      name: "Upton Blair",
      designation: "Manager",
      avatar:
        "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/team/631d7db766b581662877111.jpg",
    },
  ];

  const chooseReasons = [
    {
      title: "Legal Company",
      icon: "las la-copy",
      desc: "Our company conducts absolutely legal activities in the legal field. We are certified to operate investment business, we are legal and safe.",
    },
    {
      title: "High reliability",
      icon: "las la-lock",
      desc: "We are trusted by a huge number of people. We are working hard constantly to improve the level of our security system and minimize possible risks.",
    },
    {
      title: "Anonymity",
      icon: "las la-user-lock",
      desc: "Anonymity and using cryptocurrency as a payment instrument. In the era of electronic money – this is one of the most convenient ways of cooperation.",
    },
    {
      title: "Quick Withdrawal",
      icon: "las la-shipping-fast",
      desc: "Our all retreats are treated spontaneously once requested. There are high maximum limits. The minimum withdrawal amount is only $10 .",
    },
    {
      title: "Referral Program",
      icon: "las la-link",
      desc: "We are offering a certain level of referral income through our referral program. you can increase your income by simply refer a few people.",
    },
    {
      title: "24/7 Support",
      icon: "las la-headset",
      desc: "We provide 24/7 customer support through e-mail and telegram. Our support representatives are periodically available to elucidate any difficulty.",
    },
    {
      title: "Dedicated Server",
      icon: "las la-server",
      desc: "We are using a dedicated server for the website which allows us exclusive use of the resources of the entire server",
    },
    {
      title: "SSL Secured",
      icon: "lab la-expeditedssl",
      desc: "Comodo Essential-SSL Security encryption confirms that the presented content is genuine and legitimate.",
    },
    {
      title: "DDOS Protection",
      icon: "las la-shield-alt",
      desc: "We are using one of the most experienced, professional, and trusted DDoS Protection and mitigation provider.",
    },
  ];

  const priceCardImg =
    "https://script.viserlab.com/hyiplab/demo/assets/templates/bit_gold//images/bg/bg-4.png";
  const sec1Bg =
    "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/banner/631c9810cbce71662818320.jpg";

  const sec3Bg =
    "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/why_choose/631d7ee5c26801662877413.jpg";

  const sec5Bg =
    "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/team/631d7cee5a6e31662876910.jpg";
  return (
    <>
      <section
        className="Hero-Section  py-44 w-full relative "
        style={{
          backgroundImage: `url(${sec1Bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto",
          backgroundPosition: " center ",
        }}
      >
        <div className="flex-row">
          <div className="w-2/5">
            <div className="hero-content px-2">
              <p className="text-white text-6xl tracking-thin leading-16">
                Invest for Future in Stable Platform{" "}
                <span className="text-[hsla(40,54%,56%,1)]">
                  {" "}
                  and Make Fast Money
                </span>
              </p>
              <p className="text-white mt-8 text-lg">
                Invest in an Industry Leader, Professional, and Reliable
                Company. We provide you with the most necessary features that
                will make your experience better. Not only we guarantee the
                fastest and the most exciting returns on your investments, but
                we also guarantee the security of your investment.
              </p>
              <button className="py-3 rounded-md mt-8 px-7 bg-[hsla(40,54%,56%,1)] hover:bg-[#CBA532]">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </section>
      <AboutUsSection />
      <section className="Hero-Section h-full w-full p-32">
        <SectionHead
          title={"Investment"}
          title2={"Plans"}
          description={
            "To make a solid investment, you have to know where you are investing.Find a plan which is best for you."
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10  mx-16 ">
          {plans.slice(0, 3).map((plan) => (
            <PriceCard
              key={plan.title}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              backgroundImage={plan.backgroundImage}
            />
          ))}
        </div>
      </section>
      <section
        className="Hero-Section  w-full relative "
        style={{
          backgroundImage: `url(${sec3Bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "140%",
          backgroundPosition: "center top 10%",
        }}
      >
        <div className="h-full w-full bg-[#000000]/70 py-28">
          <SectionHead
            title="Why Choose"
            title2="HyipLab"
            description="Our goal is to provide our investors with a reliable source of high income, while minimizing any possible risks and offering a high-quality service."
          />
          <div className="grid grid-cols-3 gap-5 text-white px-6">
            {chooseReasons.map((item, index) => (
              <ChooseCard
                key={index}
                title={item.title}
                icon={item.icon}
                desc={item.desc}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-28 w-full ">
        <SectionHead
          title="Profit"
          title2="Calculator"
          description="You must know the calculation before investing in any plan, so you never make mistakes. Check the calculation and you will get as our calculator says."
        />
        <div className="flex justify-center items-center w-full mt-12">
          <InvestmentCalculator />
        </div>
      </section>
      <WorkProcess />
      <section className="py-28 w-full">
        <Accordion />
      </section>
      <section className="py-28 w-full bg-black">
        <SectionHead
          title="What Users Say"
          title2="About Us"
          description="We are doing really good at this market and here are the words we loved to get from a few of our users."
        />
        <TestimonialSlider />
      </section>
      <section
        className=" py-28 w-full relative "
        style={{
          backgroundImage: `url(${sec5Bg})`,
          backgroundSize: "200%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <SectionHead
          title="Our Expert"
          title2="Team Members"
          description="We have a great team including developers, designers, and Traders. The Team always working hard to give you the maximum profit."
        />
        <div className="flex flex-wrap justify-center ">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </section>
      <section className="w-full py-28 border-b border-[hsla(40,54%,56%,1)]">
        <SectionHead
          title="Our Latest"
          title2="Transaction"
          description="Here is the log of the most recent transactions including withdraw and deposit made by our users."
        />
        <TransactionTabs />
      </section>
      <section className="w-full py-28 ">
        <SectionHead
          title="Our Top"
          title2="Investors"
          description="Here are the investor leaders who have made the maximum investment with our system."
        />
        <div className="mt-10 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
            {investors.map((inv) => (
              <InvestorCard key={inv.username} investor={inv} />
            ))}
          </div>
        </div>{" "}
      </section>
      <CallToAction />
      <section
        className="pb-28 w-full border-b border-[hsla(40,54%,56%,1)]
      "
      >
        <SectionHead
          title="Payment We"
          title2="Accept"
          description="We accept all major cryptocurrencies and fiat payment methods to make your investment process easier with our platform."
        />
        <div className="row justify-center">
          <div className="col-lg-12">
            <PaymentSlider />
          </div>
        </div>
      </section>
      {/* <section className="py-28 border-b border-[hsla(40,54%,56%,1)]">
        <SectionHead
          title="User"
          title2="Ranking"
          description="You can get a bonus to fulfill the requirement."
        />
        <ReferralLevels />
      </section> */}
      <section className="py-28">
        <SectionHead
          title="Our Latest News"
          title2=""
          description="You will get each update about our system and the world market in this area. Keep checking our Latest News to be in touch.

"
        />
        <LatestNews posts={allPosts.slice(0, 3)} />
      </section>
      <section className="pb-32">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div
              className={`w-full max-w-5xl p-12 bg-cover bg-center rounded-lg overflow-hidden ${styles.cusShadow}`}
              style={{
                backgroundImage:
                  "url(https://script.viserlab.com/hyiplab/demo/assets/images/frontend/subscribe/631ca2753add11662820981.jpg)",
              }}
            >
              <div className="flex flex-col lg:flex-row items-center ">
                <div className="flex-1">
                  <h2 className="text-3xl text-white font-semibold">
                    Subscribe Our Newsletter
                  </h2>
                </div>
                <div className="flex-1 mt-4 lg:mt-0">
                  <form className="flex">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="flex-1 text-white px-4 py-3 rounded-l-sm focus:outline-none bg-[#22222e] border border-[hsla(40,54%,56%,0.45)]"
                    />
                    <button
                      type="submit"
                      className="bg-[hsla(40,54%,56%,1)] px-5 py-3 rounded-r-md hover:bg-[#CBA532] transition"
                    >
                      <i className="las la-paper-plane text-black"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
