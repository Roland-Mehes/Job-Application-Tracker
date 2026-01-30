'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { LogoutBtn } from './LogoutButton';

interface UserDropdownMenuProps {
  session: {
    user: {
      name: string;
      email: string;
    };
  };
}

const UserDropdownMenu: React.FC<UserDropdownMenuProps> = ({ session }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-9 w-9 rounded-full p-0 focus-visible:ring-2"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                {session.user?.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 rounded-xl p-1 " align="end">
          <DropdownMenuLabel className="px-3 py-2">
            <div className="flex flex-col space-y-0.5">
              <span className="text-xs text-muted-foreground">
                {session.user.email}
              </span>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="h-px bg-gray-200 dark:bg-white/10" />

          <DropdownMenuGroup className="flex flex-col">
            <DropdownMenuItem asChild>
              <Link className="w-full " href="/">
                Home
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link className="w-full" href="/dashboard">
                Dashboard
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* <SignOutButton /> */}
          <DropdownMenuItem asChild>
            <LogoutBtn />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserDropdownMenu;
