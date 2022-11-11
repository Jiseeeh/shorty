import React, { useState } from "react";
import Link from "next/link";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  return (
    <nav className="drawer drawer-mobile">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
        onChange={toggleSidebar}
        checked={isOpen}
      />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* main content */}
        {children}
        <label
          htmlFor="my-drawer-2"
          className="m-5 btn btn-primary drawer-button absolute top-0 right-0 lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shorties">Shorties</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
