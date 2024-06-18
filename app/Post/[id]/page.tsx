"use client";
import ResponsiveAppBar from "@/app/ResponsiveAppBar";
import { useEffect, useState } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Page({ params }: { params: { id: string } }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          ` https://jsonplaceholder.typicode.com/posts/${params.id}`
        );
        if (res.status === 404) return;

        const data = await res.json();

        setPost(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <div className="flex flex-col items-center gap-5 p-5">
        {loading ? (
          <Skeleton />
        ) : (
          <div
            key={post.id}
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {post.body}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
