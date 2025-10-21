import { Textarea } from "@/components/ui/textarea";

interface PromptAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const PromptArea = ({ value, onChange, placeholder }: PromptAreaProps) => {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Enter your prompt here..."}
      className="min-h-[150px] resize-none rounded-xl border-border bg-card p-4 text-base focus-visible:ring-primary"
    />
  );
};

export default PromptArea;
