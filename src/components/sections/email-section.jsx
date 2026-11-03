"use client";
import React, { useState } from "react";
import GithubIcon from "../../../public/images/sns-icon/github-negative.png";
import LinkedinIcon from "../../../public/images/sns-icon/linked-in-negative.png";
import InstragramIcon from "../../../public/images/sns-icon/instagram-negative.png";
import MediumIcon from "../../../public/images/sns-icon/medium-negative.png";
import KakaoIcon from "../../../public/images/sns-icon/kakao.png";
import LineIcon from "../../../public/images/sns-icon/line-white.png";

import Link from "next/link";
import Image from "next/image";
import emailjs from "emailjs-com";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    const userEmail = e.target.email.value;
    const subject = e.target.subject.value;
    const message = e.target.message.value;

    if (!isValidEmail(userEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    emailjs
      .send(
        "service_xzyo77j",
        "template_hua0n4a",
        {
          to_email: "fernnichanun@gmail.com",
          from_email: userEmail,
          subject: subject,
          message_html: message,
        },
        "NFyFFPYZ2gdUOlgMg"
      )
      .then(
        function (response) {
          console.log("Email sent successfully", response);
          alert(
            "Email sent successfully. I will get back to you shortly."
          );
          setEmailSubmitted(true);
        },
        function (error) {
          console.error("Email failed to send", error);
          alert("Email failed to send. Please try again later.");
        }
      );
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10">
        <h5 className="text-xl font-bold text-white my-2">
          Let&apos;s Connect
        </h5>
        <div className="socials flex flex-row gap-4">
          <Link href="https://github.com/ffferncake">
            <Image src={GithubIcon} alt="Github Icon" width={30} height={30} />
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
            <Image src={MediumIcon} alt="Medium Icon" width={30} height={30} />
          </Link>
          <Link href="./images/sns-icon/kakao-qr.jpg">
            <Image src={KakaoIcon} alt="Kakao Icon" width={30} height={30} />
          </Link>
          <Link href="https://line.me/ti/p/JTehJXJst6">
            <Image src={LineIcon} alt="Line Icon" width={30} height={30} />
          </Link>
        </div>
      </div>
      <div>
        {emailSubmitted ? (
          <p className="text-green-500 text-sm mt-2">
            Email sent successfully!
          </p>
        ) : (
          <form className="flex flex-col" onSubmit={sendEmail}>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="text-white block text-sm mb-2 font-medium"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Your subject"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="text-white block text-sm mb-2 font-medium"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Let's talk about..."
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-white block mb-2 text-sm font-medium"
              >
                Your email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="abcdef@google.com"
              />
            </div>
            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;
