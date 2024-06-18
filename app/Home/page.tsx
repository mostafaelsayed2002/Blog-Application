"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ResponsiveAppBar from "../ResponsiveAppBar";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (res.status === 404) return;

        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      {loading ? (
        <Skeleton />
      ) : (
        <div className="flex flex-col items-center gap-5 p-5">
          {posts.map((post) => (
            <>
              <Link key={post.id} href={`/Post/${post.id}`}>
                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {post.title}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {post.body.length > 100
                      ? post.body.substring(0, 100) + "..."
                      : post.body}
                  </p>
                </div>
              </Link>
            </>
          ))}
        </div>
      )}
    </main>
  );
}
