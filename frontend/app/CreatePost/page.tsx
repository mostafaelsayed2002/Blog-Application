"use client";
import { TextField } from "@mui/material";
import { useState } from "react";
import { createPost } from "@/lib/api";

export default function Home() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (title.trim() === "" || body.trim() === "") {
      setError("You must fill all fields");
      setCreated(false);
      return;
    }
    if (title.length > 100) {
      setError("Title must be less than 100 characters");
      setCreated(false);
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await createPost({ title: title.trim(), body: body.trim() });
      setTitle("");
      setBody("");
      setCreated(true);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Could not create post");
      setCreated(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className=" w-full lg:w-[800px] md:w-[600px] h-screen flex flex-col items-center   p-3 border-r border-gray-300">
      <div className="font-bold mt-9 text-4xl">Create Post</div>
      <div className="w-full ">
        <div className=" flex flex-col gap-5 mt-5">
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Body"
            className="max-h-[400px] min-h-[100px] h-[200px] p-2 border border-gray-400 rounded-md placeholder:text-gray-500 "
          />
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="p-2 bg-black hover:bg-[#112e5b] disabled:opacity-50 font-bold text-xl text-white rounded-lg"
          >
            {submitting ? "Creating..." : "Create"}
          </button>
        </div>
        {error !== "" && <div className="text-red-500 text-lg">{error}</div>}
        {created && <div className="text-green-500 text-lg">Post created</div>}
      </div>
    </div>
  );
}
