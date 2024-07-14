import Tab from "./Tab";

const index = () => {
  return (
    <div className=" w-[25rem] h-auto">
      <div className="flex justify-center py-5 rounded-sm shadow-md border-spacing-1 bg-slate-100">
        <img src="/logo.png" className="h-[80px]" />
      </div>
      <div className="bg-slate-100">
        <Tab />
      </div>
    </div>
  );
};

export default index;
