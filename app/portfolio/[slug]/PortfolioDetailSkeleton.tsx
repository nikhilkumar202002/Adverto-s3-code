import Container from "../../components/common/Container";

const pulse = "animate-pulse bg-white/[0.07] motion-reduce:animate-none";

export default function PortfolioDetailSkeleton() {
  return (
    <article className="min-h-screen bg-[#050505] pb-24 pt-28 text-white md:pb-32 md:pt-36" role="status" aria-label="Loading project" aria-busy="true">
      <span className="sr-only">Loading project</span>
      <Container>
        <div className={`mb-8 h-4 w-24 rounded-full ${pulse}`} />
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className={`h-20 w-full rounded-xl ${pulse}`} />
          <div className="space-y-3">
            <div className={`h-4 w-full rounded-full ${pulse}`} />
            <div className={`h-4 w-4/5 rounded-full ${pulse}`} />
          </div>
        </div>
        <div className={`h-[100svh] min-h-[520px] w-full rounded-[20px] max-[1380px]:h-[70svh] ${pulse}`} />
        <div className="mt-2 grid grid-cols-2 gap-2 xl:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className={`h-28 rounded-[20px] ${item === 2 ? "col-span-2 xl:col-span-1" : ""} ${pulse}`} />
          ))}
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 xl:grid-cols-12">
          <div className="xl:col-span-4">
            <div className={`mb-3 h-4 w-24 rounded-full ${pulse}`} />
            <div className={`h-14 w-4/5 rounded-xl ${pulse}`} />
          </div>
          <div className="space-y-5 xl:col-span-8">
            {[0, 1, 2].map((item) => (
              <div key={item} className={`aspect-4/3 rounded-[20px] ${pulse}`} />
            ))}
          </div>
        </div>
      </Container>
    </article>
  );
}
