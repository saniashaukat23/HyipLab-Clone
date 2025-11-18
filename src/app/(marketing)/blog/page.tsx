import PageBanner from "@/app/components/PageBanner";
import LatestNews, { allPosts } from "@/app/components/LatestNews";

export default function Blog() {
  return (
    <>
      <PageBanner title="Blog" />
      <section className="py-14">
        <LatestNews posts={allPosts} />
      </section>
    </>
  );
}
