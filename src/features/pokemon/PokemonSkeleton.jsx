export default function PokemonSkeleton() {
  return (
    <div className="bg-gray-200 animate-pulse rounded-lg p-4 w-40 h-44 flex flex-col items-center justify-center gap-2">
      <div className="w-20 h-20 bg-gray-300 rounded-full" />
      <div className="w-24 h-4 bg-gray-300 rounded" />
    </div>
  );
}
