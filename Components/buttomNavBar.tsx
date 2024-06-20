"use client";
import Link from "next/link";
import * as React from "react";
import Typography from "@mui/material/Typography";

function ButtomNavBar() {
  return (
    <div className=" fixed bottom-0 bg-white pt-2 pb-2 flex justify-center sm:hidden gap-4  w-full border-t border-gray-300  ">
      <Link href={`/Home`}>
        <div className="flex  hover:bg-gray-200  rounded-3xl p-3">
          <div className="mt-[2px] w-[25px] h-[25px]">
            <svg viewBox="0 0 24 24">
              <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z"></path>
            </svg>
          </div>
        </div>
      </Link>
      <Typography
        className="pt-2"
        variant="h4"
        noWrap
        sx={{
          display: { xs: "flex", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 1000,
          letterSpacing: ".5rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        BLOG
      </Typography>
      <Link href={`/CreatePost`}>
        <div className="flex hover:bg-gray-200 rounded-3xl p-3  ">
          <div className="mt-[3px] w-[25px] h-[25px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              id="new-post"
            >
              <path
                fill="#000"
                fill-rule="evenodd"
                d="M7 1C3.68629 1 1 3.68629 1 7V17C1 20.3137 3.68629 23 7 23H17C20.3137 23 23 20.3137 23 17V7C23 3.68629 20.3137 1 17 1H7ZM11 11V6H13V11H18V13H13V18H11V13H6V11H11Z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default ButtomNavBar;
