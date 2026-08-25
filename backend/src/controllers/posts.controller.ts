import { Request, Response } from "express";
import { ValidationError } from "../lib/errors";
import * as postsService from "../services/posts.service";

const MAX_TITLE_LENGTH = 200;

function parseId(raw: string, label: string): number {
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ValidationError(`Invalid ${label} id`);
  }
  return id;
}

export async function listPosts(_req: Request, res: Response) {
  const posts = await postsService.listPosts();
  res.json(posts);
}

export async function getPost(req: Request, res: Response) {
  const id = parseId(req.params.id, "post");
  const post = await postsService.getPost(id);
  res.json(post);
}

export async function createPost(req: Request, res: Response) {
  const { title, body, tags } = req.body ?? {};

  if (typeof title !== "string" || title.trim() === "") {
    throw new ValidationError("title is required");
  }
  if (title.trim().length > MAX_TITLE_LENGTH) {
    throw new ValidationError(`title must be ${MAX_TITLE_LENGTH} characters or fewer`);
  }
  if (typeof body !== "string" || body.trim() === "") {
    throw new ValidationError("body is required");
  }
  if (tags !== undefined && (!Array.isArray(tags) || !tags.every((t) => typeof t === "string"))) {
    throw new ValidationError("tags must be an array of strings");
  }

  const post = await postsService.createPost({
    title: title.trim(),
    body: body.trim(),
    tags: tags ?? [],
  });
  res.status(201).json(post);
}

export async function reactToPost(req: Request, res: Response) {
  const id = parseId(req.params.id, "post");
  const { type, delta } = req.body ?? {};

  if (type !== "like" && type !== "dislike") {
    throw new ValidationError('type must be "like" or "dislike"');
  }
  if (delta !== 1 && delta !== -1) {
    throw new ValidationError("delta must be 1 or -1");
  }

  const post = await postsService.reactToPost(id, type, delta);
  res.json(post);
}

export async function incrementView(req: Request, res: Response) {
  const id = parseId(req.params.id, "post");
  const post = await postsService.incrementView(id);
  res.json(post);
}

export async function listComments(req: Request, res: Response) {
  const postId = parseId(req.params.id, "post");
  const comments = await postsService.listComments(postId);
  res.json(comments);
}

export async function createComment(req: Request, res: Response) {
  const postId = parseId(req.params.id, "post");
  const { body, authorName } = req.body ?? {};

  if (typeof body !== "string" || body.trim() === "") {
    throw new ValidationError("body is required");
  }
  if (authorName !== undefined && typeof authorName !== "string") {
    throw new ValidationError("authorName must be a string");
  }

  const comment = await postsService.createComment(postId, {
    body: body.trim(),
    authorName,
  });
  res.status(201).json(comment);
}

export async function likeComment(req: Request, res: Response) {
  const id = parseId(req.params.id, "comment");
  const { delta } = req.body ?? {};

  if (delta !== 1 && delta !== -1) {
    throw new ValidationError("delta must be 1 or -1");
  }

  const comment = await postsService.likeComment(id, delta);
  res.json(comment);
}
