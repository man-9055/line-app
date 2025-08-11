"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function RegisterPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const lineId = params.get("lineId") || "";
  const name = params.get("name") || "";
  const avatarUrl = params.get("avatarUrl") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/line/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lineId, name, avatarUrl, phone, address }),
    });
    if (res.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <div>
      <h1>初回登録</h1>
      <Image src={avatarUrl} alt="avatar" width={80} height={80} />
      <p>{name}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>電話番号</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>住所</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
  );
}
