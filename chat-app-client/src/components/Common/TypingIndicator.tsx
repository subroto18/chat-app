const TypingIndicator = () => {
  return (
    <div className="bg-gray-200 p-2 rounded inline-flex items-center  my-5 py-5">
      <div className="flex items-center space-x-1">
        <span className="dot animate-pulse bg-gray-500 rounded-full w-2 h-2"></span>
        <span className="dot animate-pulse bg-gray-500 rounded-full w-2 h-2"></span>
        <span className="dot animate-pulse bg-gray-500 rounded-full w-2 h-2"></span>
        <span className="dot animate-pulse bg-gray-500 rounded-full w-2 h-2"></span>
        <span className="dot animate-pulse bg-gray-500 rounded-full w-2 h-2"></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
