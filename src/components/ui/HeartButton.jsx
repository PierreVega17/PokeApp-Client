import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

export default function HeartButton({ active = false, onClick, size = "md" }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="p-2 rounded-full transition hover:bg-red-100 active:scale-125"
    >
      {active ? (
        <HeartSolid className={`${sizes[size]} text-red-500`} />
      ) : (
        <HeartOutline className={`${sizes[size]} text-slate-400 hover:text-red-400`} />
      )}
    </button>
  );
}
