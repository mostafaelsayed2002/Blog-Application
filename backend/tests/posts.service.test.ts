import { Prisma } from "@prisma/client";
import { NotFoundError } from "../src/lib/errors";

jest.mock("../src/lib/prisma", () => ({
  prisma: {
    post: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    comment: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}));

import { prisma } from "../src/lib/prisma";
import * as postsService from "../src/services/posts.service";

const mockedPrisma = prisma as unknown as {
  post: Record<string, jest.Mock>;
  comment: Record<string, jest.Mock>;
};

function notFoundPrismaError() {
  return new Prisma.PrismaClientKnownRequestError("Record not found", {
    code: "P2025",
    clientVersion: "5.18.0",
  });
}

describe("posts.service", () => {
  describe("listPosts", () => {
    it("returns posts from prisma", async () => {
      const posts = [{ id: 1, title: "Hello" }];
      mockedPrisma.post.findMany.mockResolvedValue(posts);

      const result = await postsService.listPosts();

      expect(result).toBe(posts);
      expect(mockedPrisma.post.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ orderBy: { createdAt: "desc" } })
      );
    });
  });

  describe("getPost", () => {
    it("returns the post when found", async () => {
      const post = { id: 1, title: "Hello" };
      mockedPrisma.post.findUnique.mockResolvedValue(post);

      const result = await postsService.getPost(1);

      expect(result).toBe(post);
    });

    it("throws NotFoundError when missing", async () => {
      mockedPrisma.post.findUnique.mockResolvedValue(null);

      await expect(postsService.getPost(999)).rejects.toThrow(NotFoundError);
    });
  });

  describe("createPost", () => {
    it("creates a post with the given data", async () => {
      const data = { title: "Title", body: "Body", tags: ["a"] };
      const created = { id: 1, ...data };
      mockedPrisma.post.create.mockResolvedValue(created);

      const result = await postsService.createPost(data);

      expect(result).toBe(created);
      expect(mockedPrisma.post.create).toHaveBeenCalledWith({ data });
    });
  });

  describe("deletePost", () => {
    it("deletes the post and returns it", async () => {
      const deleted = { id: 1, title: "Gone" };
      mockedPrisma.post.delete.mockResolvedValue(deleted);

      const result = await postsService.deletePost(1);

      expect(result).toBe(deleted);
      expect(mockedPrisma.post.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it("throws NotFoundError when the post does not exist", async () => {
      mockedPrisma.post.delete.mockRejectedValue(notFoundPrismaError());

      await expect(postsService.deletePost(404)).rejects.toThrow(NotFoundError);
    });

    it("rethrows unexpected errors instead of swallowing them", async () => {
      mockedPrisma.post.delete.mockRejectedValue(new Error("connection lost"));

      await expect(postsService.deletePost(1)).rejects.toThrow("connection lost");
    });
  });

  describe("reactToPost", () => {
    it("increments likes", async () => {
      const updated = { id: 1, likes: 1 };
      mockedPrisma.post.update.mockResolvedValue(updated);

      const result = await postsService.reactToPost(1, "like", 1);

      expect(result).toBe(updated);
      expect(mockedPrisma.post.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { likes: { increment: 1 } },
      });
    });

    it("increments dislikes", async () => {
      mockedPrisma.post.update.mockResolvedValue({ id: 1, dislikes: 1 });

      await postsService.reactToPost(1, "dislike", 1);

      expect(mockedPrisma.post.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { dislikes: { increment: 1 } },
      });
    });

    it("throws NotFoundError when the post does not exist", async () => {
      mockedPrisma.post.update.mockRejectedValue(notFoundPrismaError());

      await expect(postsService.reactToPost(404, "like", 1)).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe("listComments", () => {
    it("throws NotFoundError when the post does not exist", async () => {
      mockedPrisma.post.findUnique.mockResolvedValue(null);

      await expect(postsService.listComments(404)).rejects.toThrow(NotFoundError);
    });

    it("returns comments for an existing post", async () => {
      mockedPrisma.post.findUnique.mockResolvedValue({ id: 1 });
      const comments = [{ id: 1, body: "Nice" }];
      mockedPrisma.comment.findMany.mockResolvedValue(comments);

      const result = await postsService.listComments(1);

      expect(result).toBe(comments);
    });
  });

  describe("createComment", () => {
    it("defaults authorName to Anonymous when blank", async () => {
      mockedPrisma.post.findUnique.mockResolvedValue({ id: 1 });
      mockedPrisma.comment.create.mockResolvedValue({ id: 1 });

      await postsService.createComment(1, { body: "Nice post" });

      expect(mockedPrisma.comment.create).toHaveBeenCalledWith({
        data: { postId: 1, body: "Nice post", authorName: "Anonymous" },
      });
    });

    it("throws NotFoundError when the post does not exist", async () => {
      mockedPrisma.post.findUnique.mockResolvedValue(null);

      await expect(
        postsService.createComment(404, { body: "Nice post" })
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe("likeComment", () => {
    it("throws NotFoundError when the comment does not exist", async () => {
      mockedPrisma.comment.update.mockRejectedValue(notFoundPrismaError());

      await expect(postsService.likeComment(404, 1)).rejects.toThrow(NotFoundError);
    });
  });
});
