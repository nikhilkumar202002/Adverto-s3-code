import Container from "../components/common/Container";

const pulse = "animate-pulse bg-white/[0.07] motion-reduce:animate-none";

function ContactCardSkeleton({ tall = false }: { tall?: boolean }) {
  return (
    <div
      className={`rounded-[20px] border border-white/10 bg-[#0A0A0A] p-6 md:p-8 ${
        tall ? "min-h-[250px]" : "min-h-[150px]"
      }`}
    >
      <div className={`mb-8 h-12 w-12 rounded-[20px] ${pulse}`} />
      <div className={`mb-3 h-3 w-20 rounded-full ${pulse}`} />
      <div className={`h-6 w-4/5 rounded-full ${pulse}`} />
      {tall && <div className={`mt-3 h-4 w-full rounded-full ${pulse}`} />}
    </div>
  );
}

export default function ContactPageSkeleton() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#050505] pt-32 pb-24 text-white md:pt-36 md:pb-28 lg:pt-40 lg:pb-32"
      role="status"
      aria-label="Loading contact page"
      aria-busy="true"
    >
      <span className="sr-only">Loading contact page</span>
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className={`mb-5 h-4 w-36 rounded-full ${pulse}`} />
            <div className={`h-12 w-full max-w-[760px] rounded-xl md:h-20 ${pulse}`} />
          </div>
          <div className="space-y-3 md:col-span-4">
            <div className={`h-4 w-full rounded-full ${pulse}`} />
            <div className={`h-4 w-11/12 rounded-full ${pulse}`} />
            <div className={`h-4 w-3/4 rounded-full ${pulse}`} />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-14 lg:mt-16 lg:grid-cols-12">
          <div className="grid grid-cols-1 gap-5 lg:col-span-5">
            <ContactCardSkeleton />
            <ContactCardSkeleton />
            <ContactCardSkeleton tall />
            <ContactCardSkeleton />
          </div>

          <div className="grid grid-cols-1 gap-5 lg:col-span-7">
            <div className="rounded-[20px] border border-white/10 bg-[#0A0A0A] p-6 md:p-8">
              <div className="mb-10 flex items-start justify-between gap-6">
                <div className="w-full max-w-sm">
                  <div className={`mb-3 h-3 w-28 rounded-full ${pulse}`} />
                  <div className={`h-10 w-full rounded-lg ${pulse}`} />
                </div>
                <div className={`hidden h-12 w-12 shrink-0 rounded-[20px] md:block ${pulse}`} />
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {[0, 1, 2, 3].map((item) => (
                  <div key={item}>
                    <div className={`mb-2 h-3 w-16 rounded-full ${pulse}`} />
                    <div className={`h-14 w-full rounded-[20px] ${pulse}`} />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <div className={`mb-2 h-3 w-28 rounded-full ${pulse}`} />
                  <div className={`h-48 w-full rounded-[20px] ${pulse}`} />
                </div>
                <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
                  <div className={`h-4 w-full max-w-[360px] rounded-full ${pulse}`} />
                  <div className={`h-14 w-full rounded-[20px] md:w-44 ${pulse}`} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <ContactCardSkeleton key={item} tall />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
