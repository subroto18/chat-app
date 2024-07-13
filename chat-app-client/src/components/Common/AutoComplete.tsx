import React, { ChangeEvent, useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { searchTextAtom } from "../../recoil/atoms/user";
import useDebounce from "../../useHook/useDebounce";
import { DEBOUNCE_DELAY_TIME } from "../../utils";
import useSearchApi from "../../useHook/useSearchApi";
import Input from "./Input";

const Search: React.FC = ({
  className,
  placeholder,
  options,
  clearTextIcon,
  onClick,
  mode,
}: {
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  options?: string[];
  clearTextIcon?: JSX.Element;
}) => {
  const [searchText, setSearchText] = useRecoilState(searchTextAtom);
  const performUserSearchApi = useSearchApi();
  const debouncedInputValue = useDebounce(searchText, DEBOUNCE_DELAY_TIME);

  useEffect(() => {
    if (debouncedInputValue && Boolean(searchText)) {
      performUserSearchApi();
    }
  }, [searchText, debouncedInputValue]);

  const onHandleChange = (e: any) => {
    setSearchText(e);
  };

  return (
    <div className="relative">
      <Input
        onChange={onHandleChange}
        value={searchText}
        className={className}
        placeholder={placeholder}
        onClick={onClick}
      />

      <div className="px-4 bg-white mt-[.2rem] shadow-lg w-full  py-6 absolute  max-h-[20rem] z-10 overflow-auto">
        <div className="">
          {[...Array(10)].map((pd) => {
            return (
              <p className="font-semibold rounded-sm shadow-sm p-1 cursor-pointer hover:bg-slate-100">
                Subroto
              </p>
            );
          })}
        </div>

        <div role="status" className="max-w-sm animate-pulse">
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700  w-full mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700  w-full"></div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
