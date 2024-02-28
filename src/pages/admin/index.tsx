import AdminLayout from "@/components/layouts/AdminLayout";
import Link from "next/link";

const adminRoutes = ["users", "products", "taxonomy", "sites/site1"];
const publicRoutes = ["sites/site1"];

export default function Page() {
  return (
    <AdminLayout>
      <div className="flex items-start gap-10">
        <div className="grid gap-5">
          <div className="text-2xl font-bold"> Admin routes</div>
          {adminRoutes.map((route) => (
            <Link key={route} href={`/admin/${route}`} className="uppercase">
              {route}
            </Link>
          ))}
        </div>
        <div className="grid gap-5">
          <div className="text-2xl font-bold"> Public routes</div>
          {publicRoutes.map((route) => (
            <Link key={route} href={`/${route}`} className="uppercase">
              {route}
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
