export const runAfterPageReady = (
  callback: () => void,
  options: { delayMs?: number; waitForFonts?: boolean; waitForImages?: boolean } = {},
) => {
  const { waitForFonts = true, waitForImages = true } = options;

  const run = () => {
    let cancelled = false;

    const execute = () => {
      if (cancelled) return;

      callback();

      window.requestAnimationFrame(() => {
        if (cancelled) return;

        callback();
      });
    };

    const waitForDocumentAssets = async () => {
      if (document.readyState === "loading") {
        await new Promise<void>((resolve) => {
          const onLoad = () => {
            window.removeEventListener("load", onLoad);
            resolve();
          };

          window.addEventListener("load", onLoad, { once: true });
        });
      }

      if (waitForImages) {
        const images = Array.from(document.images);

        if (images.length > 0) {
          await Promise.allSettled(
            images.map((image) => {
              if (image.complete && image.naturalWidth > 0) {
                return Promise.resolve();
              }

              return new Promise<void>((resolve) => {
                const finish = () => {
                  image.removeEventListener("load", finish);
                  image.removeEventListener("error", finish);
                  resolve();
                };

                image.addEventListener("load", finish, { once: true });
                image.addEventListener("error", finish, { once: true });
              });
            }),
          );
        }
      }

      if (
        waitForFonts &&
        "fonts" in document &&
        typeof document.fonts?.ready?.then === "function"
      ) {
        await document.fonts.ready.catch(() => undefined);
      }

      await new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => resolve());
      });
    };

    void waitForDocumentAssets().then(() => {
      if (!cancelled) execute();
    });

    return () => {
      cancelled = true;
    };
  };

  return run();
};
