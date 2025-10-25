"use client";

import { Button } from "@/components/ui/button";

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
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import { LayoutDashboard, MenuIcon, Search, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ModeToggle from "../Theme/ModeToggle";
import { Input } from "../ui/input";
import { useTheme } from "next-themes";

export default function Navbar() {
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();

    // Handle mounting to prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY > lastScrollY && window.scrollY > 80) {
                    // scroll down
                    setHidden(true);
                } else {
                    // scroll up
                    setHidden(false);
                }
                setLastScrollY(window.scrollY);
            }
        };

        window.addEventListener("scroll", controlNavbar);
        return () => window.removeEventListener("scroll", controlNavbar);
    }, [lastScrollY]);

    // Prevent flash of unstyled content
    if (!mounted) {
        return (
            <section className="fixed w-full top-0 z-50 bg-white/50 dark:bg-black/50">
                <div className="container mx-auto">
                    <nav className="flex items-center justify-between px-4 py-4 gap-4">
                        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                            <div className="w-8 h-8 bg-[#6c47ff] rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">B</span>
                            </div>
                            <span className="hidden sm:inline font-bold text-lg">BlogHub</span>
                        </Link>
                    </nav>
                </div>
            </section>
        );
    }

    return (
        <section
            className={`fixed w-full top-0 z-50
     bg-clip-padding backdrop-filter backdrop-blur-3xl backdrop-saturate-100 backdrop-contrast-100  
     ${theme === "light" ? "bg-white/50 text-black" : "bg-black/50 text-white"}	 
        transition-transform duration-500 ease-in-out ${hidden ? "-translate-y-full" : "translate-y-0"
                }`}
        >
            <div className="container mx-auto">
                <nav className="flex items-center justify-between px-4 py-4 gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-8 h-8 bg-[#6c47ff] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">B</span>
                        </div>
                        <span className="hidden sm:inline font-bold text-lg">BlogHub</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden lg:block">
                        <NavigationMenuList className="gap-1">
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/"
                                    className="px-4 py-2 rounded-lg hover:bg-muted transition font-semibold text-sm"
                                >
                                    Home
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/blog"
                                    className="px-4 py-2 rounded-lg hover:bg-muted transition font-semibold text-sm"
                                >
                                    Blog
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search articles..."
                                className="pl-10 w-48 focus-visible:ring-1"
                            />
                        </div>
                        <ModeToggle />

                        <SignedOut>
                            <SignInButton mode="modal">
                                <Button variant="outline">Sign In</Button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <Button className="bg-[#6c47ff] text-white hover:bg-[#5a3fd1]">
                                    Sign Up
                                </Button>
                            </SignUpButton>
                        </SignedOut>

                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>

                    {/* Mobile Menu */}
                    <div className="flex lg:hidden items-center gap-2 ml-auto">
                        <ModeToggle />

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <MenuIcon className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-72">
                                <SheetHeader>
                                    <SheetTitle>BlogHub</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-6 py-6 pl-4">
                                    <div className="flex flex-col gap-3">
                                        <Link
                                            href="/"
                                            className="font-medium text-base hover:text-[#6c47ff] transition"
                                        >
                                            Home
                                        </Link>
                                        <Link
                                            href="/blog"
                                            className="font-medium text-base hover:text-[#6c47ff] transition"
                                        >
                                            Blog
                                        </Link>
                                    </div>

                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input placeholder="Search articles..." className="pl-10" />
                                    </div>

                                    <div className="flex flex-col gap-2 pt-4">
                                        <SignedOut>
                                            <SignInButton mode="modal">
                                                <Button variant="outline" className="w-full">
                                                    Sign In
                                                </Button>
                                            </SignInButton>
                                            <SignUpButton mode="modal">
                                                <Button className="w-full bg-[#6c47ff] text-white hover:bg-[#5a3fd1]">
                                                    Sign Up
                                                </Button>
                                            </SignUpButton>
                                        </SignedOut>

                                        <SignedIn>
                                            <UserButton />
                                        </SignedIn>
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