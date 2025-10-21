import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface OutputAreaProps {
  content: string;
  type: "text" | "image" | "code";
  isLoading: boolean;
  language?: string;
}

const OutputArea = ({ content, type, isLoading, language }: OutputAreaProps) => {
  if (isLoading) {
    return (
      <Card className="flex min-h-[300px] items-center justify-center rounded-xl border-border p-8">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Generating...</p>
        </div>
      </Card>
    );
  }

  if (!content) {
    return (
      <Card className="flex min-h-[300px] items-center justify-center rounded-xl border-border p-8">
        <p className="text-muted-foreground">Your results will appear here</p>
      </Card>
    );
  }

  return (
    <Card className="min-h-[300px] rounded-xl border-border p-8">
      {type === "image" ? (
        <div className="flex items-center justify-center">
          <img
            src={content}
            alt="Generated"
            className="max-h-[500px] rounded-lg shadow-lg"
          />
        </div>
      ) : type === "code" ? (
        <pre className="overflow-x-auto rounded-lg bg-secondary p-4">
          <code className="text-sm">
            {language && (
              <div className="mb-2 text-xs text-muted-foreground">
                {language}
              </div>
            )}
            {content}
          </code>
        </pre>
      ) : (
        <div className="prose prose-gray max-w-none">
          <p className="whitespace-pre-wrap text-foreground">{content}</p>
        </div>
      )}
    </Card>
  );
};

export default OutputArea;
