import React from "react";
import Image from "next/image";

const HomePage = () => {
  return (
    <div>
      <div className="relative w-full h-screen bg-black">
        <Image
          src="/main-home1.jpg"
          alt="main-home1-background"
          width={200}
          height={100}
          style={{objectFit: 'cover'}}
          className="w-full h-full"
        />
      </div>
      <div className="relative bg-slate-400 w-full h-screen">
        <Image
          src="/main-home2.jpg"
          alt="main-home2-background"
          width={200}
          height={100}
          style={{objectFit: 'cover'}}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default HomePage;
