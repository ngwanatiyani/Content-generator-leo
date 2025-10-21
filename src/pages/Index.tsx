import { useState } from "react";
import SplashScreen3D from "@/components/SplashScreen3D";
import ContentGenerator from "@/components/ContentGenerator";
import { AppSidebar } from "@/components/AppSidebar";
import { GitHubIntegration } from "@/components/GitHubIntegration";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [githubDialogOpen, setGithubDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleNewChat = () => {
    toast({
      title: "New Chat",
      description: "Starting a new conversation...",
    });
    // Reset the content generator or navigate to new chat
    window.location.reload();
  };

  if (showSplash) {
    return <SplashScreen3D onComplete={() => setShowSplash(false)} />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar 
          onNewChat={handleNewChat}
          onOpenGithub={() => setGithubDialogOpen(true)}
        />
        
        <main className="flex-1 flex flex-col">
          <header className="h-14 border-b flex items-center px-4 gap-2">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">AI Content Generator</h1>
          </header>
          
          <div className="flex-1">
            <ContentGenerator />
          </div>
        </main>

        <GitHubIntegration 
          open={githubDialogOpen}
          onOpenChange={setGithubDialogOpen}
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;
