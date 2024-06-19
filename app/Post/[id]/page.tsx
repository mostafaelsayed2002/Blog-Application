"use client";

import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import PostCard from "../../../Components/postCard";
import CardSkeleton from "@/Components/cardSkeleton";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<{
    title: string;
    id: number;
    body: string;
  } | null>(null);

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
    <div className=" flex flex-col gap-10  m-10 items-center justify-center p-10">
      {loading && <CardSkeleton />}
      {!loading && (
        <PostCard id={post.id} title={post.title} body={post.body} />
      )}
      <div>
        <Link href={`/Home`}>
          <button className=" p-3 bg-[#334f7a] hover:bg-[#3c65a2] text-white text-2xl rounded-lg">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
