import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // if in home url redirect to /sites/eshopper
  if (pathname === "/") {
    console.log("is home");
    return NextResponse.redirect(new URL("/sites/eshopper", request.url));
  }

  // if (request.nextUrl.pathname === "/") {
  //   return NextResponse.rewrite(new URL("/sites/eshopper", request.url));
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
