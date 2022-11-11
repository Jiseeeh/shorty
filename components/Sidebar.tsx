import React, { useState } from "react";
import Link from "next/link";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="drawer-content text-neutral flex flex-col items-center justify-center ">
        {/* main content */}
        {children}
        <label
          htmlFor="my-drawer-2"
          className="m-5 btn btn-primary drawer-button absolute top-0 right-0 lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <section className="drawer-side lg:bg-neutral">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 text-neutral lg:text-base-100">
          {/* <!-- Sidebar content here --> */}
          <li onClick={onSidebarNavigate}>
            <Link href="/">Home</Link>
          </li>
          <li onClick={onSidebarNavigate}>
            <Link href="/shorties">Shorties</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default Sidebar;
