"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import WritePost from "./WritePostModal";

// Importing Icons
import { FaHome, FaBell, FaUser } from "react-icons/fa";
import { IoMdSettings, IoIosMenu } from "react-icons/io";
import { IoChatbox } from "react-icons/io5";
import { auth } from "./Firebase";
// Define the default image URL
// Default image URL

const SideBar = () => {
  const nav_items = [
    { name: "Home", path: "/home", icons: <FaHome /> },
    { name: "Notifications", path: "/notification", icons: <FaBell /> },
    { name: "Chats", path: "/chat", icons: <IoChatbox /> },
    { name: "Profile", path: "/profile", icons: <FaUser /> },
    { name: "Settings", path: "/settings", icons: <IoMdSettings /> },
  ];

  const pathName = usePathname();

  //Getting info from the Localstorage
  const userName = localStorage.getItem("Name");
  const userEmail = localStorage.getItem("Email");
  const userPhoto = localStorage.getItem("Photo");

  return (
    <>
      <div className="md:border-[#d6d6d6] border-r-2 pl-3 px-3 h-[90vh] top-0 hidden md:block">
        {/* Logo */}
        <Link href={"/home"}>
          <div>
            <h1 className="text-5xl text-center md:text-left">
              Nexter
              <span className="text-light-accent dark:text-dark-accent">.</span>
            </h1>
          </div>
        </Link>

        {/* User Info */}
        <Link href={"/profile"}>
          <div className="bg-[#f2f2f2] rounded-lg flex items-center mt-5 justify-center space-x-2 py-2 border border-[#b7b7b7]">
            <Image
              src={
                userPhoto ||
                "https://firebasestorage.googleapis.com/v0/b/nexter-500.appspot.com/o/image-removebg-preview.png?alt=media&token=7d6c0808-22e1-4bf8-9fcf-442e4e3db7e7"
              }
              alt="User Image"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h3 className="text-xl font-medium">{userName || "No Name"}</h3>
          </div>
        </Link>
        {/* Write Post */}
        <div className="mt-5">
          <WritePost />
        </div>
        <ul className="mt-10">
          {nav_items.map((item, index) => (
            <Link href={item.path} key={index}>
              <li
                className={`mt-3 h-[50px] font-semibold rounded-xl flex justify-center items-center ${
                  item.path === pathName && "text-[#F8FAFC] bg-[#0F172A]"
                }`}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex md:hidden justify-between container fixed h-[60px] bg-light-background z-[800] mt-0 items-center">
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
                <div>
                  <h1 className="text-5xl text-center md:text-left">
                    Nexter
                    <span className="text-light-accent dark:text-dark-accent">
                      .
                    </span>
                  </h1>
                </div>
                {/* User Info */}
                <Link href={"/profile"}>
                  <div className="bg-[#fcfcfc] rounded-lg flex items-center mt-5 justify-center space-x-2 py-2 border border-[#b7b7b7]">
                    <Image
                      src={
                        userPhoto ||
                        "https://firebasestorage.googleapis.com/v0/b/nexter-500.appspot.com/o/image-removebg-preview.png?alt=media&token=7d6c0808-22e1-4bf8-9fcf-442e4e3db7e7"
                      }
                      alt="User Image"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <h3 className="text-xl font-medium">
                      {userName || "No Name"}
                    </h3>
                  </div>
                </Link>
                <ul className="mt-5">
                  {nav_items.map((item, index) => (
                    <Link href={item.path} key={index}>
                      <li
                        className={`mt-3 h-[50px] font-semibold rounded-xl flex justify-center items-center ${
                          item.path === pathName && "text-white bg-[#0F172A]"
                        }`}
                      >
                        {item.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:hidden flex px-10 mt-10 justify-center">
        {/* Write Post */}
        <div className="mt-5 w-full max-w-[400px]">
          <WritePost />
        </div>
      </div>
    </>
  );
};

export default SideBar;
