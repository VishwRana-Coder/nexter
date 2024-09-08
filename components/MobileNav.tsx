"use client";

//Importing Components
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoIosMenu } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
//Importing Icons
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoChatbox } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const MobileNav = () => {
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
      <nav className="h-[60px] flex items-center justify-between container">
        <div>
          <div>
            <h1 className="text-4xl">
              Nexter
              <span className="text-light-accent dark:text-dark-accent">.</span>
            </h1>
          </div>
        </div>
        <Sheet>
          <SheetTrigger>
            <IoIosMenu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                <div className="mt-10">
                  <h1 className="text-4xl">
                    Nexter
                    <span className="text-light-accent dark:text-dark-accent">
                      .
                    </span>
                  </h1>
                </div>
                <ul className="text-left mt-10">
                  {nav_items.map((item, index) => {
                    return (
                      <Link
                        href={item.path}
                        className="flex items-center flex-col"
                      >
                        <span className="text-xl">{item.icons}</span>
                        <li
                          className={`font-medium  ${
                            pathName === item.path &&
                            "text-light-accent dark:text-dark-accent"
                          } text-3xl mb-5`}
                          key={index}
                        >
                          {item.name}
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
};

export default MobileNav;
