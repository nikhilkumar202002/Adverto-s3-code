export default function Loading() {
  return (
    <section
      className="flex min-h-[100svh] items-center justify-center bg-black px-6 text-white"
      aria-label="Loading page"
    >
      <div className="h-10 w-10 animate-spin rounded-full border border-white/20 border-t-[#0000FF]" />
    </section>
  );
}
