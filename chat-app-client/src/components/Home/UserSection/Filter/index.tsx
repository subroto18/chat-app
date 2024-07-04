import Container from "../../../Common/Container";

const index = () => {
  return (
    <Container>
      <div className="flex py-2 ">
        <div className="bg-green-200 px-4 text-green-500 rounded-lg mr-2 py-1">
          All
        </div>
        <div className="bg-slate-200 px-4 text-slate-500 rounded-lg mr-2 py-1">
          Groups
        </div>
      </div>
    </Container>
  );
};

export default index;
