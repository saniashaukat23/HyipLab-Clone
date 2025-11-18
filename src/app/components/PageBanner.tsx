type Props = {
  title: string;
  subtitle?: string;
  bg?: string;
};

export default function PageBanner({
  title,
  bg = "https://script.viserlab.com/hyiplab/demo/assets/images/frontend/breadcrumb/631d82f525a611662878453.jpg",
}: Props) {
  return (
    <section
      className="relative py-44  flex items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <p className="text-3xl z-10 text-white px-10 md:text-4xl font-bold">
        {title}
      </p>
    </section>
  );
}
