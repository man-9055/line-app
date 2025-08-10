"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";
import Image from "next/image";

type Profile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
};

export default function LiffPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await liff.init({
          liffId: process.env.NEXT_PUBLIC_LIFF_ID!, // 例: 2007899577-xxxxx
          withLoginOnExternalBrowser: true,
        });

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const prof = await liff.getProfile();
        setProfile(prof);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err?.message ?? String(err));
      }
    })();
  }, []);

  if (error) return <div>エラー: {error}</div>;
  if (!profile) return <div>読み込み中...</div>;

  return (
    <main>
      <h1>プロフィール</h1>
      <div>
        {profile.pictureUrl && (
          <Image
            src={profile.pictureUrl}
            alt="profile"
            width={72}
            height={72}
            className="rounded-xl"
          />
        )}
        <div>
          <p>{profile.displayName}</p>
          <p>{profile.userId}</p>
        </div>
        {profile.statusMessage && <p>{profile.statusMessage}</p>}
      </div>
    </main>
  );
}
