export default function Home() {
  return (
    <div>
      <p>LINE APP2</p>
      <p>{process.env.NEXT_PUBLIC_LIFF_ID}</p>
    </div>
  );
}
