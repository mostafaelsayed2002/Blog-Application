"use client";

import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import PostCard from "../../../Components/postCard";
import CardSkeleton from "@/Components/cardSkeleton";
import CommentCard from "@/Components/commentCard";
import CommentSkeleton from "@/Components/commentSkeleton";

export default function Page({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [post, setPost] = useState<{
    title: string;
    id: number;
    body: string;
    tags: string[];
    reactions: { likes: number; dislikes: number };
    views: number;
    show: boolean;
  } | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);

  interface Comment {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: {
      id: number;
      username: string;
      fullName: string;
    };
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/posts/${params.id}`);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/posts/${params.id}/comments`
        );
        if (res.status === 404) return;

        const data = await res.json();
        setComments(data.comments);
        setLoading2(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen  flex flex-col  border-r border-gray-300 w-full lg:w-[800px] md:w-[600px]">
      {loading && loading2 && (
        <div className="flex flex-col justify-start mt-2 ">
          <div className="w-full">
            <CardSkeleton />
          </div>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="">
              <CommentSkeleton key={index} />
            </div>
          ))}
        </div>
      )}

      {!loading && !loading2 && post && (
        <PostCard
          id={post.id}
          title={post.title}
          body={post.body}
          reactions={post.reactions}
          views={post.views}
          tags={post.tags}
          show={false}
        />
      )}

      <div className="h-full mt-4 flex flex-col gap-4">
        {!loading &&
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              id={comment.id}
              body={comment.body}
              likes={comment.likes}
              username={comment.user.username}
              fullName={comment.user.fullName}
            />
          ))}
      </div>
    </div>
  );
}
