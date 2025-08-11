import { getCurrentUser } from "@/lib/auth";
import Image from "next/image";

export default async function Dashboard() {
  const user = await getCurrentUser();
  if (!user) return <p>ログインしてください</p>;

  return (
    <div>
      <h1>ようこそ, {user.name} さん</h1>
      {user.avatarUrl && <Image src={user.avatarUrl} alt="avatar" />}
      <p>電話番号: {user.phone}</p>
      <p>住所: {user.address}</p>
    </div>
  );
}
