import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [shouldFade, setShouldFade] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setShouldFade(true);
    }, 2000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background ${
        shouldFade ? "animate-fade-out" : ""
      }`}
    >
      <h1 className="text-5xl font-light tracking-tight text-foreground">
        AI Content Generator
      </h1>
    </div>
  );
};

export default SplashScreen;
