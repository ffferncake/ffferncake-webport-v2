"use client";
import React, { useTransition, useState, useEffect } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import KusIcon from
 "../../../public/images/education/kus.gif";
import KuIcon from "../../../public/images/education/ku-modified.png";
import YonseiIcon from "../../../public/images/education/YonseiUniversityEmblem.png";
import GISIcon from "../../../public/images/education/gis_logo.png";
import JicaIcon from "../../../public/images/education/logo-jica.png";
import MaholanIcon from "../../../public/images/education/maholan.png";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="text-sm list-disc pl-2">
        <li>React</li>
        <li>React Native</li>
        <li>Next.js</li>
        <li>Node.js</li>
        <li>PostgreSQL/MySQL/Hive/etc.</li>
        <li>HTML/JS/CSS</li>
        <li>Apache airflow/ETL/Python</li>
        <li>QGIS/ArcGIS Pro/ArcMap</li>
        <li>GeoServer/MapServer</li>
      </ul>
    )
  },
  {
    title: "lang-Skills",
    id: "lang-skills",
    content: (
      <ul className="list-disc pl-2">
        <li>Thai (native) </li>
        <li>TOPIK (Korean) : 172/300 (level 4)</li>
        <li>TOEIC (English) : 850/990 </li>
        <li>IELTS (English) : 6.5/9.0 </li>
      </ul>
    )
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <ol className="border-l border-neutral-300 dark:border-neutral-500 md:flex md:justify-center md:gap-6 md:border-l-0 md:border-t">
          {/* <!--First item--> */}
          <li>
            <div className="flex-start flex items-center pt-2 md:block md:pt-0">
              <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500 md:-mt-[5px] md:ml-0 md:mr-0"></div>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-300">
                2005.05 ~ 2017.02
              </p>
            </div>
            <div className="ml-4 mt-2 pb-5 md:ml-0">
              <Image src={KusIcon} alt="Ku Icon" width={40} height={40} />
              <h4 className="mb-1.5 text-md font-semibold">
                Kasetsart University Laboratory School (KUS)
              </h4>
              <p className="mb-3 text-sm text-neutral-500 dark:text-neutral-300">
                📚 Science-Math
              </p>
            </div>
          </li>
          {/* <!--Second item--> */}
          <li>
            <div className="flex-start flex items-center pt-2 md:block md:pt-0">
              <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500 md:-mt-[5px] md:ml-0 md:mr-0"></div>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-300">
                2017.07 ~ 2021.04
              </p>
            </div>
            <div className="ml-4 mt-2 pb-5 md:ml-0">
              <Image src={KuIcon} alt="Ku Icon" width={35} height={35} />
              <h4 className="mb-1.5 text-md font-semibold">
                Kasetsart University (KU)
              </h4>
              <p className="mb-3 text-sm text-neutral-500 dark:text-neutral-300">
                ⚙️ Survey Engineering and Geographic information <br />
                🌷 3.37/4.0 : second honors
              </p>
            </div>
          </li>
          {/* <!--Third item--> */}
          <li>
            <div className="flex-start flex items-center pt-2 md:block md:pt-0">
              <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500 md:-mt-[5px] md:ml-0 md:mr-0"></div>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-300">
                2022.03 ~ 2024.02
              </p>
            </div>
            <div className="ml-4 mt-2 pb-5 md:ml-0">
              <Image
                src={YonseiIcon}
                alt="Yonsei Icon"
                width={35}
                height={35}
              />
              <h4 className="mb-1.5 text-md font-semibold">
                Yonsei University
              </h4>
              <p className="mb-3 text-sm text-neutral-500 dark:text-neutral-300">
                ⚙️ Civil and Environmental Engineering (Survey and Geographic
                information) <br />
                🌷 4.00/4.30 <br />
                🌱 SPATIAL COMPUTING FOR SUSTAINABLE INFRASTRUCTURE LABORATORY
                (SCSI)
              </p>
            </div>
          </li>
        </ol>
      </ul>
    )
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="text-sm list-disc pl-2">
        <li>winning 3rd place & GISTDA award from Galileo Hackathon</li>
        <li>Certificate of participation in Galileo and Smart RTK hackathon</li>
        <li>
          Medal awarded for outstanding students of the University in 2020
        </li>
        <li>
          Certificate of Highest GPA in survey engineering and geographic
          information department (2020)
        </li>
        <li>
          Outstanding International Student Scholarship III (Yonsei University)
        </li>
        <li>Outstanding Scholarship (Kasetsart University)</li>
      </ul>
    )
  },
  {
    title: "Experience",
    id: "experience",
    content: (
      <ul className="list-disc pl-1">
        <ol className="border-l border-neutral-300 dark:border-neutral-500 md:flex md:justify-center md:gap-6 md:border-l-0 md:border-t">
          {/* <!--First item--> */}
          <li>
            <div className="flex-start flex items-center pt-2 md:block md:pt-0">
              <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500 md:-mt-[5px] md:ml-0 md:mr-0"></div>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-300">
                2020.04 ~ 2020.06
              </p>
            </div>
            <div className="ml-4 mt-2 pb-5 md:ml-0">
              <Image src={GISIcon} alt="GIS Icon" width={30} height={30} />
              <h4 className="mb-1.5 text-md font-semibold">
                CDG Group Thailand (GIS Co., Ltd.) [INTERN]
              </h4>
              <p className="mb-3 text-sm text-neutral-500 dark:text-neutral-300">
                🛰 survey and mapping engineer (Aero Department)
              </p>
            </div>
          </li>
          {/* <!--Second item--> */}
          <li>
            <div className="flex-start flex items-center pt-2 md:block md:pt-0">
              <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500 md:-mt-[5px] md:ml-0 md:mr-0"></div>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-300">
                2020.12 ~ 2022.02
              </p>
            </div>
            <div className="ml-4 mt-2 pb-5 md:ml-0">
              <Image src={JicaIcon} alt="Jica Icon" width={35} height={35} />
              <h4 className="mb-1.5 text-md font-semibold">
                Japan International Cooperation Agency (JICA)
              </h4>
              <p className="mb-3 text-sm text-neutral-500 dark:text-neutral-300">
                📊 Research Assistant (Part-time) <br />
                💻 Web map application development
              </p>
            </div>
          </li>
          {/* <!--Third item--> */}
          <li>
            <div className="flex-start flex items-center pt-2 md:block md:pt-0">
              <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500 md:-mt-[5px] md:ml-0 md:mr-0"></div>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-300">
                2021.06 ~ 2022.01
              </p>
            </div>
            <div className="ml-4 mt-2 pb-5 md:ml-0">
              <Image
                src={MaholanIcon}
                alt="Maholan Icon"
                width={35}
                height={35}
              />
              <h4 className="mb-1.5 text-md font-semibold">
                Maholan Co., Ltd.
              </h4>
              <p className="mb-3 text-sm text-neutral-500 dark:text-neutral-300">
                💻 Data Engineer/Developer <br />
                📈 ETL/Web scraping <br />
                🗺 Web Map/Dashboard Application <br />
                📱 Mobile Application (React Native/Android) <br />
              </p>
            </div>
          </li>
          {/* <!--Forth item--> */}
          <li>
            <div className="flex-start flex items-center pt-2 md:block md:pt-0">
              <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500 md:-mt-[5px] md:ml-0 md:mr-0"></div>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-300">
                2022.06 ~ 2024.01
              </p>
            </div>
            <div className="ml-4 mt-2 pb-5 md:ml-0">
              <Image
                src={MaholanIcon}
                alt="Maholan Icon"
                width={35}
                height={35}
              />
              <h4 className="mb-1.5 text-md font-semibold">
                Maholan Co., Ltd.
              </h4>
              <p className="mb-3 text-sm text-neutral-500 dark:text-neutral-300">
                💻 Front-End Developer (freelance) <br />
                🗺 Web Map/Dashboard Application (Front-End)
              </p>
            </div>
          </li>
        </ol>
      </ul>
    )
  }
];

