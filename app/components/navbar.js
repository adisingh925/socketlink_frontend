import { useEffect, useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { signOut } from "firebase/auth";
import { auth } from "../components/firebase"; // Adjust the path if necessary
import { useRouter } from "next/navigation"; // useRouter for navigation
import Link from "next/link";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function FloatingNavigationBar() {
    const [user, setUser] = useState(null); // To store authenticated user info
    const router = useRouter(); // For programmatic navigation

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/login"); // Redirect to login after sign out
    };

    return (
        <Disclosure as="nav" className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-5xl bg-gray-800 rounded-lg shadow-lg">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton
                            className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none active:scale-95 transition-transform"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon
                                aria-hidden="true"
                                className="block h-6 w-6 group-data-[open]:hidden"
                            />
                            <XMarkIcon
                                aria-hidden="true"
                                className="hidden h-6 w-6 group-data-[open]:block"
                            />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                alt="Your Company"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                className="h-8 w-auto"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block flex-1">
                            {user ? (
                                <div className="flex justify-start space-x-4">
                                    <Link
                                        href="/"
                                        className="text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-600"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/metrics"
                                        className="text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-600"
                                    >
                                        Metrics
                                    </Link>
                                    <Link
                                        href="/my-plans"
                                        className="text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-600"
                                    >
                                        My Plans
                                    </Link>
                                    <Link
                                        href="/terms-conditions"
                                        className="text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-600"
                                    >
                                        Terms & Conditions
                                    </Link>
                                    <Link
                                        href="/privacy-policy"
                                        className="text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-600"
                                    >
                                        Privacy Policy
                                    </Link>
                                    <Link
                                        href="/contact-us"
                                        className="text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-600"
                                    >
                                        Contact Us
                                    </Link>
                                    <Link
                                        href="/pricing"
                                        className="text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-600"
                                    >
                                        Pricing
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex justify-end space-x-4">
                                    <Link
                                        href="/login"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                    >
                                        Signup
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                    {user && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button
                                type="button"
                                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="sr-only">View notifications</span>
                                <BellIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            alt=""
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            className="h-8 w-8 rounded-full"
                                        />
                                    </MenuButton>
                                </div>
                                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                                    <MenuItem>
                                        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700">
                                            Your Profile
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700">
                                            Sign out
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    )}
                </div>
            </div>
            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {user ? (
                        <>
                            <Link href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                Dashboard
                            </Link>
                            <button onClick={handleLogout} className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                Sign out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                Login
                            </Link>
                            <Link href="/signup" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
