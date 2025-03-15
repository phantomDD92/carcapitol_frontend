'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LucideChevronDown, LucideMenu, LucideX } from 'lucide-react';


const Header = ({
  menuItems,
  position,
}: {
  menuItems: string[];
  position: 'sticky' | 'fixed';
}) => {
  
  const navbarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    document.addEventListener('scroll', (e) => {
      e.preventDefault();
      if (navbarRef.current) {
        if (window.scrollY >= 80) navbarRef.current.classList.add('nav-sticky');
        else navbarRef.current.classList.remove('nav-sticky');
      }
    });
  }, []);

  return (
    <>
      <header
        id="navbar"
        className={cn(
          position,
          'inset-x-0 top-0 z-[60] w-full border-b transition-all duration-300 bg-white/90 shadow-md backdrop-blur-3xl dark:bg-default-50/80'
        )}
      >
        <div className="flex h-full items-center py-4">
          <div className="container mx-auto">
            <nav className="flex flex-wrap items-center justify-between gap-4 lg:flex-nowrap">
              <div className="flex w-full items-center justify-between lg:w-auto">
                <Link href="/">
                  <h2 className='font-bold text-2xl text-red-600'>CARCAPITOL</h2>
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    className="hs-collapse-toggle inline-block lg:hidden"
                    data-hs-overlay="#mobile-menu"
                  >
                    <LucideMenu className="h-7 w-7 text-default-600 hover:text-default-900" />
                  </button>
                </div>
                <ul className="menu relative ml-16 hidden grow items-center justify-center lg:flex">
                  {menuItems.map((item, idx) => {
                    return (
                      <li
                        key={idx}
                        className={cn(
                          'menu-item mx-2 text-default-800 transition-all duration-300 hover:text-primary [&.active]:text-primary',
                          'active'
                        )}
                      >
                        <Link
                          className="inline-flex items-center rounded-full px-2 py-0.5 text-sm font-medium capitalize lg:text-base"
                          href={`#${item}`}
                        >
                          {item}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="ms-auto hidden shrink gap-2 lg:inline-flex">
                <Link
                  href=""
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-base text-white transition-all hover:bg-primary-700"
                >
                  <span className="hidden sm:block">Sign in/Register</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div
        id="mobile-menu"
        className="hs-overlay fixed bottom-0 left-0 top-0 z-[61] hidden h-screen w-full max-w-[270px] -translate-x-full transform border-r border-default-200 bg-white transition-all [--body-scroll:true] [--overlay-backdrop:false] hs-overlay-open:translate-x-0 dark:bg-default-50"
        tabIndex={-1}
      >
        <div className="flex h-[74px] items-center justify-between border-b border-dashed border-default-200 px-4 transition-all duration-300">
          <Link href="/">
            {/* <Image
              src={logoDark}
              alt="logo"
              height={40}
              width={147}
              className="flex h-10 dark:hidden"
            />
            <Image
              src={logoLight}
              alt="logo"
              height={40}
              width={147}
              className="hidden h-10 dark:flex"
            /> */}
          </Link>
          <div data-hs-overlay="#mobile-menu" className="hs-collapse-toggle">
            <LucideX size={24} />
          </div>
        </div>
        <div className="h-[calc(100%-4rem)] overflow-y-auto">
          <nav className="hs-accordion-group flex h-full w-full flex-col flex-wrap p-4">
            <ul className="space-y-1">
              {menuItems.map((item, idx) => {
                return (
                  <li
                    key={idx}
                    className={cn(
                      'rounded text-sm font-medium capitalize text-default-900 transition-all duration-300 hover:bg-default-100 hover:text-primary [&.active]:bg-default-100 [&.active]:text-primary',
                      'active'
                    )}
                  >
                    <a className="block w-full px-4 py-2.5" href={`#${item}`}>
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;