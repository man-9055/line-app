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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await liff.init({
          liffId: process.env.NEXT_PUBLIC_LIFF_ID!,
          withLoginOnExternalBrowser: true,
        });

        const loggedIn = liff.isLoggedIn();
        setIsLoggedIn(loggedIn);

        if (loggedIn) {
          const prof = await liff.getProfile();
          setProfile(prof);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err?.message ?? String(err));
      }
    })();
  }, []);

  const handleLogin = async () => {
    liff.login();
  };

  const handleLogout = () => {
    liff.logout();

    setIsLoggedIn(false);
    setProfile(null);
  };

  if (error) return <div>エラー: {error}</div>;

  return (
    <main>
      {!isLoggedIn ? (
        <>
          <h1>未ログイン</h1>
          <button onClick={handleLogin}>ログイン</button>
        </>
      ) : (
        <>
          {profile ? (
            <div>
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
            </div>
          ) : (
            <p>読み込み中...</p>
          )}
          <button onClick={handleLogout}>ログアウト</button>
        </>
      )}
    </main>
  );
}
