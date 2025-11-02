import { useEffect, useState } from "react";

export default function LoadingDots({
  loadingPercent,
}: {
  loadingPercent: number;
}) {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    if (loadingPercent >= 100) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? "." : prev + "."));
    }, 250);

    return () => clearInterval(interval);
  }, [loadingPercent]);

  if (loadingPercent >= 100) return null;

  return <>{dots}</>;
}
