import { Router } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import * as postsController from "../controllers/posts.controller";

export const postsRouter = Router();

postsRouter.get("/posts", asyncHandler(postsController.listPosts));
postsRouter.post("/posts", asyncHandler(postsController.createPost));
postsRouter.get("/posts/:id", asyncHandler(postsController.getPost));
postsRouter.delete("/posts/:id", asyncHandler(postsController.deletePost));
postsRouter.patch("/posts/:id/reaction", asyncHandler(postsController.reactToPost));
postsRouter.post("/posts/:id/view", asyncHandler(postsController.incrementView));

postsRouter.get("/posts/:id/comments", asyncHandler(postsController.listComments));
postsRouter.post("/posts/:id/comments", asyncHandler(postsController.createComment));

postsRouter.patch("/comments/:id/like", asyncHandler(postsController.likeComment));
