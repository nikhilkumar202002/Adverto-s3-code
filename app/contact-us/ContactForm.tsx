import { Send } from "lucide-react";
import CustomSelect from "../components/common/CustomSelect";

const projectTypes = [
  "Branding",
  "Advertising Campaign",
  "Video Production",
  "Social Media",
  "Website / Digital",
  "Full Launch",
];

const budgetRanges = [
  "Under 50k",
  "Under 1 lakh",
  "1 lakh to 3 lakh",
  "3 lakh to 7 lakh",
  "7 lakh plus",
];

export default function ContactForm() {
  return (
    <form
      action="mailto:connectadverto@gmail.com"
      method="post"
      encType="text/plain"
      className="grid grid-cols-1 gap-5 md:grid-cols-2"
    >
      <label className="block">
        <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-white/35">Name</span>
        <input name="name" type="text" required maxLength={100} autoComplete="name" className="h-14 w-full rounded-[20px] border border-white/10 bg-black/30 px-4 text-[16px] text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#0000FF]" placeholder="Your name" />
      </label>

      <label className="block">
        <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-white/35">Email</span>
        <input name="email" type="email" required maxLength={200} autoComplete="email" className="h-14 w-full rounded-[20px] border border-white/10 bg-black/30 px-4 text-[16px] text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#0000FF]" placeholder="you@example.com" />
      </label>

      <CustomSelect label="Service" name="service" placeholder="Select a service" options={projectTypes} />
      <CustomSelect label="Budget" name="budget" placeholder="Select a range" options={budgetRanges} />

      <label className="block md:col-span-2">
        <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-white/35">Project Details</span>
        <textarea name="message" required maxLength={5000} rows={7} className="w-full resize-none rounded-[20px] border border-white/10 bg-black/30 p-4 text-[16px] leading-relaxed text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#0000FF]" placeholder="Tell us about the goal, timeline, audience, and deliverables." />
      </label>

      <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[420px] text-sm leading-relaxed text-white/40">
          Submitting opens your email application with the project details.
        </p>
        <button type="submit" className="group inline-flex h-14 items-center justify-center gap-3 rounded-[20px] bg-[#0000FF] px-7 text-[14px] font-medium tracking-wide text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,0,255,0.45)]">
          Send Inquiry
          <Send size={18} strokeWidth={1.8} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
