import { Button } from "@/components/ui/button";

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton = ({ active, onClick, children }: TabButtonProps) => {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      onClick={onClick}
      className="rounded-lg px-6 py-2 transition-all"
    >
      {children}
    </Button>
  );
};

export default TabButton;
