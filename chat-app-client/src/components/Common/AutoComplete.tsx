import React, { ChangeEvent, useEffect, useState } from "react";
import { AutoComplete } from "antd";
import { useRecoilState } from "recoil";
import { searchTextAtom } from "../../recoil/atoms/user";
import useDebounce from "../../useHook/useDebounce";
import { DEBOUNCE_DELAY_TIME } from "../../utils";
import useSearchApi from "../../useHook/useSearchApi";

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

  const onChange = (e: any) => {
    setSearchText(e);
  };

  return (
    <>
      <AutoComplete
        mode={mode}
        options={options}
        className={className}
        value={searchText}
        onSelect={(e) => onClick(e)}
        onSearch={(e) => onChange(e)}
        placeholder={placeholder}
        allowClear={{ clearIcon: clearTextIcon }}
      />
    </>
  );
};

export default Search;
