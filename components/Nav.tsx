'use client'

import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { UserIcon } from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Admin', href: '/admin' },
  { name: 'Public', href: '/public' },
];

export default function Nav() {
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-slate-200">
      <div className="px-2 sm:px-6 lg:px-8">
        <div className="relative h-16 flex items-center justify-between">
          {/* Hamburger Icon */}
          <div className="absolute left-0 inset-y-0 flex items-center sm:hidden">
            <button className="flex items-center justify-center rounded-md p-2 hover:bg-gray-700 hover:text-white"
              aria-controls="mobile-menu" aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                className={`h-6 w-6 ${isOpen ? 'hidden' : 'block'}`}
                aria-hidden="true"
              />
              <XMarkIcon
                className={`h-6 w-6 ${isOpen ? 'block' : 'hidden'}`}
                aria-hidden="true"
              />
            </button>
          </div>
          {/* Logo and Tabs */}
          <div className="flex flex-1 justify-center sm:justify-start gap-2">
            <div className="flex items-center">
              Logo
            </div>
            <div className="hidden sm:block">
              <div className="flex space-x-4">
                {
                  navigation.map((page) => {
                    return (
                      <Link
                        key={page.name}
                        href={page.href}
                        className={`
                          block px-3 py-2 hover:bg-gray-700 hover:text-white
                          ${pathname === page.href ? 'bg-gray-900 text-white' : ''}
                        `}
                        aria-current={pathname === page.href}
                      >
                        {page.name}
                      </Link>
                    )
                  })
                }
              </div>
            </div>
          </div>
          {/* Profile */}
          <div className="absolute right-0 inset-y-0 flex items-center">
            <div>
              Search/Alert
            </div>
            <div className="relative ml-3">
              {
                data ? 

                <Menu>
                  <Menu.Button className="p-1 rounded-full bg-gray-50">
                    <span className="sr-only">Open user menu</span>
                    <UserIcon className="h-8 w-8 rounded-full" />
                  </Menu.Button>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg"
                    >
                      <Menu.Item as="div">
                          {({ active }) => (
                            <span
                              className={`block px-4 py-2 text-sm text-gray-700 ${active ? "bg-gray-100" : ""}`}
                            >
                              Profile
                            </span>
                          )}
                      </Menu.Item>
                      <Menu.Item>
                          {({ active }) => (
                            <Link href={{
                              pathname: '/api/auth/signout',
                              query: { callbackUrl: '/' },
                            }}
                              className={`block px-4 py-2 text-sm text-gray-700 ${active ? "bg-gray-100" : ""}`}
                            >
                              Logout
                            </Link>
                          )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>

                :

                <Link href="/api/auth/signin">Login</Link>
              }
            </div>
          </div>
        </div>
      </div>

      <div className={`sm:hidden space-y-1 px-2 pb-3 pt-2 ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        {
          navigation.map((page) => {
            return (
              <Link
                key={page.name}
                href={page.href}
                className={`
                  block px-3 py-2 hover:bg-gray-700 hover:text-white
                  ${pathname === page.href ? 'bg-gray-900 text-white' : ''}
                `}
                aria-current={pathname === page.href}
              >
                {page.name}
              </Link>
            )
          })
        }
      </div>
    </nav>
  );
};
