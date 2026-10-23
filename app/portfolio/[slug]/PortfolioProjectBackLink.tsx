"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  consumePortfolioEntry,
  enableNativeBackRestoration,
} from "../../components/common/scrollRestoration";

export default function PortfolioProjectBackLink() {
  const router = useRouter();

  const returnToPreviousView = useCallback(() => {
    const hasSameOriginReferrer =
      document.referrer.length > 0 &&
      new URL(document.referrer).origin === window.location.origin;

    const enteredFromPortfolioLink = consumePortfolioEntry();

    if (
      window.history.length > 1 &&
      (enteredFromPortfolioLink || hasSameOriginReferrer)
    ) {
      enableNativeBackRestoration();
      router.back();
      return;
    }

    router.push("/portfolio", { scroll: false });
  }, [router]);

  return (
    <button
      type="button"
      onClick={returnToPreviousView}
      className="mb-6 inline-flex cursor-pointer items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
    >
      <ArrowLeft size={16} />
      Portfolio
    </button>
  );
}
