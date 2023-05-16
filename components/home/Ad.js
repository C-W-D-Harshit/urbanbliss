import Image from "next/image";
import React from "react";
import { AiOutlineArrowRight, AiOutlineRight } from "react-icons/ai";

const Ad = ({ img, title }) => {
  return (
    <div className="home_ad">
      <div>
        <Image src={img} alt="image" width={600} height={600} />
      </div>
      <div>
        <p>LIMITED OFFER</p>
        <p>{title}</p>
        <div>
          <p style={{ marginRight: "1rem" }}>Grab it now</p>
          <AiOutlineArrowRight />
        </div>
      </div>
    </div>
  );
};

export default Ad;
