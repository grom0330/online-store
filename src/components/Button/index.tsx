export function Button(p: { text: string; onClick(): void }) {
  return (
    <button
      className="px-4 py-1 block ml-auto text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      onClick={p.onClick}
    >
      {p.text}
    </button>
  )
}
