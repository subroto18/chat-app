const TypingIndicator = () => {
  return (
    <div className="flex space-x-2 mt-4">
      <div className="w-2 h-2 bg-slate-600 rounded-full animate-bounce delay-0"></div>
      <div className="w-2 h-2 bg-slate-600  rounded-full animate-bounce delay-200"></div>
      <div className="w-2 h-2  bg-slate-600  rounded-full animate-bounce delay-400"></div>
    </div>
  );
};

export default TypingIndicator;
