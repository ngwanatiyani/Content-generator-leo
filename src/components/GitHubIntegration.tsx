import { useState } from "react";
import { Github, Download, Copy, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface GitHubIntegrationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GitHubIntegration({ open, onOpenChange }: GitHubIntegrationProps) {
  const [readmeContent, setReadmeContent] = useState("# My AI Generated Project\n\n## Description\nAdd your generated content here...\n\n## Generated Content\nPaste your AI-generated content, code, or images here.\n\n## Usage\nDescribe how to use this project.\n");
  const { toast } = useToast();

  const handleDownload = () => {
    const blob = new Blob([readmeContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "README.md";
    link.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: "README.md file has been downloaded",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(readmeContent);
    toast({
      title: "Copied!",
      description: "README content copied to clipboard",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            GitHub Export Guide
          </DialogTitle>
          <DialogDescription>
            Follow these simple steps to upload your content to GitHub
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Instructions Section */}
          <div className="rounded-lg border bg-muted/50 p-4 space-y-3">
            <h3 className="font-semibold text-lg">📋 How to Upload to GitHub</h3>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>
                <strong>Create a GitHub Account</strong> (if you don't have one)
                <br />
                <a 
                  href="https://github.com/signup" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1 ml-4"
                >
                  Sign up at github.com <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <strong>Create a New Repository</strong>
                <br />
                <span className="ml-4">Go to GitHub → Click "+" icon → "New repository" → Name it and create</span>
              </li>
              <li>
                <strong>Download the README.md file</strong> using the button below
              </li>
              <li>
                <strong>Upload to GitHub</strong>
                <br />
                <span className="ml-4">In your repository → Click "Add file" → "Upload files" → Drag README.md → Commit</span>
              </li>
            </ol>
          </div>

          <Separator />

          {/* README Editor */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="readme" className="text-base font-semibold">
                Edit Your README.md Content
              </Label>
              <div className="flex gap-2">
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
                  size="sm"
                  onClick={handleDownload}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download README.md
                </Button>
              </div>
            </div>
            <Textarea
              id="readme"
              value={readmeContent}
              onChange={(e) => setReadmeContent(e.target.value)}
              rows={16}
              className="font-mono text-sm"
              placeholder="# My Project..."
            />
            <p className="text-xs text-muted-foreground">
              💡 Tip: Paste your AI-generated content into this README template, then download and upload to GitHub
            </p>
          </div>

          {/* Quick Links */}
          <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
            <h4 className="font-semibold text-sm">🔗 Quick Links</h4>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                asChild
              >
                <a 
                  href="https://github.com/new" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  Create New Repo <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                asChild
              >
                <a 
                  href="https://docs.github.com/en/get-started/quickstart/create-a-repo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  GitHub Docs <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
