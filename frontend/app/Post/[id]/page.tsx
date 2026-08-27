"use client";

import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import PostCard from "../../../Components/postCard";
import CardSkeleton from "@/Components/cardSkeleton";
import CommentCard from "@/Components/commentCard";
import CommentSkeleton from "@/Components/commentSkeleton";
import { useRouter } from "next/navigation";
import { deletePost, getComments, getPost, Post, Comment } from "@/lib/api";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState("");
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    setError("");
    try {
      await deletePost(params.id);
      // refresh() clears the router cache so /Home refetches instead of
      // showing the deleted post from a stale render.
      router.replace("/Home");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Could not delete this post");
      setDeleting(false);
      setConfirmingDelete(false);
    }
  }

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
        <>
          <PostCard
            id={post.id}
            title={post.title}
            body={post.body}
            reactions={{ likes: post.likes, dislikes: post.dislikes }}
            views={post.views}
            tags={post.tags}
            show={false}
          />

          <div className="px-4 py-3 border-b border-gray-300">
            {confirmingDelete ? (
              <div className="flex flex-col gap-2">
                <p className="font-bold text-gray-900">
                  Delete this post? Its comments will be removed too. This
                  cannot be undone.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 font-bold text-white rounded-lg"
                  >
                    {deleting ? "Deleting..." : "Yes, delete"}
                  </button>
                  <button
                    onClick={() => setConfirmingDelete(false)}
                    disabled={deleting}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 font-bold text-gray-900 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setConfirmingDelete(true)}
                className="flex gap-2 items-center px-3 py-2 hover:bg-red-50 text-red-600 font-bold rounded-lg"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete post
              </button>
            )}
          </div>
        </>
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
