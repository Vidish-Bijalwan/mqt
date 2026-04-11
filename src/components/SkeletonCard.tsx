const SkeletonCard = () => (
  <div className="bg-card rounded-xl overflow-hidden border border-border animate-pulse">
    {/* Image placeholder */}
    <div className="aspect-[16/10] bg-muted" />
    {/* Content */}
    <div className="p-4 space-y-3">
      <div className="h-3 bg-muted rounded w-1/3" />
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-3 bg-muted rounded w-full" />
      <div className="h-3 bg-muted rounded w-2/3" />
      <div className="flex gap-2 pt-2">
        <div className="h-9 bg-muted rounded-lg flex-1" />
        <div className="h-9 bg-muted rounded-lg flex-1" />
      </div>
    </div>
  </div>
);

interface SkeletonGridProps {
  count?: number;
}

export const SkeletonGrid = ({ count = 3 }: SkeletonGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonCard;
