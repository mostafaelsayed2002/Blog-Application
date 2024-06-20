"use client";
import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "../../Components/cardSkeleton";
import PostCard from "../../Components/postCard";

export default function Home() {
  const [posts, setPosts] = useState<
    {
      id: number;
      title: string;
      body: string;
      tags: string[];
      reactions: { likes: number; dislikes: number };
      views: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/posts");
        if (res.status === 404) return;

        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full lg:w-[800px] md:w-[600px] border-r border-gray-300">
      {loading ? (
        <div className="flex flex-col justify-start mt-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="">
              <CardSkeleton key={index} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center mt-2 ">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              body={
                post.body.length > 100
                  ? post.body.substring(0, 100) + "..."
                  : post.body
              }
              tags={post.tags}
              reactions={post.reactions}
              views={post.views}
              show={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
