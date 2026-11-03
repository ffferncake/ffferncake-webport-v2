"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import GithubIcon from "../../../public/images/sns-icon/github-negative.png";
import LinkedinIcon from "../../../public/images/sns-icon/linked-in-negative.png";
import InstragramIcon from "../../../public/images/sns-icon/instagram-negative.png";
import MediumIcon from "../../../public/images/sns-icon/medium-negative.png";
import KakaoIcon from "../../../public/images/sns-icon/kakao.png";
import LineIcon from "../../../public/images/sns-icon/line-white.png";

const HeroSection = () => {
  const [flipImage, setFlipImage] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipImage((prevFlip) => !prevFlip); // Toggle flip state between true and false
    }, 1000); // Set interval duration to 1000ms (1 second)

    return () => clearInterval(interval); // Cleanup function to clear the interval on unmounting
  }, []);

  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-3xl sm:text-4xl lg:text-7xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
              Hello, I&apos;m{" "}
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                "Fern Nichanun",
                1000,
                "Web Developer",
                1000,
                // "Mobile Developer",
                // 1000
                // "UI/UX Designer",
                // 1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
            Front-End Developer.
          </p>
          <div>
            <Link
              href="/#contact"
              className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
            >
              Hire Me
            </Link>
            <Link
              href="https://docs.google.com/presentation/d/1z7HzCXi2YN3cB4-aMu2r1YaA_lvp-Hnor0B5jhDNz0A/edit?usp=sharing"
              className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white mt-3"
            >
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                Download CV
              </span>
            </Link>
            <div className="mt-10 socials flex flex-row gap-4">
              <Link href="https://github.com/ffferncake">
                <Image
                  src={GithubIcon}
                  alt="Github Icon"
                  width={30}
                  height={30}
                />
              </Link>
              <Link href="https://www.linkedin.com/in/nichanun-trakulphudphong/">
                <Image
                  src={LinkedinIcon}
                  alt="Linkedin Icon"
                  width={30}
                  height={30}
                />
              </Link>
              <Link href="https://www.instagram.com/ferncake/">
                <Image
                  src={InstragramIcon}
                  alt="Instragram Icon"
                  width={30}
                  height={30}
                />
              </Link>
              <Link href="https://medium.com/@fernnichanun">
                <Image
                  src={MediumIcon}
                  alt="Medium Icon"
                  width={30}
                  height={30}
                />
              </Link>
              <Link href="./images/sns-icon/kakao-qr.jpg">
                <Image
                  src={KakaoIcon}
                  alt="Kakao Icon"
                  width={30}
                  height={30}
                />
              </Link>
              <Link href="https://line.me/ti/p/JTehJXJst6">
                <Image src={LineIcon} alt="Line Icon" width={30} height={30} />
              </Link>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="relative">
            <Image
              src={
                flipImage
                  ? "/images/ferncake-graduated-modified.png"
                  : "/images/ferncake-macbook.png"
              }
              alt="hero image"
              className="rounded-full bg-[#ffff] w-[150px] h-[150px] lg:w-[300px] lg:h-[300px]"
              width={300}
              height={300}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
