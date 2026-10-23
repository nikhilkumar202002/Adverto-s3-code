import Container from "../components/common/Container";

const pulse = "animate-pulse bg-white/[0.07] motion-reduce:animate-none";

export default function AboutPageSkeleton() {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#030303] text-white"
      role="status"
      aria-label="Loading about page"
      aria-busy="true"
    >
      <span className="sr-only">Loading about page</span>

      <section className="flex min-h-170 items-end bg-[linear-gradient(135deg,#07000c,#1018cf_70%,#2423ff)] pb-10 min-[1320px]:min-h-screen">
        <Container>
          <div className={`mb-4 h-4 w-32 rounded-full ${pulse}`} />
          <div className={`mb-3 h-14 w-full max-w-[920px] rounded-xl md:h-20 ${pulse}`} />
          <div className={`h-14 w-3/4 max-w-[760px] rounded-xl md:h-20 ${pulse}`} />
        </Container>
      </section>

      <section className="flex min-h-screen items-center py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className={`h-4 w-32 rounded-full lg:col-span-3 ${pulse}`} />
            <div className="space-y-5 lg:col-span-9">
              {["full", "11/12", "full", "4/5", "11/12", "3/4"].map((width, index) => (
                <div key={index} className={`h-8 rounded-lg md:h-10 ${pulse} ${width === "full" ? "w-full" : width === "11/12" ? "w-11/12" : width === "4/5" ? "w-4/5" : "w-3/4"}`} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-white/5 py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {["lg:col-span-7", "lg:col-span-5"].map((span) => (
              <div key={span} className={`min-h-[520px] rounded-[20px] border border-white/10 bg-[#080808] p-6 md:p-10 ${span}`}>
                <div className={`mb-5 h-4 w-32 rounded-full ${pulse}`} />
                <div className={`mb-4 h-14 w-full rounded-xl ${pulse}`} />
                <div className={`mb-8 h-14 w-4/5 rounded-xl ${pulse}`} />
                <div className={`mb-3 h-4 w-full rounded-full ${pulse}`} />
                <div className={`mb-3 h-4 w-11/12 rounded-full ${pulse}`} />
                <div className={`h-4 w-3/4 rounded-full ${pulse}`} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="overflow-hidden py-24">
        <div className="mb-10 px-6 md:px-10 lg:px-[60px] xl:px-[80px]">
          <div className={`mb-3 h-14 w-full max-w-[720px] rounded-xl md:h-20 ${pulse}`} />
        </div>
        <div className="flex gap-4 overflow-hidden px-6">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className={`aspect-[4/3] w-[300px] shrink-0 rounded-[20px] sm:w-[360px] md:w-[460px] ${pulse}`} />
          ))}
        </div>
      </section>

      <section className="border-t border-white/5 bg-[#050505] py-20 md:py-24 lg:py-32">
        <Container>
          <div className={`mx-auto mb-16 h-14 w-full max-w-[520px] rounded-xl ${pulse}`} />
          <div className="grid grid-cols-3 gap-8 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 18 }, (_, index) => (
              <div key={index} className={`mx-auto h-14 w-full max-w-28 rounded-lg ${pulse}`} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
