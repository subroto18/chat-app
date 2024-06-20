import Tab from "./Tab";

const index = () => {
  return (
    <div className=" w-[25rem] h-auto">
      <div className="text-center py-5 rounded-sm shadow-md border-spacing-1 bg-slate-100">
        <h1>Talk-A-Tive</h1>
      </div>
      <div className="bg-slate-100">
        <Tab />
      </div>
    </div>
  );
};

export default index;