const AboutSection = () => {
  const [tab, setTab] = useState("education");
  const [isPending, startTransition] = useTransition();
  const [flipImage, setFlipImage] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipImage((prevFlip) => !prevFlip); // Toggle flip state between true and false
    }, 1000); // Set interval duration to 1000ms (1 second)

    return () => clearInterval(interval); // Cleanup function to clear the interval on unmounting
  }, []);

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16 relative">
        {/* <div className="rounded-full bg-[#ffff] w-[150px] h-[150px] lg:w-[300px] lg:h-[300px] relative"> */}
        <center>
          <Image
            src={
              flipImage
                ? "/images/ferncake-graduated-2.png"
                : "/images/ferncake-gossip.png"
            }
            alt="about image"
            className="rounded-full bg-[#ffff] w-[150px] h-[150px lg:w-[300px] lg:h-[300px]"
            // className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            width={300}
            height={300}
          />
        </center>
        {/* </div> */}
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-md">
            I am a front-end developer. I have experience in web and mobile
            development JavaScript, React, React Native, Node.js, PostgreSQL,
            HTML, CSS, and Git especially in terms of maps. I also have
            experience in databases, especially spatial databases, ETL, data
            management, and working with APIs.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("experience")}
              active={tab === "experience"}
            >
              {" "}
              Experience{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            {/* <TabButton
              selectTab={() => handleTabChange("lang-skills")}
              active={tab === "lang-skills"}
            >
              {" "}
              Language Skills{" "}
            </TabButton> */}
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Certifications & Honors{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
