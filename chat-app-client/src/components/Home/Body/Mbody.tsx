import React from "react";
import Container from "../../Common/Container";

const Mbody = () => {
  const data = [
    { name: "Me", message: "Hey, how are you doing?" },
    { name: "Friend", message: "I'm good, thanks! How about you?" },
    {
      name: "Me",
      message:
        "I'm doing well, just busy with work. Any plans for the weekend?",
    },
    {
      name: "Friend",
      message:
        "Not much, just thinking about relaxing and maybe watching a movie. You?",
    },
    {
      name: "Me",
      message: "Sounds nice! I'm planning to go hiking if the weather is good.",
    },
    {
      name: "Friend",
      message: "That sounds fun! Where do you usually go hiking?",
    },
    {
      name: "Me",
      message:
        "There's a nice trail about an hour away from the city. It's a great spot with beautiful views.",
    },
    {
      name: "Friend",
      message: "That sounds awesome. I might join you next time!",
    },
    {
      name: "Me",
      message:
        "You're welcome to join anytime! It would be great to have some company.",
    },
    { name: "Friend", message: "Thanks! I'll definitely keep that in mind." },
  ];

  return (
    <div className="h-[82vh] overflow-auto">
      <Container>
        <div className="py-10">
          {data.map((item, index) => {
            return (
              <div key={index}>
                <div
                  className={`my-6 flex ${
                    item.name == "Me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <span
                    className={` ${
                      item.name == "Me" ? "bg-[#D9FDD2]" : "bg-white"
                    }  rounded-md shadow-md p-3`}
                  >
                    {item.message}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Mbody;
