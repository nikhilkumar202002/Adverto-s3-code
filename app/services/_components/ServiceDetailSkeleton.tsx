import Container from "../../components/common/Container";

const pulse = "animate-pulse bg-white/[0.07] motion-reduce:animate-none";

export default function ServiceDetailSkeleton() {
  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-black text-white"
      role="status"
      aria-label="Loading service details"
      aria-busy="true"
    >
      <span className="sr-only">Loading service details</span>

      <section className="relative flex min-h-[680px] items-end overflow-hidden border-b border-white/5 pb-12 pt-32 md:pb-16 min-[1320px]:min-h-screen">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute right-[-16%] top-[-20%] h-[620px] w-[620px] rounded-full bg-[#0000FF]/20 blur-[130px]" />
        <Container className="relative z-10">
          <div className={`mb-10 h-4 w-24 rounded-full ${pulse}`} />
          <div className={`mb-5 h-4 w-40 rounded-full ${pulse}`} />
          <div className={`mb-3 h-16 w-full max-w-[900px] rounded-xl md:h-24 ${pulse}`} />
          <div className={`h-16 w-3/5 max-w-[640px] rounded-xl md:h-24 ${pulse}`} />
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-12 xl:items-start">
            <div className="overflow-hidden rounded-[20px] border border-white/10 bg-black xl:col-span-8">
              <div className="border-b border-white/10 p-5 md:p-8">
                <div className={`mb-5 h-4 w-32 rounded-full ${pulse}`} />
                <div className={`mb-3 h-14 w-full max-w-[620px] rounded-xl md:h-20 ${pulse}`} />
                <div className={`mb-8 h-14 w-4/5 max-w-[520px] rounded-xl md:h-20 ${pulse}`} />
                <div className={`mb-3 h-4 w-full max-w-[680px] rounded-full ${pulse}`} />
                <div className={`h-4 w-3/4 max-w-[520px] rounded-full ${pulse}`} />
              </div>

              <div className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2">
                {Array.from({ length: 8 }, (_, index) => (
                  <div key={index} className="min-h-[180px] bg-black p-5 md:p-7">
                    <div className="mb-10 flex items-center justify-between">
                      <div className={`h-4 w-8 rounded-full ${pulse}`} />
                      <div className={`h-9 w-9 rounded-full ${pulse}`} />
                    </div>
                    <div className={`h-8 w-4/5 rounded-lg ${pulse}`} />
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[20px] border border-white/10 bg-[#080808] p-5 md:p-8 xl:col-span-4">
              <div className="mb-8 flex items-start justify-between gap-6">
                <div className="w-full">
                  <div className={`mb-3 h-3 w-28 rounded-full ${pulse}`} />
                  <div className={`h-12 w-4/5 rounded-xl ${pulse}`} />
                </div>
                <div className={`h-12 w-12 shrink-0 rounded-full ${pulse}`} />
              </div>
              <div className={`mb-3 h-4 w-full rounded-full ${pulse}`} />
              <div className={`mb-8 h-4 w-3/4 rounded-full ${pulse}`} />
              <div className={`mb-10 h-12 w-full rounded-full ${pulse}`} />
              <div className="border-t border-white/10 pt-6">
                <div className={`mb-4 h-3 w-24 rounded-full ${pulse}`} />
                <div className="space-y-2">
                  {[0, 1, 2, 3].map((item) => (
                    <div key={item} className={`h-12 w-full rounded-[20px] ${pulse}`} />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
