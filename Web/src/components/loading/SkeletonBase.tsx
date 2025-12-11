export function SkeletonBase({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-600 rounded ${className}`}
    />
  );
}