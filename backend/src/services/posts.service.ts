import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { NotFoundError } from "../lib/errors";

const POST_LIST_SELECT = {
  id: true,
  title: true,
  body: true,
  tags: true,
  likes: true,
  dislikes: true,
  views: true,
  createdAt: true,
} satisfies Prisma.PostSelect;

function isNotFoundPrismaError(err: unknown): boolean {
  return (
    err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025"
  );
}

export async function listPosts() {
  return prisma.post.findMany({
    select: POST_LIST_SELECT,
    orderBy: { createdAt: "desc" },
  });
}

export async function getPost(id: number) {
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) throw new NotFoundError(`Post ${id} not found`);
  return post;
}

export async function createPost(data: {
  title: string;
  body: string;
  tags: string[];
}) {
  return prisma.post.create({ data });
}

export async function reactToPost(
  id: number,
  type: "like" | "dislike",
  delta: 1 | -1
) {
  const field = type === "like" ? "likes" : "dislikes";
  try {
    return await prisma.post.update({
      where: { id },
      data: { [field]: { increment: delta } },
    });
  } catch (err) {
    if (isNotFoundPrismaError(err)) throw new NotFoundError(`Post ${id} not found`);
    throw err;
  }
}

export async function incrementView(id: number) {
  try {
    return await prisma.post.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  } catch (err) {
    if (isNotFoundPrismaError(err)) throw new NotFoundError(`Post ${id} not found`);
    throw err;
  }
}

export async function listComments(postId: number) {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new NotFoundError(`Post ${postId} not found`);

  return prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: "asc" },
  });
}

export async function createComment(
  postId: number,
  data: { body: string; authorName?: string }
) {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new NotFoundError(`Post ${postId} not found`);

  return prisma.comment.create({
    data: {
      postId,
      body: data.body,
      authorName: data.authorName?.trim() || "Anonymous",
    },
  });
}

export async function likeComment(id: number, delta: 1 | -1) {
  try {
    return await prisma.comment.update({
      where: { id },
      data: { likes: { increment: delta } },
    });
  } catch (err) {
    if (isNotFoundPrismaError(err)) throw new NotFoundError(`Comment ${id} not found`);
    throw err;
  }
}
