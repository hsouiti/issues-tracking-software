import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {FiUsers} from 'react-icons/fi';

import {
  VscBug,
  VscFolderLibrary,
  VscFileSubmodule,
  VscSettingsGear,
  VscAccount,
  VscPieChart,
} from 'react-icons/vsc';

export const SideBar = () => {
  const navLinks = [
    {title: 'Dashboard', path: '/', icon: <VscPieChart />},
    {title: 'Porjects', path: '/projects', icon: <VscFileSubmodule />},
    {title: 'Issues ', path: '/issues', icon: <VscBug />},
    {title: 'Users', path: '/users', icon: <VscAccount />},
    {title: 'Settings', path: '/settings', icon: <VscSettingsGear />},
  ];

  return (
    <div className="h-screen border-r border-gray-200 w-80">
      <div className="logo w-full border-b text-center text-3xl py-4 mb-4">Tracky</div>
      <aside className="sidebar-links px-2">
        <ul className="space-y-2">
          {navLinks.map((link) => {
            return (
              <li key={link.title} className="py-2 flex flex-row">
                <NavLink
                  to={link.path}
                  end
                  className="flex flex-1 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white
                  hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {link.icon}
                  <span className="ml-3">{link.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};
