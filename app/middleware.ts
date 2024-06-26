import { authMiddleware as clerkAuthMiddleware } from "@clerk/nextjs";
import { NextFetchEvent, NextRequest } from "next/server";

const authMiddleware = clerkAuthMiddleware({
  publicRoutes: [
    "/api/name",
    "/api/vision",
    "/api/audio",
    "/api/text",
    "/api/secret",
  ],
});

// only use authMiddleware if ENABLE_USER_MANAGEMENT is true, i.e. if user wishes to self host
export default function middleware(req: NextRequest, res: NextFetchEvent) {
  console.log("ENABLE_USER_MANAGEMENT", process.env.ENABLE_USER_MANAGEMENT);

  if (process.env.ENABLE_USER_MANAGEMENT == "true") {
    console.log("auth middleware", process.env.ENABLE_USER_MANAGEMENT);
    return authMiddleware(req, res);
  } else return;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
