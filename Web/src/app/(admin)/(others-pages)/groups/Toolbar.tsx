import Link from "next/link";

export default function Toolbar() {
  return (
    
    <div className="pb-5 flex flex-row justify-between w-full">
      <Link
        href="/groups/add"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Novo Grupo
      </Link>
    </div>
  );
}
