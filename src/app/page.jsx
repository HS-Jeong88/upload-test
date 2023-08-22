"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState([]);
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const inputRef = useRef(null);
  useEffect(() => {
    const newArr = Array.from(inputRef.current?.files).map((file) => {
      return file;
    });
    const thumbnailTarget = Array.from(inputRef.current?.files).map((file) => {
      return URL.createObjectURL(file);
    });
    setPreview((prev) => [...prev, ...thumbnailTarget]);
    setInputValue(newArr);
  }, [inputRef.current?.files, preview]);

  const onsubmit = async (e) => {
    e.preventDefault();
    const targetData = inputRef.current?.files;
    if (targetData.length === 0) return alert("파일을 선택해주세요.");
    const formData = new FormData();
    for (const item of inputRef.current?.files) {
      formData.append("files", item);
    }
    formData.append("data", "1");
    const index = "1";
    const id = "apz1031";
    const response = await axios({
      method: "post",
      url: `https://crescenthook.net/api/upload/account/${id}`,
      // url: `http://localhost:8000/api/upload/account/${id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data", Accept: "application/json" },
    }).catch((error) => {
      console.log(error);
    });
    console.log(response.data);
  };

  return (
    <main className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col bg-slate-400 w-[400px] h-[400px] rounded-xl p-5 gap-3 overflow-hidden">
        <input type="file" name="files" id="files" multiple className="hidden" ref={inputRef} />
        <button
          className="bg-gray-200 rounded-lg px-5 py-1 hover:bg-gray-300 active:scale-[0.98]"
          onClick={() => {
            setPreview([]);
            document.getElementById("files").click();
          }}
        >
          Upload
        </button>
        <div className="h-full"></div>
        <button
          className="bg-gray-200 rounded-lg px-5 py-1 hover:bg-gray-300 active:scale-[0.98]"
          onClick={onsubmit}
        >
          Submit
        </button>
      </div>
      <div className="">
        {inputValue?.map((file, index) => (
          <div key={file.name} className="flex flex-col">
            <div className="w-52 h-52 flex relative">
              <Image src={preview[index]} fill alt="" />
            </div>
            <p className="truncate" title={file.name}>
              {file.name}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
