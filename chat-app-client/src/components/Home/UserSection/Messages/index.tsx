import Container from "../../../Common/Container";

const index = () => {
  return (
    <div className=" w-full  bg-slate-50 ">
      {[...Array(10)].map((item) => {
        return (
          <div
            key={item}
            className="hover:bg-slate-300 hover:cursor-pointer border-b-2 overflow-y-auto "
          >
            <Container>
              <div className="flex py-2 ">
                <div className="flex items-center w-[12%]">
                  <img
                    className="h-[50px] rounded-full"
                    src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  />
                </div>
                <div className="ml-2 flex justify-between w-[90%]">
                  <div className="">
                    <h1 className="font-semibold">Team @ Revivo</h1>
                    <p className="text-sm text-slate-600">
                      Rahul ji : This messgae was deleted
                    </p>
                  </div>
                  <div className="">
                    <p className="text-sm text-slate-600 mt-1">Yesterday</p>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        );
      })}
    </div>
  );
};

export default index;
