"use client";

import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import PostCard from "../../../Components/postCard";
import CardSkeleton from "@/Components/cardSkeleton";
import CommentCard from "@/Components/commentCard";
import CommentSkeleton from "@/Components/commentSkeleton";
import { getComments, getPost, Post, Comment } from "@/lib/api";

export default function Page({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPost(params.id);
        setPost(data);
      } catch (err) {
        console.error(err);
        setError("Could not load this post.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getComments(params.id);
        setComments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading2(false);
      }
    };
    fetchData();
  }, [params.id]);

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

      {!loading && error && (
        <div className="p-4 text-red-500 text-lg">{error}</div>
      )}

      {!loading && !loading2 && post && (
        <PostCard
          id={post.id}
          title={post.title}
          body={post.body}
          reactions={{ likes: post.likes, dislikes: post.dislikes }}
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
              authorName={comment.authorName}
            />
          ))}
      </div>
    </div>
  );
}
