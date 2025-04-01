import { useEffect, useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { signOut } from "firebase/auth";
import { auth } from "../components/firebase"; // Adjust the path if necessary
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function FloatingNavigationBar() {
    const pathname = usePathname()

    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/login");
    };

    /** Function to determine if the current path matches the link */
    const isActive = (path) => pathname === path;

    return (
        <Disclosure as="nav" className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-8xl bg-gray-800 rounded-2xl shadow-lg">
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
                        <div className="flex flex-shrink-0 items-center" style={{ height: "150px" }}>
                            <img
                                alt="Socketlink Logo"
                                src="/images/socketlink.png"
                                className="h-40 w-auto"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block flex-1">
                            {user ? (
                                <div className="flex justify-start space-x-4 items-center" style={{ height: "150px" }}>
                                    <Link
                                        href="/"
                                        className={classNames(
                                            isActive("/") ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href="/metrics"
                                        className={classNames(
                                            isActive("/metrics") ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                    >
                                        Metrics
                                    </Link>
                                    <Link
                                        href="/my-plans"
                                        className={classNames(
                                            isActive("/my-plans") ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                    >
                                        My Plans
                                    </Link>
                                    <Link
                                        href="/configuration"
                                        className={classNames(
                                            isActive("/configuration") ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                    >
                                        Configuration
                                    </Link>
                                    <Link
                                        href="/billing"
                                        className={classNames(
                                            isActive("/billing") ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                    >
                                        Billing
                                    </Link>
                                    <Link
                                        href="/terms-conditions"
                                        className={classNames(
                                            isActive("/terms-conditions") ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                    >
                                        Terms & Conditions
                                    </Link>
                                    <Link
                                        href="/privacy-policy"
                                        className={classNames(
                                            isActive("/privacy-policy") ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                    >
                                        Privacy Policy
                                    </Link>
                                    <Link
                                        href="/contact-us"
                                        className={classNames(
                                            isActive("/contact-us") ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                    >
                                        Contact Us
                                    </Link>
                                    <Link
                                        href="/pricing"
                                        className={classNames(
                                            isActive("/pricing") ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                    >
                                        Pricing
                                    </Link>
                                    <Link
                                        href="/docs/introduction"
                                        className={classNames(
                                            isActive("/docs") ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                    >
                                        Docs
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center" style={{ height: "150px" }}>
                                    <div className="space-x-4">
                                        <Link
                                            href="/pricing"
                                            className={classNames(
                                                isActive("/pricing") ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600",
                                                "rounded-md px-3 py-2 text-sm font-medium"
                                            )}
                                        >
                                            Pricing
                                        </Link>
                                        <Link
                                            href="/docs/introduction"
                                            className={classNames(
                                                isActive("/docs") ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600",
                                                "rounded-md px-3 py-2 text-sm font-medium"
                                            )}
                                        >
                                            Docs
                                        </Link>
                                        <Link
                                            href="/terms-conditions"
                                            className={classNames(
                                                isActive("/terms-conditions") ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600",
                                                "rounded-md px-3 py-2 text-sm font-medium"
                                            )}
                                        >
                                            Terms & Conditions
                                        </Link>
                                        <Link
                                            href="/privacy-policy"
                                            className={classNames(
                                                isActive("/privacy-policy") ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600",
                                                "rounded-md px-3 py-2 text-sm font-medium"
                                            )}
                                        >
                                            Privacy Policy
                                        </Link>
                                    </div>
                                    <div className="flex space-x-4">
                                        <Link
                                            href="/login"
                                            className={classNames(
                                                isActive("/login") ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                "rounded-md px-3 py-2 text-sm font-medium"
                                            )}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/signup"
                                            className={classNames(
                                                isActive("/signup") ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                "rounded-md px-3 py-2 text-sm font-medium"
                                            )}
                                        >
                                            Signup
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {user && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {/* <button
                                type="button"
                                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="sr-only">View notifications</span>
                                <BellIcon aria-hidden="true" className="h-6 w-6" />
                            </button> */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm transition-all duration-200 ease-in-out hover:opacity-80 active:opacity-70 active:scale-95">
                                        <span className="sr-only">Open user menu</span>
                                        <Image
                                            alt=""
                                            src="/images/user.jpeg"
                                            width={32}
                                            height={32}
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
                            <Link
                                href="/"
                                className={classNames(
                                    isActive("/") ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "block rounded-md px-3 py-2 text-base font-medium mt-5"
                                )}
                            >
                                Home
                            </Link>
                            <Link
                                href="/metrics"
                                className={classNames(
                                    isActive("/metrics") ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "block rounded-md px-3 py-2 text-base font-medium"
                                )}
                            >
                                Metrics
                            </Link>
                            <Link
                                href="/my-plans"
                                className={classNames(
                                    isActive("/my-plans") ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "block rounded-md px-3 py-2 text-base font-medium"
                                )}
                            >
                                My Plans
                            </Link>
                            <Link
                                href="/configuration"
                                className={classNames(
                                    isActive("/configuration") ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "block rounded-md px-3 py-2 text-base font-medium"
                                )}
                            >
                                Configuration
                            </Link>
                            <Link
                                href="/billing"
                                className={classNames(
                                    isActive("/billing") ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "block rounded-md px-3 py-2 text-base font-medium"
                                )}
                            >
                                Billing
                            </Link>
                            <Link
                                href="/terms-conditions"
                                className={classNames(
                                    isActive("/terms-conditions") ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "block rounded-md px-3 py-2 text-base font-medium"
                                )}
                            >
                                Terms & Conditions
                            </Link>
                            <Link
                                href="/privacy-policy"
                                className={classNames(
                                    isActive("/privacy-policy") ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "block rounded-md px-3 py-2 text-base font-medium"
                                )}
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/contact-us"
                                className={classNames(
                                    isActive("/contact-us") ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "block rounded-md px-3 py-2 text-base font-medium"
                                )}
                            >
                                Contact Us
                            </Link>
                            <Link
                                href="/pricing"
                                className={classNames(
                                    isActive("/pricing") ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "block rounded-md px-3 py-2 text-base font-medium"
                                )}
                            >
                                Pricing
                            </Link>
                            <Link
                                href="/docs/introduction"
                                className={classNames(
                                    isActive("/docs") ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "block rounded-md px-3 py-2 text-base font-medium"
                                )}
                            >
                                Docs
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/pricing" className={classNames(
                                isActive("/pricing") ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "block rounded-md px-3 py-2 text-base font-medium mt-5"
                            )}>
                                Pricing
                            </Link>
                            <Link href="/docs/introduction" className={classNames(
                                isActive("/docs") ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "block rounded-md px-3 py-2 text-base font-medium"
                            )}>
                                Docs
                            </Link>
                            <Link href="/terms-conditions" className={classNames(
                                isActive("/terms-conditions") ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "block rounded-md px-3 py-2 text-base font-medium"
                            )}>
                                Terms & Conditions
                            </Link>
                            <Link href="/privacy-policy" className={classNames(
                                isActive("/privacy-policy") ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "block rounded-md px-3 py-2 text-base font-medium"
                            )}>
                                Privacy Policy
                            </Link>
                            <Link href="/login" className={classNames(
                                isActive("/login") ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "block rounded-md px-3 py-2 text-base font-medium"
                            )}>
                                Login
                            </Link>
                            <Link href="/signup" className={classNames(
                                isActive("/signup") ? "bg-gray-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "block rounded-md px-3 py-2 text-base font-medium"
                            )}>
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}