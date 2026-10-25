export function Button({ children, onClick, secondary = false, disabled = false }) {
  return (
    <button onClick={onClick} disabled={disabled} className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${secondary ? "bg-zinc-800 hover:bg-zinc-700" : "bg-red-600 hover:bg-red-500"} disabled:cursor-not-allowed disabled:opacity-40`}>
      {children}
    </button>
  );
}

export function Input(props) {
  return <input {...props} className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-red-500" />;
}

export function Options({ options, value, onChange }) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {options.map((option) => (
        <button key={option} onClick={() => onChange(option)} className={`rounded-xl border p-5 text-left ${value === option ? "border-red-500 bg-red-500/10" : "border-zinc-800 bg-zinc-900"}`}>
          {option}
        </button>
      ))}
    </div>
  );
}
