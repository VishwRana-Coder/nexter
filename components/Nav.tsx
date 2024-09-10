"use client";

//Importing Components
import Link from "next/link";
import { usePathname } from "next/navigation";
//Importing Icons
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoChatbox } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const Nav = () => {
  const nav_items = [
    {
      name: "Home",
      path: "/home",
      icons: <FaHome />,
    },
    {
      name: "Notifications",
      path: "/notification",
      icons: <FaBell />,
    },
    {
      name: "Chats",
      path: "/chat",
      icons: <IoChatbox />,
    },
    {
      name: "Profile",
      path: "/profile",
      icons: <FaUser />,
    },
    {
      name: "Settings",
      path: "/settings",
      icons: <IoMdSettings />,
    },
  ];

  const pathName = usePathname();

  return (
    <>
      <nav className="h-[60px] items-center flex justify-between w-full container">
        {/* Logo */}
        <div>
          <h1 className="text-4xl">
            Nexter
            <span className="text-light-accent dark:text-dark-accent">.</span>
          </h1>
        </div>
        <div>
          <ul className="flex gap-10 text-[#505050]">
            {nav_items.map((item, index) => {
              return (
                <Link href={item.path} key={index} className="flex flex-col items-center">
                  <span
                    className={`${
                      pathName === item.path &&
                      "text-light-accent dark:text-dark-accent "
                    }`}
                  >
                    {item.icons}
                  </span>
                  <li
                    className={`font-medium  ${
                      pathName === item.path &&
                      "text-light-accent dark:text-dark-accent "
                    } text-xl`}
                    key={index}
                  >
                    {item.name}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
