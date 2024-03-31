import Link from "next/link";

const links = [
  {
    title: "Site generation",
    path: "site-generation",
  },
];

export default function Page() {
  return (
    <div className="flex-center h-screen bg-slate-900 text-white">
      {links.map((item, i) => (
        <Link key={i} href={"/playground/" + item.path}>
          <>{item.title}</>
        </Link>
      ))}
    </div>
  );
}
