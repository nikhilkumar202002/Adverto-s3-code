import Container from "../components/common/Container";

const pulse = "animate-pulse bg-white/[0.07] motion-reduce:animate-none";

export default function PortfolioPageSkeleton() {
  return (
    <section
      className="relative min-h-screen bg-[#050505] pb-24 pt-32 text-white md:pb-32 md:pt-40"
      role="status"
      aria-label="Loading portfolio"
      aria-busy="true"
    >
      <span className="sr-only">Loading portfolio</span>
      <Container>
        <div className="mb-20 md:mb-28">
          <div className={`mb-4 h-4 w-32 rounded-full ${pulse}`} />
          <div className={`mb-3 h-14 w-full max-w-[780px] rounded-xl md:h-20 ${pulse}`} />
          <div className={`mb-8 h-14 w-3/5 max-w-[560px] rounded-xl md:h-20 ${pulse}`} />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
            <div className={`aspect-video rounded-[20px] lg:col-span-3 ${pulse}`} />
            <div className={`aspect-[9/16] rounded-[20px] lg:col-span-1 ${pulse}`} />
          </div>
        </div>

        <div className="mb-14">
          <div className={`mb-4 h-4 w-28 rounded-full ${pulse}`} />
          <div className={`mb-3 h-14 w-full max-w-[720px] rounded-xl md:h-20 ${pulse}`} />
          <div className={`h-14 w-3/5 max-w-[520px] rounded-xl md:h-20 ${pulse}`} />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }, (_, index) => (
            <div
              key={index}
              className={`aspect-4/3 rounded-[20px] border border-white/10 ${pulse}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
