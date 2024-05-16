---
layout: ../../layouts/post.astro
title: "Exploring Bun Runtime"
pubDate: 2024-01-07
description: "Exploring Modern Web Development with Bun and Elysia.js"
author: "Prabhat"
excerpt: Bun is a modern JavaScript runtime and package manager that aims to provide a faster, more efficient development experience compared to traditional tools like Node.js.
image:
  src:
  alt:
tags: ["nodejs", "runtime", "web", "development"]
---

![Bun & Elysia](/images/bun_elysia.png "Bun Elysia")

The world of web development is constantly evolving, with new tools and frameworks emerging to improve efficiency, performance, and developer experience. Two such modern tools that have garnered attention recently are Bun and Elysia.js. Let's dive into what makes these technologies stand out and how they can enhance your development workflow.

## What is [Bun](https://bun.sh/)?

Bun is a modern JavaScript runtime and package manager that aims to provide a faster, more efficient development experience compared to traditional tools like Node.js and npm.

> Bun is both runtime and javascript environment it is written in c++, zig and uses safari js engine. Natively support web api, websocket, fetch. Compare to Node which is runtime uses chrome v8 engine.

### Key Features

1. Native TS Support
2. Runtime
3. Bundler
4. Package manager
5. Test suit

### Get Started

```bash
curl https://bun.sh/install | bash
```

Once installed, you can use Bun to create a new project, install packages, and run scripts. For example, to create a new project

```bash
bun create my-app
cd my-app
bun install
```

start a server once created a application

```typescript
const server = Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response("Welcome to Bun!");
  },
});

console.log(`Listening on localhost:${server.port}`);
```

## What is Elysia.js?

Elysia.js is a modern, lightweight web framework for building high-performance web applications. It is designed to be simple yet powerful, making it a great choice for developers who want to build scalable and maintainable applications.

### Key features

1. Minimalist Design: Elysia.js has a minimalist API, which makes it easy to learn and use.
2. High Performance: The framework is optimized for performance, ensuring that your applications run smoothly even under heavy load.
3. Flexibility: Elysia.js is flexible and can be used to build a wide range of applications, from simple APIs to complex web applications.

Let add elysia to project

```bash
bun add elysia
```

Next, create a basic API:

```typescript
import { Elysia } from "elysia";

const app = new Elysia();

await connectDb();

app.use(new controller().routes()); // routes

//Error handler
const PORT = process.env.PORT as string;
app
  // if routes match then it goes to error block
  .onError(({ code }) => {
    if (code === "NOT_FOUND") return "Route not found :(";
    else "Something went wrong!";
  })
  // Server listener
  .listen(PORT, () => {
    console.log(`Server started on ${app.server?.hostname}:${PORT}`);
  });
```

Let take a look at controller code

```typescript
export default class Controller extends BaseController {
  constructor() {
    super(Controller.name);
  }

  private async handler(context: Context) {} // api handler

  public routes() {
    return this.app.group("api/v1/path", (app) =>
      app.get("/inner_path", this.handler.bind(this), {
        // Validations
        query: t.Object({
          fieldName: t.Optional(t.String()),
        }),
      })
    );
  }
}
```

## Conclusion

Bun and Elysia.js represent a new wave of tools in the JavaScript ecosystem that focus on speed, simplicity, and performance. Bun streamlines the development process by combining runtime, package management, and bundling into a single tool, while Elysia.js offers a minimalist yet powerful framework for building web applications. Together, they provide a compelling stack for modern web development.

Whether you're a seasoned developer looking to try new tools or a newcomer to the field, Bun and Elysia.js are worth exploring to enhance your development workflow and build efficient, scalable applications.
