import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TabButton from "./TabButton";
import PromptArea from "./PromptArea";
import OutputArea from "./OutputArea";
import { Sparkles, Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type TabType = "content" | "image" | "code";

const ContentGenerator = () => {
  const [activeTab, setActiveTab] = useState<TabType>("content");
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setOutput("");

    try {
      if (activeTab === "content") {
        console.log("Calling generate-content function...");
        const { data, error } = await supabase.functions.invoke("generate-content", {
          body: { prompt },
        });

        console.log("Response:", { data, error });
        
        if (error) {
          console.error("Function error:", error);
          throw error;
        }
        
        if (!data || !data.content) {
          throw new Error("No content received from API");
        }
        
        setOutput(data.content);
      } else if (activeTab === "image") {
        console.log("Calling generate-image function...");
        const { data, error } = await supabase.functions.invoke("generate-image", {
          body: { prompt },
        });

        console.log("Response:", { data, error });
        
        if (error) {
          console.error("Function error:", error);
          throw error;
        }
        
        if (!data || !data.imageUrl) {
          throw new Error("No image received from API");
        }
        
        setOutput(data.imageUrl);
      } else {
        console.log("Calling generate-code function...");
        const { data, error } = await supabase.functions.invoke("generate-code", {
          body: { prompt, language },
        });

        console.log("Response:", { data, error });
        
        if (error) {
          console.error("Function error:", error);
          throw error;
        }
        
        if (!data || !data.code) {
          throw new Error("No code received from API");
        }
        
        setOutput(data.code);
      }

      toast.success("Content generated successfully!");
    } catch (error: any) {
      console.error("Generation error:", error);
      console.error("Error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      
      if (error.message?.includes("rate limit") || error.message?.includes("429")) {
        toast.error("Rate limit exceeded. Please try again later.");
      } else if (error.message?.includes("payment") || error.message?.includes("402")) {
        toast.error("Payment required. Please add credits to your workspace.");
      } else {
        toast.error("Failed to generate content. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard!");
  };

  const handleDownload = () => {
    if (activeTab === "image") {
      const link = document.createElement("a");
      link.href = output;
      link.download = "generated-image.png";
      link.click();
      toast.success("Image download started!");
    } else {
      const blob = new Blob([output], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = activeTab === "code" ? `code.${language}` : "content.txt";
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Download started!");
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-12">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-light tracking-tight text-foreground">
          AI Content Generator
        </h1>
        <p className="text-muted-foreground">
          Generate content, images, and code with AI
        </p>
      </div>

      <div className="flex justify-center gap-2 rounded-xl bg-card p-2 shadow-sm">
        <TabButton
          active={activeTab === "content"}
          onClick={() => setActiveTab("content")}
        >
          Generate Content
        </TabButton>
        <TabButton
          active={activeTab === "image"}
          onClick={() => setActiveTab("image")}
        >
          Generate Image
        </TabButton>
        <TabButton
          active={activeTab === "code"}
          onClick={() => setActiveTab("code")}
        >
          Generate Code
        </TabButton>
      </div>

      <div className="space-y-4">
        <PromptArea
          value={prompt}
          onChange={setPrompt}
          placeholder={
            activeTab === "content"
              ? "Describe the content you want to generate..."
              : activeTab === "image"
              ? "Describe the image you want to create..."
              : "Describe the code you want to generate..."
          }
        />

        <div className="flex items-center gap-3">
          {activeTab === "code" && (
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px] rounded-lg">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="php">PHP</SelectItem>
              </SelectContent>
            </Select>
          )}
          <Button
            onClick={handleGenerate}
            disabled={isLoading}
            className="ml-auto rounded-lg px-6"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Generate
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {output && (
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        )}
        <OutputArea
          content={output}
          type={activeTab === "image" ? "image" : activeTab === "code" ? "code" : "text"}
          isLoading={isLoading}
          language={activeTab === "code" ? language : undefined}
        />
      </div>
    </div>
  );
};

export default ContentGenerator;
