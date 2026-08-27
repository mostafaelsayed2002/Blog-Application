const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  likes: number;
  dislikes: number;
  views: number;
  createdAt: string;
}

export interface Comment {
  id: number;
  postId: number;
  body: string;
  authorName: string;
  likes: number;
  createdAt: string;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!res.ok) {
    const message = await res
      .json()
      .then((data) => data.error)
      .catch(() => undefined);
    throw new Error(message || `Request failed with status ${res.status}`);
  }

  // 204 No Content has an empty body — calling res.json() on it throws.
  if (res.status === 204) return undefined as T;

  return res.json();
}

export function getPosts(): Promise<Post[]> {
  return apiFetch<Post[]>("/posts");
}

export function getPost(id: number | string): Promise<Post> {
  return apiFetch<Post>(`/posts/${id}`);
}

export function createPost(data: {
  title: string;
  body: string;
  tags?: string[];
}): Promise<Post> {
  return apiFetch<Post>("/posts", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function deletePost(id: number | string): Promise<void> {
  return apiFetch<void>(`/posts/${id}`, { method: "DELETE" });
}

export function reactToPost(
  id: number | string,
  type: "like" | "dislike",
  delta: 1 | -1
): Promise<Post> {
  return apiFetch<Post>(`/posts/${id}/reaction`, {
    method: "PATCH",
    body: JSON.stringify({ type, delta }),
  });
}

export function getComments(postId: number | string): Promise<Comment[]> {
  return apiFetch<Comment[]>(`/posts/${postId}/comments`);
}

export function createComment(
  postId: number | string,
  data: { body: string; authorName?: string }
): Promise<Comment> {
  return apiFetch<Comment>(`/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function likeComment(
  id: number | string,
  delta: 1 | -1
): Promise<Comment> {
  return apiFetch<Comment>(`/comments/${id}/like`, {
    method: "PATCH",
    body: JSON.stringify({ delta }),
  });
}
