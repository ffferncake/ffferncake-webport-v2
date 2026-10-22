import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }) => {
  return (
    <div>
      <div
        className="h-152 md:h-52 rounded-t-xl relative group bg-cover bg-no-repeat bg-center overflow-hidden transform transition-transform duration-300 hover:scale-150"
        style={{
          // Add inline styles here
          backgroundImage: `url(${imgUrl})`,
          height: "250px", // Adjust the height for mobile
          borderRadius: "8px" // Adjust the border radius for mobile
        }}
      >
        {gitUrl || previewUrl ? (
          <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 ">
            {gitUrl && (
              <Link
                href={gitUrl}
                className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
              >
                <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white" />
              </Link>
            )}
            {previewUrl && (
              <Link
                href={previewUrl}
                className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
              >
                <EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white" />
              </Link>
            )}
          </div>
        ) : null}
      </div>
      <div className="text-white rounded-b-xl mt-3 bg-[#181818]py-6 px-4">
        <h5 className="text-md font-semibold mb-2">{title}</h5>
        <p className="text-sm text-[#ADB7BE]">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
