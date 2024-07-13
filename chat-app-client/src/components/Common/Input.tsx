const Input = ({ className, onChange, value, placeholder, onKeyDown }: any) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      onKeyDown(e.target.value);
    }
  };

  const handeChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <>
      <input
        onChange={(e) => handeChange(e)}
        value={value}
        onKeyDown={(e) => handleKeyPress(e)}
        type="text"
        className={
          className
            ? className
            : "w-[100%] m-auto bg-slate-50 border  border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:outline-none block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-none text-xs"
        }
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
