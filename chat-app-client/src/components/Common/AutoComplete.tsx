import React, { ChangeEvent, useState } from "react";
import { CloseSquareFilled } from "@ant-design/icons";
import { AutoComplete } from "antd";

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const Search: React.FC = ({
  className,
  onChange,
  placeholder,
  options,
  clearTextIcon,
  value,
  onClick,
}: {
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  options?: string[];
  clearTextIcon?: JSX.Element;
}) => {
  //   const [options, setOptions] = useState<{ value: string }[]>();

  //   const getPanelValue = (searchText: string) =>
  //     !searchText
  //       ? []
  //       : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  //   const getUsers = (text) => {
  //     console.log(text);
  //   };

  return (
    <>
      <AutoComplete
        options={options}
        className={className}
        value={value}
        onSelect={(e) => onClick(e)}
        onSearch={(e) => onChange(e)}
        placeholder={placeholder}
        allowClear={{ clearIcon: clearTextIcon }}
      />
    </>
  );
};

export default Search;
