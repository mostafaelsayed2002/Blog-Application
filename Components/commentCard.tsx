import { useState } from "react";

export default function CommentCard({
  id,
  body,
  likes,
  username,
  fullName,
}: {
  id: number;
  body: string;
  likes: number;
  username: string;
  fullName: string;
}): any {
  const [like, setLike] = useState(false);
  return (
    <div className="border-b p-4 border-gray-300">
      <div className="flex gap-3 ">
        <img
          src="https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
          className="mt-1 rounded-full w-10 h-10 border-2 border-black"
        />
        <div className="flex flex-col">
          <p className="font-bold">{fullName}</p>
          <p className="text-gray-700">@{username}</p>
        </div>
      </div>

      <p className="font-normal mt-2">{body}</p>
      <div className="flex gap-1">
        <button
          onClick={() => {
            setLike(!like);
          }}
          className=" hover:bg-gray-200 mt-1  rounded-3xl"
        >
          <svg
            className={`w-6 h-6 text-gray-800 ${like ? "fill-blue-500" : ""}`}
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
        <p className="font-bold mt-2 text-center">{like ? likes + 1 : likes}</p>
      </div>
    </div>
  );
}
