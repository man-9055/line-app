"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const lineId = params.get("lineId") || "";
  const name = params.get("name") || "";
  // const avatarUrl = params.get("avatarUrl") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/line/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lineId, name, phone, address }),
    });
    if (res.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <main className="p-10 flex justify-center">
      <div className="w-[400px] bg-gray-50 rounded-lg p-10 border border-gray-200">
        <h1 className="text-2xl font-bold mb-5 text-center">初回登録</h1>
        {/* <Image src={avatarUrl} alt="avatar" width={80} height={80} /> */}
        <p className="text-lg font-bold mb-5">{name}さん</p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-3">
            <label htmlFor="tel" className="mb-0.5 text-sm">
              電話番号
            </label>
            <input
              id="tel"
              type="tel"
              placeholder="08012345678"
              className="border border-gray-400 bg-white rounded-sm px-2 py-1.5 text-sm"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="address" className="mb-0.5 text-sm">
              住所
            </label>
            <input
              id="address"
              type="text"
              placeholder="鹿児島市XXXXXXXX"
              className="border border-gray-400 bg-white rounded-sm px-2 py-1.5 text-sm"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white rounded-md px-5 py-2 font-bold text-sm cursor-pointer"
            type="submit"
          >
            登録
          </button>
        </form>
      </div>
    </main>
  );
}
