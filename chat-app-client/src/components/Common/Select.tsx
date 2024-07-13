import { Select } from "antd";
const { Option } = Select;

const SelectInput = ({
  mode,
  className,
  onSearch,
  options,
  placeholder,
  onChange,
  value,
}: any) => {
  return (
    <Select
      allowClear
      showSearch
      mode={mode}
      className={className}
      placeholder={placeholder}
      onSearch={onSearch}
      options={options}
      filterOption={false}
      onChange={onChange}
      value={value}
    >
      {options.map((option) => (
        <Option key={option.value} value={option}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default SelectInput;
