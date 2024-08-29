"use client"

//Importing Components
import Link from "next/link";
import { usePathname } from "next/navigation";


const Nav = () => {
  const nav_items = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Stories",
      path: "/stories",
    },
    {
      name: "Music",
      path: "/music",
    },
    {
      name: "Profile",
      path: "/profile",
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
          <ul className="flex gap-10">
            {nav_items.map((item, index) => {
              return (
                <Link href={item.path}>
                  <li className={`font-medium  ${pathName === item.path && "text-light-accent dark:text-dark-accent"} text-xl`} key={index}>
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
