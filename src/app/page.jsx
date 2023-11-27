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
      URL.createObjectURL(file);
    });
    setPreview((prev) => [...prev, ...thumbnailTarget]);
    setInputValue(newArr);
  }, [inputRef.current?.files]);

  const onsubmit = async (e) => {
    e.preventDefault();
    const targetData = inputRef.current?.files;
    if (targetData.length === 0) return alert("파일을 선택해주세요.");
    const formData = new FormData();
    for (const item of inputRef.current?.files) {
      formData.append("files", item);
    }
    formData.append("data", "1");
    const response = await axios({
      method: "post",
      // url: `http://118.67.131.205/api/upload/1`,
      // url: `http://localhost:4000/api/upload/1`,
      url: `http://localhost:4444/api/file`,
      // url: `http://139.150.83.134/api/file`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data", Accept: "application/json" },
    }).catch((error) => {
      console.log(error);
    });
    console.log(response?.data);
  };

  return (
    <main className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex flex-col bg-slate-400 w-[400px] h-fit rounded-xl p-5 gap-3 overflow-hidden">
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
        <button
          className="bg-gray-200 rounded-lg px-5 py-1 hover:bg-gray-300 active:scale-[0.98]"
          onClick={onsubmit}
        >
          Submit
        </button>
      </div>
      <div className="mt-4 flex flex-col">
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
