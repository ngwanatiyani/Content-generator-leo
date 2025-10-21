import { useState } from "react";
import { Github } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Octokit } from "@octokit/rest";

interface GitHubIntegrationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GitHubIntegration({ open, onOpenChange }: GitHubIntegrationProps) {
  const [token, setToken] = useState("");
  const [repoOwner, setRepoOwner] = useState("");
  const [repoName, setRepoName] = useState("");
  const [readmeContent, setReadmeContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!token || !repoOwner || !repoName || !readmeContent) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const octokit = new Octokit({ auth: token });

      // Check if README.md already exists
      let sha: string | undefined;
      try {
        const { data } = await octokit.repos.getContent({
          owner: repoOwner,
          repo: repoName,
          path: "README.md",
        });
        if ("sha" in data) {
          sha = data.sha;
        }
      } catch (error) {
        // File doesn't exist, which is fine
      }

      // Create or update README.md
      await octokit.repos.createOrUpdateFileContents({
        owner: repoOwner,
        repo: repoName,
        path: "README.md",
        message: sha ? "Update README.md" : "Create README.md",
        content: btoa(readmeContent),
        ...(sha && { sha }),
      });

      toast({
        title: "Success!",
        description: "README.md has been posted to your GitHub repository",
      });

      onOpenChange(false);
      setReadmeContent("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to post to GitHub",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            GitHub Integration
          </DialogTitle>
          <DialogDescription>
            Post your code as a README file to your GitHub repository
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="token">GitHub Personal Access Token</Label>
            <Input
              id="token"
              type="password"
              placeholder="ghp_xxxxxxxxxxxxx"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Create a token at GitHub Settings → Developer settings → Personal access tokens
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="owner">Repository Owner</Label>
              <Input
                id="owner"
                placeholder="username"
                value={repoOwner}
                onChange={(e) => setRepoOwner(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="repo">Repository Name</Label>
              <Input
                id="repo"
                placeholder="my-repo"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">README Content</Label>
            <Textarea
              id="content"
              placeholder="# My Project&#10;&#10;Your README content here..."
              value={readmeContent}
              onChange={(e) => setReadmeContent(e.target.value)}
              rows={12}
              className="font-mono text-sm"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post to GitHub"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
