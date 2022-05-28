import { useRouter } from 'next/router';
import React, { useContext, useEffect, Fragment } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutContext } from '../context/Layout';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, SearchIcon, XIcon } from '@heroicons/react/outline';
import { classNames } from '../utils';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
}

interface MenuItem {
  name: string;
  href: string;
}

const navigation: MenuItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Search', href: '/search' },
];

export const Layout: React.FC<Props> = ({ children }) => {
  const { query, setQuery } = useContext(LayoutContext);
  const { header } = useContext(LayoutContext);

  const router = useRouter();

  useEffect(() => {
    setQuery((router.query?.query ?? '') as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !query) return;

    router.push(`/search/${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-full">
      <div className="bg-gray-800 pb-32">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="border-b border-gray-700">
                  <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                    <div className="flex items-center pr-2 lg:px-0">
                      <div className="flex-shrink-0">
                        <h2 className="font-semibold text-white">Movie Time</h2>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) => (
                            <Link href={item.href} key={item.name}>
                              <a className={classNames(router.pathname == item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium')} aria-current={router.pathname == item.href ? 'page' : undefined}>
                                {item.name}
                              </a>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 justify-center px-2 sm:px-0 lg:ml-6 lg:justify-end">
                      <div className="w-full max-w-lg lg:max-w-xs">
                        <div className="relative text-gray-400 focus-within:text-gray-600">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <input
                            id="search"
                            className="block w-full rounded-md border border-transparent bg-white py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 sm:text-sm"
                            placeholder="Search"
                            type="search"
                            value={query}
                            onChange={onChange}
                            onKeyUp={onKeyUp}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        {open ? <XIcon className="block h-6 w-6" aria-hidden="true" /> : <MenuIcon className="block h-6 w-6" aria-hidden="true" />}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                <div className="space-y-1 px-2 py-3 sm:px-3">
                  {navigation.map((item) => (
                    <Link href={item.href} key={item.name}>
                      <Disclosure.Button as="a" className={classNames(router.pathname == item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium')} aria-current={router.pathname == item.href ? 'page' : undefined}>
                        {item.name}
                      </Disclosure.Button>
                    </Link>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        {header && (
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">{header}</h1>
            </div>
          </header>
        )}
      </div>

      <main className="-mt-32">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};
