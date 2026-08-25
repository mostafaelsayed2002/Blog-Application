"use client";
import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "../../Components/cardSkeleton";
import PostCard from "../../Components/postCard";
import { getPosts, Post } from "../../lib/api";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("Could not load posts. Is the backend running?");
      } finally {
        setLoading(false);
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
      ) : error ? (
        <div className="p-4 text-red-500 text-lg">{error}</div>
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
              reactions={{ likes: post.likes, dislikes: post.dislikes }}
              views={post.views}
              show={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
