# Deploying to Vercel

This guide provides step-by-step instructions for deploying this full-stack React and Node.js application to Vercel.

## Prerequisites

1.  A [Vercel](https://vercel.com/) account.
2.  Your project pushed to a Git repository (e.g., GitHub, GitLab, Bitbucket).

## Deployment Steps

### 1. Import Your Project

-   Log in to your Vercel dashboard.
-   Click the "Add New..." button and select "Project".
-   Import the Git repository that contains your project.

### 2. Configure and Deploy

Vercel will automatically detect that this is a Create React App project. The `vercel.json` file in the root of the project provides all the necessary configurations for Vercel to build both the frontend and the backend. No further configuration is needed.

Here's a breakdown of the `vercel.json` configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "buildCommand": "npm run build" }
    }
  ],
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/backend/server.js"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

-   **`builds`**: This array tells Vercel how to build the different parts of your application.
    -   The first entry builds the Express server located in `backend/server.js` into a serverless function using `@vercel/node`.
    -   The second entry builds the React application using the `npm run build` command.
-   **`rewrites`**: This section configures Vercel's routing.
    -   Any request to `/api/...` is rewritten to the backend serverless function.
    -   All other requests are served the `index.html` from the React build, allowing the frontend to handle routing.

### 3. Deploy

-   Click the "Deploy" button. Vercel will start the build process.
-   Once the deployment is complete, you can visit your live site at the provided URL.

Your full-stack application should now be live, with the React frontend and Node.js backend working together seamlessly. The `proxy` setting in `package.json` will handle API requests during local development, and the `rewrites` in `vercel.json` will handle them in production.