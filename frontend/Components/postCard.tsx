import Link from "next/link";
import { useState } from "react";

export default function PostCard({
  id,
  title,
  body,
  tags,
  reactions,
  views,
  show,
}: {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: { likes: number; dislikes: number };
  views: number;
  show: boolean;
}) {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  return (
    <div key={id} className="w-full  p-4 bg-white border-b border-gray-300">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
        {title}
      </h5>
      <p className="font-normal text-gray-700">{body}</p>
      <div className="flex gap-2 mt-5">
        {tags.map((tag) => (
          <div
            key={tag}
            className="px-2 py-1 text-sm font-bold text-gray-800 bg-gray-200 rounded-full"
          >
            #{tag}
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-4 mt-4">
          <div className="flex gap-1">
            <button
              onClick={(e) => {
                setLike(!like);
                setDislike(false);
              }}
              className=" hover:bg-gray-200  rounded-3xl"
            >
              <svg
                className={`w-6 h-6 text-gray-800 ${
                  like ? "fill-blue-500" : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <p className="font-bold mt-1 text-center">
              {like ? reactions.likes + 1 : reactions.likes}
            </p>
          </div>

          <div className="flex gap-1 ">
            <button
              className="hover:bg-gray-200 rounded-3xl"
              onClick={(e) => {
                setDislike(!dislike);
                setLike(false);
              }}
            >
              <svg
                className={`w-6 h-6 text-gray-800 mt-1 ${
                  dislike ? "fill-blue-500" : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.97 14.316H5.004c-.322 0-.64-.08-.925-.232a2.022 2.022 0 0 1-.717-.645 2.108 2.108 0 0 1-.242-1.883l2.36-7.201C5.769 3.54 5.96 3 7.365 3c2.072 0 4.276.678 6.156 1.256.473.145.925.284 1.35.404h.114v9.862a25.485 25.485 0 0 0-4.238 5.514c-.197.376-.516.67-.901.83a1.74 1.74 0 0 1-1.21.048 1.79 1.79 0 0 1-.96-.757 1.867 1.867 0 0 1-.269-1.211l1.562-4.63ZM19.822 14H17V6a2 2 0 1 1 4 0v6.823c0 .65-.527 1.177-1.177 1.177Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <p className="font-bold pt-[4px] text-center">
              {dislike ? reactions.dislikes + 1 : reactions.dislikes}
            </p>
          </div>
        </div>
        <div className="flex gap-1  pt-[17px]">
          <div>
            <svg
              className="w-6 h-6  text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <p className="font-bold  text-center">{views}</p>
        </div>

        {show && (
          <div className="pt-[13px]">
            <Link href={`/Post/${id}`}>
              <svg
                className="w-8 h-8 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
