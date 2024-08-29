import React from "react";

//Importing Components
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <>
      <div>
        {/* Desktop Nav */}
        <div className="hidden md:flex">
          <Nav />
        </div>
        {/* Mobile Nav */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </>
  );
};

export default Header;
