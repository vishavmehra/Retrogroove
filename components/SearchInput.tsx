"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useDebounce from "@/hooks/useDebounce";

import Input from "./Input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 200);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: '/search',
      query
    });

    router.push(url);
  }, [debouncedValue, router]);

  return ( 
    <Input 
      placeholder="Search collections"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="
              bg-[#D0C195] 
              dark:bg-[#5d4e3f]
              placeholder:text-neutral-600
              dark:placeholder:text-[#c5bb9d]
            "
    />
  );
}
 
export default SearchInput;