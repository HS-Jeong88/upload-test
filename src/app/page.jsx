"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState([]);
  const inputRef = useRef(null);
  console.log(inputRef.current?.files);
  useEffect(() => {
    const newArr = [];
    for (const items of inputRef.current.files) {
      newArr.push(items);
    }
    setInputValue(newArr);
  }, [inputRef.current?.files]);

  const onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const targetData = inputRef.current.files;
    const jsonData = "1";
    for (const item of targetData) {
      formData.append("files", item);
    }
    formData.append("data", jsonData);
    try {
      const response = await axios.post("http://localhost:8000/api/upload/approval", formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col bg-slate-400 w-[400px] h-[400px] rounded-xl p-5 gap-3 overflow-hidden">
        <input type="file" name="files" id="files" multiple className="hidden" ref={inputRef} />
        <button
          className="bg-gray-200 rounded-lg px-5 py-1 hover:bg-gray-300 active:scale-[0.98]"
          onClick={() => {
            document.getElementById("files").click();
          }}
        >
          Upload
        </button>
        <div className="h-full">
          {inputValue?.map((file) => (
            <div key={file.name} className="flex flex-col">
              <p className="truncate" title={file.name}>
                {file.name}
              </p>
            </div>
          ))}
        </div>
        <button
          className="bg-gray-200 rounded-lg px-5 py-1 hover:bg-gray-300 active:scale-[0.98]"
          onClick={onsubmit}
        >
          Submit
        </button>
      </div>
    </main>
  );
}
