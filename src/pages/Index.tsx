import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import ContentGenerator from "@/components/ContentGenerator";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <ContentGenerator />
    </div>
  );
};

export default Index;
