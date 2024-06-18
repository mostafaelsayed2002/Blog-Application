"use client";
import { error } from "console";
import { useEffect, useState } from "react";
import ResponsiveAppBar from "../ResponsiveAppBar";

export default function Home() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setErrot] = useState("");
  const [created, setCreated] = useState(false);

  function handleSubmit() {
    if (!title || !body) {
      setErrot("You must fill all fields");
      setCreated(false);
      return;
    }
    setErrot("");
    setTitle("");
    setBody("");
    setCreated(true);
  }

  return (
    <>
      <div className="flex flex-col items-center p-10">
        <div className=" font-bold text-4xl">Create Post</div>
        <div>
          <div className="flex flex-col gap-5 mt-5">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              className="p-2 border border-gray-200 rounded-lg"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Body"
              className="p-2 border border-gray-200 rounded-lg"
            />
            <button
              onClick={handleSubmit}
              className="p-2 bg-blue-500 text-white rounded-lg"
            >
              Create
            </button>
          </div>
          {error !== "" && <div className="text-red-500">{error}</div>}
          {created && <div className="text-green-500">Post created</div>}
        </div>
      </div>
    </>
  );
}
