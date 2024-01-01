"use client";

import { BounceLoader } from "react-spinners";
import Image from "next/image";

import Box from "@/components/Box";

const Loading = () => {
  return ( 
    <Box className="h-full flex flex-col items-center justify-center">
      <Image src={'/assets/4x/icon.png'} alt='loader' width={100} height={100} className="rotating-image"/>
    </Box>
  );
}
 
export default Loading;