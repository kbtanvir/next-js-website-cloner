import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
  });

  // if in home url redirect to /sites/eshopper
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/sites/eshopper", request.url));
  }

  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // if (request.nextUrl.pathname === "/") {
  //   return NextResponse.rewrite(new URL("/sites/eshopper", request.url));
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
