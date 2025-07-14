import { getAllPosts } from "@/lib/server-utils";
import Link from "next/link";
import OmnissaLogo from "./omnissa-logo";
import PostSearchBox from "./post-search-box";
import { Button } from "./ui/button";
import { Bell, PenTool } from "lucide-react";

export async function Header() {
  const posts = await getAllPosts();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-4">
          <OmnissaLogo className="text-foreground" width={178} height={32} />
          <div className="w-[1px] h-11 bg-border"></div>
          <span className="nav-title">Engineering</span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <PostSearchBox posts={posts} />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Link href="https://www.omnissa.com/about-us/" target="_blank">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center space-x-2"
            >
              <span>About</span>
            </Button>
          </Link>

          <Link href="https://www.omnissa.com/careers/" target="_blank">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center space-x-2"
            >
              <span>Careers</span>
            </Button>
          </Link>

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>
    </header>
  );
}
