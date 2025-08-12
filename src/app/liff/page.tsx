"use client";

import { useEffect } from "react";
import liff from "@line/liff";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";

export default function LiffPage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });
      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }
      const idToken = liff.getIDToken();
      const profile = await liff.getProfile();

      const res = await fetch("/api/auth/line/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, profile }),
      });

      const data = await res.json();

      if (data.exists) {
        router.push("/dashboard");
      } else {
        router.push(
          `/register?lineId=${profile.userId}&name=${encodeURIComponent(
            profile.displayName
          )}`
        );
      }
    })();
  }, [router]);

  return <Loading />;
}
