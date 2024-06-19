"use client";
import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "../../Components/cardSkeleton";
import PostCard from "../../Components/postCard";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState<
    { id: number; title: string; body: string }[]
  >([]);
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
    <div>
      <h4 className=" text-4xl font-bold flex  justify-center  mt-10">
        Here are all the posts
      </h4>

      {loading ? (
        <div className="flex items-center justify-center ">
          {" "}
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-5 mt-10">
            {Array.from({ length: 10 }).map((_, index) => (
              <div className="h-[300px] w-[400px]">
                <CardSkeleton key={index} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center ">
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-5 mt-10">
            {posts.map((post) => (
              <Link key={post.id} href={`/Post/${post.id}`}>
                <div className="h-[300px] w-[400px]">
                  <PostCard
                    id={post.id}
                    title={post.title}
                    body={
                      post.body.length > 100
                        ? post.body.substring(0, 100) + "..."
                        : post.body
                    }
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
