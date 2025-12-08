import { Skeleton } from "@/components/Skeleton";

export default function LoadingProducts() {
  return (
    <div className="p-6 space-y-3">
      {Array(5).fill(0).map((_,i) => (
        <Skeleton key={i} className="h-6 w-full" />
      ))}
    </div>
  );
}
