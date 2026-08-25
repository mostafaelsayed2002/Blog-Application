import request from "supertest";
import { NotFoundError } from "../src/lib/errors";

jest.mock("../src/services/posts.service");

import { createApp } from "../src/app";
import * as postsService from "../src/services/posts.service";

const mockedService = postsService as jest.Mocked<typeof postsService>;
const app = createApp();

describe("posts routes", () => {
  describe("GET /api/posts", () => {
    it("returns the list of posts", async () => {
      mockedService.listPosts.mockResolvedValue([{ id: 1 }] as any);

      const res = await request(app).get("/api/posts");

      expect(res.status).toBe(200);
      expect(res.body).toEqual([{ id: 1 }]);
    });
  });

  describe("GET /api/posts/:id", () => {
    it("400s on a non-numeric id", async () => {
      const res = await request(app).get("/api/posts/not-a-number");
      expect(res.status).toBe(400);
    });

    it("404s when the service reports not found", async () => {
      mockedService.getPost.mockRejectedValue(new NotFoundError("Post 1 not found"));

      const res = await request(app).get("/api/posts/1");

      expect(res.status).toBe(404);
      expect(res.body.error).toMatch(/not found/i);
    });

    it("200s with the post on success", async () => {
      mockedService.getPost.mockResolvedValue({ id: 1, title: "Hi" } as any);

      const res = await request(app).get("/api/posts/1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: 1, title: "Hi" });
    });
  });

  describe("POST /api/posts", () => {
    it("400s when title is missing", async () => {
      const res = await request(app).post("/api/posts").send({ body: "no title" });
      expect(res.status).toBe(400);
      expect(mockedService.createPost).not.toHaveBeenCalled();
    });

    it("400s when body is missing", async () => {
      const res = await request(app).post("/api/posts").send({ title: "no body" });
      expect(res.status).toBe(400);
    });

    it("201s and creates the post on valid input", async () => {
      mockedService.createPost.mockResolvedValue({ id: 1, title: "T", body: "B", tags: [] } as any);

      const res = await request(app)
        .post("/api/posts")
        .send({ title: "T", body: "B" });

      expect(res.status).toBe(201);
      expect(mockedService.createPost).toHaveBeenCalledWith({
        title: "T",
        body: "B",
        tags: [],
      });
    });
  });

  describe("PATCH /api/posts/:id/reaction", () => {
    it("400s on an invalid reaction type", async () => {
      const res = await request(app)
        .patch("/api/posts/1/reaction")
        .send({ type: "love", delta: 1 });

      expect(res.status).toBe(400);
    });

    it("400s on an invalid delta", async () => {
      const res = await request(app)
        .patch("/api/posts/1/reaction")
        .send({ type: "like", delta: 5 });

      expect(res.status).toBe(400);
    });

    it("200s on a valid reaction", async () => {
      mockedService.reactToPost.mockResolvedValue({ id: 1, likes: 1 } as any);

      const res = await request(app)
        .patch("/api/posts/1/reaction")
        .send({ type: "like", delta: 1 });

      expect(res.status).toBe(200);
      expect(mockedService.reactToPost).toHaveBeenCalledWith(1, "like", 1);
    });
  });

  describe("POST /api/posts/:id/comments", () => {
    it("400s when body is missing", async () => {
      const res = await request(app).post("/api/posts/1/comments").send({});
      expect(res.status).toBe(400);
    });

    it("201s and creates the comment", async () => {
      mockedService.createComment.mockResolvedValue({ id: 1, body: "Nice" } as any);

      const res = await request(app)
        .post("/api/posts/1/comments")
        .send({ body: "Nice", authorName: "Jane" });

      expect(res.status).toBe(201);
      expect(mockedService.createComment).toHaveBeenCalledWith(1, {
        body: "Nice",
        authorName: "Jane",
      });
    });
  });

  describe("PATCH /api/comments/:id/like", () => {
    it("400s on an invalid delta", async () => {
      const res = await request(app).patch("/api/comments/1/like").send({ delta: 0 });
      expect(res.status).toBe(400);
    });

    it("200s on a valid like", async () => {
      mockedService.likeComment.mockResolvedValue({ id: 1, likes: 1 } as any);

      const res = await request(app).patch("/api/comments/1/like").send({ delta: 1 });

      expect(res.status).toBe(200);
      expect(mockedService.likeComment).toHaveBeenCalledWith(1, 1);
    });
  });
});
