"use client";

import { useEffect, useState } from "react";

export default function Test() {
  const [data, setData] = useState([
    { id: "div1", color: "#ff0000", contents: { title: "title1", content: "content1" } },
    { id: "div2", color: "#00ff00", contents: { title: "title2", content: "content2" } },
    { id: "div3", color: "#0000ff", contents: { title: "title3", content: "content3" } },
  ]);
  const [isRearrange, setIsRearrange] = useState(false);
  useEffect(() => {
    if (isRearrange) {
      for (const item of data) {
        const target = document.getElementById(item.id);
        if (data.indexOf(item) !== 0) {
          if (data.indexOf(item) === 1) {
            target.style.transform = `translate(90%,-55%)`;
          } else if (data.indexOf(item) === 2) {
            target.style.transform = `translate(90%,55%)`;
          }
          target.style.width = "20%";
          target.style.height = "38%";
          target.firstChild.classList.remove("hidden");
        } else {
          target.style.height = "80%";
          target.style.zIndex = "10";
          target.style.transform = "translate(-36%,0)";
          target.style.transition = "all 0.5s cubic-bezier(0.3, 0.6, 0.5, 1)";
          set;
          target.style.width = "40%";
        }
      }
    }
  }, [data, isRearrange]);

  const rearrange = (e) => {
    e.target.classList.add("hidden");
    setIsRearrange(true);
    const mainTarget = e.target.parentNode;

    let newData = data.filter((item) => item.id === mainTarget.id);
    let subData = data.filter((item) => item.id !== mainTarget.id);

    subData.sort((a, b) => {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    });
    setData([...newData, ...subData]);
  };
  return (
    <main className={`flex justify-center items-center w-full h-full`}>
      <div
        className={`relative w-[60rem] h-[30rem] border border-solid border-gray-700 flex row-span-2 items-center justify-center gap-[2rem]`}
      >
        {data?.map((item, index) => (
          <div
            id={item.id}
            key={item.id}
            className={`absolute ${
              index === 0
                ? "-translate-x-[120%]"
                : index === 1
                ? "translate-x-[0%]"
                : "translate-x-[120%]"
            } origin-top-left bg-[${
              item.color
            }] w-[20%] h-[80%] flex justify-center items-end py-[1rem] rounded-md shadow-[4px_4px_10px_0px_rgba(0,0,0,0.3)]`}
          >
            <button
              className={`w-[5rem] h-[2rem] bg-[#aaaaaa] rounded-md shadow-[2px_2px_10px_0px_rgba(0,0,0,0.3)]`}
              onClick={(e) => {
                e.preventDefault();
                rearrange(e);
              }}
            >
              Click
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
