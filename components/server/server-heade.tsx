"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, LogOut, Plus, Settings, Trash, UserPlus, Users } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
    server : ServerWithMembersWithProfiles;
    role?: MemberRole;
};

export const ServerHeader = ({
    server,
    role
}: ServerHeaderProps ) => {
    const { onOpen } = useModal();

    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="focus:outline-none"
                asChild>
                <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/100
                                    dark:hover:bg-zinc-700/50 transition">
                                        {server.name}
                                        <ChevronDown className="h-5 w-5 ml-auto"/>
                </button>
            </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
                        {isModerator && (
                            <DropdownMenuItem 
                                onClick={() => onOpen("invite", {server})}
                            className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
                                <UserPlus className="h-4 w-4 ml-auto" />
                                <span className="ml-1">Invite People</span>
                            </DropdownMenuItem>
                        )}

                        {isAdmin && (
                            <DropdownMenuItem 
                                onClick={() => onOpen("editServer", {server})}
                                className="px-3 py-2 text-sm cursor-pointer">
                                <Settings className="h-4 w-4 ml-auto" />
                                <span className="ml-1">Server Settings</span>
                            </DropdownMenuItem>
                        )}

                        {isAdmin && (
                            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                                <Users className="h-4 w-4 ml-auto" />
                                <span className="ml-1">Manage Members</span>
                            </DropdownMenuItem>
                        )}

                        {isModerator && (
                            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                                <Plus className="h-4 w-4 ml-auto" />
                                <span className="ml-1">Create Channel</span>
                            </DropdownMenuItem>
                        )}

                        {isModerator && (
                            <DropdownMenuSeparator />
                        )}

                        {isAdmin && (
                            <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
                                <Trash className="h-4 w-4 ml-auto" />
                                Delete Server
                            </DropdownMenuItem>
                        )}

                        {!isAdmin && (
                            <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
                                <LogOut className="h-4 w-4 ml-auto" />
                                Leave Server
                            </DropdownMenuItem>
                        )}
                </DropdownMenuContent>
        </DropdownMenu>
    )
}