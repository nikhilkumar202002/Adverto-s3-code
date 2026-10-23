import Container from "../components/common/Container";

const pulse = "animate-pulse bg-white/[0.07] motion-reduce:animate-none";

export default function TeamPageSkeleton() {
  return (
    <div
      className="relative min-h-screen bg-[#050505] text-white"
      role="status"
      aria-label="Loading team page"
      aria-busy="true"
    >
      <span className="sr-only">Loading team page</span>

      <div className={`aspect-[4/5] w-full md:aspect-video ${pulse}`} />

      <section className="py-24 md:py-32">
        <Container>
          <div className="mb-8 max-w-[720px]">
            <div className={`mb-4 h-4 w-32 rounded-full ${pulse}`} />
            <div className={`mb-3 h-12 w-full rounded-xl md:h-16 ${pulse}`} />
            <div className={`h-12 w-4/5 rounded-xl md:h-16 ${pulse}`} />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 9 }, (_, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A] ${
                  index < 2 ? "lg:col-span-2" : ""
                }`}
              >
                <div className={`aspect-[4/5] w-full ${pulse}`} />
                <div className="p-5 md:p-7">
                  <div className={`mb-3 h-7 w-2/5 rounded-full ${pulse}`} />
                  <div className={`h-4 w-3/4 rounded-full ${pulse}`} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
