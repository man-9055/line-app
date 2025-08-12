import { getCurrentUser } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <main className="p-10 flex justify-center">
      <div className="w-[400px] bg-gray-50 rounded-lg p-10 border border-gray-200">
        <h1 className="text-2xl font-bold mb-8 text-center">ダッシュボード</h1>
        <p className="text-lg font-bold mb-5">ようこそ! {user.name} さん</p>
        {user.avatarUrl && <Image src={user.avatarUrl} alt="avatar" />}
        <div className="mb-3">
          <p className="font-bold">電話番号</p>
          <p>{user.phone}</p>
        </div>
        <div>
          <p className="font-bold">住所</p>
          <p>{user.address}</p>
        </div>
      </div>
    </main>
  );
}
