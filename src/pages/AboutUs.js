import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
function AboutUs() {
  return (
    <div>
      <Navbar />
      <div className="flex p-8 gap-8 justify-center mt-20">
        <div
          className="w-[300px] h-[300px] shadow-md rounded-md bg-gray-500/20
        shadow-gray-500 drop-shadow-2xl flex items-center flex-col p-4 "
        >
          <img
            src="https://media.licdn.com/dms/image/v2/C4E03AQGr4Lvjdrbxtg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1633275044389?e=1735171200&v=beta&t=uAACzpubOk7kAq-6yQSHJPxSTzpKeE7mJP-Ir9pCgpA"
            className="rounded-full w-[150px] h-[150px]"
          />
          <p className=" text-[22px] tracking-wide">Aman Rohi</p>
          <p className="text-[17px]">B.Tech , CSE</p>
          <p>NSUT</p>
          <Link to="https://www.linkedin.com/in/aman-rohi-0053a1216/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              className="w-[30px] h-[30px] mt-2"
            />
          </Link>
        </div>
        <div
          className="w-[300px] h-[300px] shadow-md rounded-md bg-gray-500/20
        shadow-gray-500 drop-shadow-2xl flex items-center flex-col p-4 "
        >
          <img
            src="https://media.licdn.com/dms/image/v2/D5603AQH6bbY_pAapPg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728405147162?e=1735171200&v=beta&t=SVyMtCtp-3IekO0E0t8ir2sgDncLluMuzH__tEcWAnQ"
            className="rounded-full w-[150px] h-[150px]"
          />
          <p className=" text-[22px] tracking-wide">Lakshya Sharma</p>
          <p className="text-[17px]">B.Tech , CSE</p>
          <p>NSUT</p>
          <Link to="https://www.linkedin.com/in/lakshay-sharma-74303122b/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              className="w-[30px] h-[30px] mt-2"
            />
          </Link>
        </div>
        <div
          className="w-[300px] h-[300px] shadow-md rounded-md bg-gray-500/20
        shadow-gray-500 drop-shadow-2xl flex items-center flex-col p-4 "
        >
          <img
            src="https://media.licdn.com/dms/image/v2/D4D03AQEWxguRshwtDQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1667560564191?e=1735171200&v=beta&t=cwbzWZO79RaC7bOG_qhhW9lfgAnyptlkF6o5iFAWqho"
            className="rounded-full w-[150px] h-[150px]"
          />
          <p className=" text-[22px] tracking-wide">Arpit</p>
          <p className="text-[17px]">B.Tech , CSE</p>
          <p>NSUT</p>
          <Link to="https://www.linkedin.com/in/arpit-03a368246/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              className="w-[30px] h-[30px] mt-2"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
