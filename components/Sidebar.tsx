import React, { useState } from "react";
import { IconLayoutSidebarLeftExpand } from "@tabler/icons";
import { IconBrandGithub } from "@tabler/icons";
import Link from "next/link";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sideBarListItems = [
    {
      path: "/",
      body: "Home",
    },
    {
      path: "/shorties",
      body: "Shorties",
    },
    {
      path: "/signUp",
      body: "Sign up",
    },
    {
      path: "/login",
      body: "Login",
    },
  ];

  const onToggleSidebar = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const onSidebarNavigate = () => {
    setIsOpen(false);
  };

  return (
    <nav className="drawer drawer-mobile bg-base-100">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
        onChange={onToggleSidebar}
        checked={isOpen}
      />
      <section className="drawer-content text-neutral flex flex-col items-center justify-center ">
        {/* main content */}
        {children}
        <label
          htmlFor="my-drawer-2"
          className="m-5 drawer-button absolute top-0 right-0 cursor-pointer lg:hidden"
        >
          <IconLayoutSidebarLeftExpand size={40} />
        </label>
      </section>
      <section className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 text-base-100 bg-neutral ">
          {/* <!-- Sidebar content here --> */}
          {sideBarListItems.map((item, index) => (
            <li
              className="text-2xl font-bold"
              key={index}
              onClick={onSidebarNavigate}
            >
              <Link href={item.path}>{item.body}</Link>
            </li>
          ))}
          <li className="mt-auto font-bold text-center">A URL SHORTENER </li>
          <li className="items-center">
            <Link href="https://github.com/Jiseeeh/shorty">
              <IconBrandGithub className="hover:text-error" />
            </Link>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default Sidebar;
