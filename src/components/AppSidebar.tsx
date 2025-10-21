import { Plus, Github, MessageSquare, Settings, Code } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface AppSidebarProps {
  onNewChat: () => void;
  onOpenGithub: () => void;
}

export function AppSidebar({ onNewChat, onOpenGithub }: AppSidebarProps) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 py-4">
            {open && "AI Content Generator"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Button
                  onClick={onNewChat}
                  className="w-full justify-start gap-2"
                  variant="ghost"
                >
                  <Plus className="h-4 w-4" />
                  {open && <span>New Chat</span>}
                </Button>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    {open && <span>Chats</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Button
                  onClick={onOpenGithub}
                  className="w-full justify-start gap-2"
                  variant="ghost"
                >
                  <Github className="h-4 w-4" />
                  {open && <span>GitHub Integration</span>}
                </Button>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" className="gap-2">
                    <Code className="h-4 w-4" />
                    {open && <span>Code Export</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" className="gap-2">
                    <Settings className="h-4 w-4" />
                    {open && <span>Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
