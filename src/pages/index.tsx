import Link from "next/link";

export const siteNavigation = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce site with a seamless checkout experience.",
    path: "/sites/eshopper",
    image: "/screenshots/ecommerce.png",
  },
  {
    id: 2,
    title: "AI Image Generator",
    description: "Generate stunning AI-powered images with ease.",
    path: "/sites/ai-image-gen",
    image: "/screenshots/ai-image-gen.png",
  },
  {
    id: 3,
    title: "Real Estate Listings",
    description: "A sleek real estate platform to browse properties.",
    path: "/sites/real-estate",
    image: "/screenshots/real-estate.png",
  },
  {
    id: 4,
    title: "Crypto Tracker Landing Page",
    description: "Track real-time cryptocurrency prices and trends.",
    path: "/sites/crypto",
    image: "/screenshots/crypto.png",
  },
  {
    id: 5,
    title: "Digital Agency Landing Page",
    description: "A high-end digital agency website with stunning visuals.",
    path: "/sites/agency",
    image: "/screenshots/agency.png",
  },
];

export default function Sites() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-6 py-12 text-white">
      <h1 className="mb-6 text-center text-4xl font-extrabold tracking-wide">
        🚀 Explore Templates
      </h1>
      <p className="mb-8 text-center text-lg text-gray-400">
        Click on a project to dive into the details!
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {siteNavigation.map((project) => (
          <Link prefetch={false} key={project.id} href={project.path} passHref>
            <div
              className="group relative flex h-[400px] w-[400px] flex-col justify-end overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2"
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/20"></div>

              {/* Content */}
              <div className="relative z-10 p-6">
                <h2 className="text-2xl font-semibold text-white transition-colors duration-300 group-hover:text-yellow-400">
                  {project.title}
                </h2>
                <p className="text-gray-300">{project.description}</p>
                <span className="mt-4 inline-block text-sm font-medium text-yellow-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View Project →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
