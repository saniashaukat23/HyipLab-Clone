import React from "react";

export interface NewsPost {
  title: string;
  href: string;
  img: string;
  excerpt: string;
}

export const allPosts: NewsPost[] = [
  {
    title: "Top Strategies to Maximize Your Profits with HYIP Investments",
    href: "/blog/top-strategies-to-maximize-your-profits-with-hyip-investments",
    img: "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/blog/thumb_67bc191d219081740380445.png",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or...",
  },
  {
    title: "How High-Yield Investment Programs (HYIP) Work: A Beginner’s Guide",
    href: "/blog/how-high-yield-investment-programs-hyip-work-a-beginners-guide",
    img: "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/blog/thumb_67bc194ec1bdc1740380494.png",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or...",
  },
  {
    title: "Smart Investment Tips to Succeed in the HYIP Market",
    href: "/blog/smart-investment-tips-to-succeed-in-the-hyip-market",
    img: "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/blog/thumb_67bc19a36641e1740380579.png",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or...",
  },
  {
    title: "Understanding HYIP Risks and Effective Ways to Manage Them",
    href: "/blog/understanding-hyip-risks-and-effective-ways-to-manage-them",
    img: "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/blog/thumb_67bc19ddba1391740380637.png",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or...",
  },
  {
    title: "Why HYIP Can Be a Profitable Choice for Investors",
    href: "/blog/why-hyip-can-be-a-profitable-choice-for-investors",
    img: "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/blog/thumb_633191bed49ca1664192958.jpg",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or...",
  },
  {
    title: "A Complete Guide to ROI and Earnings in HYIP Investments",
    href: "/blog/a-complete-guide-to-roi-and-earnings-in-hyip-investments",
    img: "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/blog/thumb_63319192e33ed1664192914.jpg",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or...",
  },
];

interface LatestNewsProps {
  posts: NewsPost[];
}

const LatestNews: React.FC<LatestNewsProps> = ({ posts }) => {
  return (
    <div className="container mx-auto px-2 mt-10">
      <div className="flex flex-wrap ">
        {posts.map((post) => (
          <div key={post.href} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="h-full flex flex-col p-4 bg-black border-2 border-[hsla(40,54%,56%,1)] rounded-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="py-6 flex-1 flex flex-col text-white">
                <h5 className="text-lg font-semibold mb-2 flex-1">
                  <a
                    href={post.href}
                    className="hover:text-[hsla(40,54%,56%,1)]"
                  >
                    {post.title}
                  </a>
                </h5>
                <p className="mb-4">{post.excerpt}</p>
                <a
                  href={post.href}
                  className="w-2/5 inline-block mt-6 px-6 py-3 bg-[hsla(40,54%,56%,1)] text-center text-white font-medium rounded hover:bg-[hsla(40,54%,56%,0.8)] transition"
                >
                  Read more
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
