import Container from "../components/common/Container";

const pulse = "animate-pulse bg-white/[0.07] motion-reduce:animate-none";

export default function ServicePageSkeleton() {
  return (
    <div
      className="relative min-h-screen bg-[#050505] text-white"
      role="status"
      aria-label="Loading services page"
      aria-busy="true"
    >
      <span className="sr-only">Loading services page</span>

      <section className="relative flex min-h-170 items-end overflow-hidden border-b border-white/5 bg-[#080808] pb-10 min-[1320px]:min-h-screen">
        <div className={`absolute inset-0 ${pulse}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/40" />
        <Container className="relative z-10">
          <div className={`mb-4 h-4 w-32 rounded-full ${pulse}`} />
          <div className={`mb-3 h-14 w-full max-w-[900px] rounded-xl md:h-20 ${pulse}`} />
          <div className={`h-14 w-3/4 max-w-[720px] rounded-xl md:h-20 ${pulse}`} />
        </Container>
      </section>

      <section className="py-16 sm:py-20 md:py-24 lg:py-32">
        <Container>
          <div className="mb-7">
            <div className={`mb-3 h-4 w-32 rounded-full ${pulse}`} />
            <div className={`h-12 w-full max-w-[900px] rounded-xl md:h-16 ${pulse}`} />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="flex min-h-90 flex-col rounded-[20px] border border-white/10 bg-[#0000cc] p-5 sm:min-h-97.5 sm:p-6 md:min-h-107.5 md:p-7 lg:min-h-115 lg:p-8"
              >
                <div className="flex items-start justify-between">
                  <div className={`h-12 w-12 rounded-sm bg-white/15 ${pulse}`} />
                  <div className={`h-10 w-12 rounded-lg bg-white/15 ${pulse}`} />
                </div>
                <div className="mt-auto">
                  <div className={`mb-4 h-8 w-4/5 rounded-lg bg-white/15 ${pulse}`} />
                  <div className={`mb-3 h-4 w-full rounded-full bg-white/15 ${pulse}`} />
                  <div className={`h-4 w-2/3 rounded-full bg-white/15 ${pulse}`} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
