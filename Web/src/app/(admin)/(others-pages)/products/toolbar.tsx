import Link from "next/link";
import Clock from "@/components/Clock";

export default function Toolbar() {
  return (
    <div className="pb-5 flex flex-row justify-between w-full">
      <Link
        href="/products/add"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Novo Produto
      </Link>
      <Clock />
    </div>
  );
}
