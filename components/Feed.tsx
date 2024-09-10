"use client";
// Importing Components
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { ShadcnButton } from "./ui/button";

// Importing Icons
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { IoShareSocial } from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa";
import styles from "./Feed.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import required modules
import { Navigation } from "swiper/modules";

interface Post {
  _id: string;
  userName: string;
  userEmail: string;
  userPhoto: string;
  textValue: string;
  timeStamp: string;
  imageUrls: string[];
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/posts");
        const result = await response.json();
        setPosts(result.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  const mainPost = [...posts].reverse();

  return (
    <div className="w-100% flex items-center flex-col">
      {mainPost.map((item, index) => (
        <main
          key={index}
          className="bg-[#F2F2F2] flex md:w-[70%] w-[80%] border border-[#d6d6d6] rounded-lg flex-col mb-10 text-[14px]"
        >
          <Link href="">
            <div className="flex items-center gap-2 px-5 pt-2">
              {/* Image */}
              <div>
                <Image
                  src={item.userPhoto}
                  alt="User"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              {/* Name */}
              <div className="font-medium">{item.userName}</div>
            </div>
          </Link>

          {/* Render textValue as HTML content */}
          <div
            className={styles.postContent} // Ensure the class is applied correctly
            dangerouslySetInnerHTML={{ __html: item.textValue }} // Render HTML content
          />

          <div className="flex justify-end pt-2 px-5 text-[rgb(65,65,65)]">
            {item.timeStamp}
          </div>

          {/* Swiper for images */}
          <div>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="md:h-[300px] h-[200px] mt-2 mb-5"
              loop={true}
            >
              {item.imageUrls.map((photourl, key) => {
                return (
                  <div key={key}>
                    <SwiperSlide>
                    <div className="flex justify-center items-center w-full h-full">
                      <div className="relative h-[200px] w-[300px] md:h-[100%] md:w-[100%]">
                        <Image
                          src={photourl}
                          alt="Post image"
                          style={{ objectFit: "contain" }}
                          className="rounded-md"
                          fill
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                  </div>
                );
              })}
            </Swiper>
          </div>

          {/* Buttons */}
          <div className="flex md:gap-1 gap-2 lg:gap-3 justify-center mb-5 md:mt-10">
            <ShadcnButton className="gap-1 text-[8px] lg:text-[15px] md:text-[10px] flex flex-col md:flex-row h-[auto]">
              <AiOutlineLike /> Like
            </ShadcnButton>
            <ShadcnButton className="gap-1 text-[8px] lg:text-[15px] md:text-[10px] flex flex-col md:flex-row h-[auto]">
              <AiOutlineDislike /> Dislike
            </ShadcnButton>
            <ShadcnButton className="gap-1 text-[8px] lg:text-[15px] md:text-[10px] flex flex-col md:flex-row h-[auto]">
              <IoShareSocial /> Share
            </ShadcnButton>
            <ShadcnButton className="gap-1 text-[8px] lg:text-[15px] md:text-[10px] flex flex-col md:flex-row h-[auto]">
              <FaRegCommentDots /> Comment
            </ShadcnButton>
          </div>
        </main>
      ))}
    </div>
  );
};

export default Feed;