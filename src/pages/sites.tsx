import { siteNavigation } from "@/lib/const/navigation";
import Link from "next/link";

export default function sites() {
  return (
    <div className="section-box-w section-py flex-center grid h-screen content-start">
      <div className="text-3xl font-bold">Navigation</div>
      <div className="grid gap-4 text-lg">
        {Object.entries(siteNavigation).map(([key, value]) => (
          <div key={key}>
            <Link href={value.home.path}>{value.home.path}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
