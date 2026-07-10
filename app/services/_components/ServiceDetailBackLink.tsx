"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ServiceDetailBackLink() {
  const router = useRouter();

  const returnToPreviousView = useCallback(() => {
    const hasSameOriginReferrer =
      document.referrer.length > 0 &&
      new URL(document.referrer).origin === window.location.origin;

    if (window.history.length > 1 && hasSameOriginReferrer) {
      router.back();
      return;
    }

    router.push("/services", { scroll: false });
  }, [router]);

  return (
    <button
      type="button"
      className="mb-8 inline-flex cursor-pointer items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
      onClick={returnToPreviousView}
    >
      <ArrowLeft size={16} />
      Services
    </button>
  );
}
