export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="px-4 py-2 rounded bg-[#0B0B42] text-white hover:bg-[#3E6994] disabled:opacity-50"
    >
      {children}
    </button>
  );
}
