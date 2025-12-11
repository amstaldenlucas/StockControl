import { SkeletonBase } from "./SkeletonBase";

interface SkeletonListProps {
  numberLines?: number;
}


export default function SkeletonList({ numberLines }: SkeletonListProps) {
  return (
    <div className="p-6 space-y-3">
      {Array(numberLines ?? 5).fill(0).map((_,i) => (
        <SkeletonBase key={i} className="h-6 w-full" />
      ))}
    </div>
  );
}
