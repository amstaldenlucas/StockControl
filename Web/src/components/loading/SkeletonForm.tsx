import { SkeletonBase } from "./SkeletonBase";

export default function SkeletonForm() {
  return (
    <div className="p-6 space-y-6">
        <SkeletonBase className="h-6 w-80" />
        <SkeletonBase className="h-20 w-100" />

        <SkeletonBase className="h-6 w-75" />
        <SkeletonBase className="h-20 w-full" />
    </div>
  );
}
