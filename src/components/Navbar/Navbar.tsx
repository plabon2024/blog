"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    LayoutDashboard,
    LogOut,
    MenuIcon,
    ShoppingCart,
    User as UserIcon,
    User,
} from "lucide-react";

import Link from "next/link";
import ModeToggle from "../Theme/ModeToggle";

export default function Navbar() {

    return (
        <section className="py-4 sticky top-0 backdrop-blur-3xl bg-primary/30 z-50">
            <div className="container mx-auto">
                <nav className="flex items-center justify-between px-4">
                    {/* Logo */}
                    <Link href={"/"}>logo</Link>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden lg:block">
                        <NavigationMenuList className="gap-2">
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/"
                                    className="px-4 py-2 rounded-lg hover:bg-muted transition font-semibold"
                                >
                                    Home
                                </NavigationMenuLink>
                            </NavigationMenuItem>
            
                            {"authenticated" === "authenticated" && (
                                <>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink
                                            href="/dashboard"
                                            className="px-4 py-2 rounded-lg hover:bg-muted transition font-semibold"
                                        >
                                            Dashboard
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                   
                                </>
                            )}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Desktop Actions */}
                    <div className="hidden items-center gap-3 lg:flex">
                        <ModeToggle></ModeToggle>

                        {/* User Menu */}
                        {"authenticated" === "authenticated" ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" className="rounded-full">
                                        <User className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <div className="px-2 py-2">
                                        <p className="text-sm font-semibold">name</p>
                                        <p className="text-xs text-muted-foreground">
                                            {/* {data?.user?.email} */}
                                        </p>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard" className="cursor-pointer">
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile" className="cursor-pointer">
                                            <UserIcon className="mr-2 h-4 w-4" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem

                                        className="cursor-pointer text-destructive"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href="/signin">
                                <Button>Sign in</Button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <div className="flex items-center gap-2 lg:hidden">
                        {/* Mobile Cart */}
                        <ModeToggle></ModeToggle>

                        {/* Mobile Menu Sheet */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <MenuIcon className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="max-h-screen overflow-auto">
                                <SheetHeader>
                                    <SheetTitle>logo</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col p-4">
                                    {/* User Info */}
                                    {/* {status === "authenticated" && (
                    <div className="mb-6 p-4 bg-muted rounded-lg">
                      <p className="font-semibold">{data?.user?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {data?.user?.email}
                      </p>
                    </div>
                  )} */}

                                    {/* Navigation Links */}
                                    <div className="flex flex-col gap-4">
                                        <Link
                                            href="/"
                                            className="font-medium py-2 hover:text-primary transition"
                                        >
                                            Home
                                        </Link>
                                        <Link
                                            href="/products"
                                            className="font-medium py-2 hover:text-primary transition"
                                        >
                                            Products
                                        </Link>
                                        {"authenticated" === "authenticated" ? (
                                            <>
                                                <Link
                                                    href="/dashboard"
                                                    className="font-medium py-2 hover:text-primary transition"
                                                >
                                                    Dashboard
                                                </Link>
                                                <Link
                                                    href="/dashboard/add-product"
                                                    className="font-medium py-2 hover:text-primary transition"
                                                >
                                                    Add Products
                                                </Link>
                                                <Link
                                                    href="/profile"
                                                    className="font-medium py-2 hover:text-primary transition"
                                                >
                                                    Profile
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href="/signin"
                                                    className="font-medium py-2 hover:text-primary transition"
                                                >
                                                    Sign In
                                                </Link>
                                                <Link
                                                    href="/signup"
                                                    className="font-medium py-2 hover:text-primary transition"
                                                >
                                                    Sign Up
                                                </Link>
                                            </>
                                        )}
                                    </div>

                                    {/* Mobile Actions */}
                                    <div className="mt-6 flex flex-col gap-4 pt-4 border-t border-border">
                                        {"authenticated" === "authenticated" ? (
                                            <Button

                                                variant="destructive"
                                                className="w-full"
                                            >
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Sign Out
                                            </Button>
                                        ) : (
                                            <Link href="/signin">
                                                <Button className="w-full">Sign in</Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </nav>
            </div>
        </section>
    );
}
