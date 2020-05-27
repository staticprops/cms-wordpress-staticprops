# A statically generated blog example using Next.js and Staticprops.com Wordpres

This example showcases Next.js's [Static Generation](https://nextjs.org/docs/basic-features/pages) feature using [Staticprops](https://www.staticprops.com/) as the data source.

## Demo

[https://cms-wordpress-staticprops.now.sh/](https://cms-wordpress-staticprops.now.sh/)

### Related examples

- [Blog Starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter)
- [Sanity](https://github.com/vercel/next.js/tree/canary/examples/cms-sanity)
- [TakeShape](https://github.com/vercel/next.js/tree/canary/examples/cms-takeshape)
- [Prismic](https://github.com/vercel/next.js/tree/canary/examples/cms-prismic)

## How to use

### Using `create-next-app`

Execute [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npm init next-app --example https://github.com/dazuaz/cms-wordpress-staticprops cms-staticprops-app
# or
yarn create next-app --example https://github.com/dazuaz/cms-wordpress-staticprops cms-staticprops-app
```

## Configuration

### Step 1. Create a deployment on Staticprops

First, [create an account on Staticprops](https://staticprops.com).

### Step 2. Create an `Author` model

From the project setting page, create a new **Model**.

- The name should be `Author`.

Next, add these fields (you don't have to modify the settings):

- `Name` - **Text** field (**Single-line String**)
- `Picture` - **Media** field (**Single asset**)

### Step 3. Create a `Post`

Create a new Post on wordpress Admin

### Step 4. Populate Content

You need to click **Publish**. If not, the post will be in the draft state.

### Step 5. Set up environment variables

Go to the **Settings** menu at the top and click **API tokens**.

Then click **Read-only API token** and copy the token.

Next, copy the `.env.example` file in this directory to `.env` (which will be ignored by Git):

```bash
cp .env.example .env
```

Then set each variable on `.env`:

- `NEXT_EXAMPLE_CMS_STATICPROPS_API_TOKEN` should be the API token you just copied.
- `NEXT_EXAMPLE_CMS_STATICPROPS_PREVIEW_SECRET` can be any random string (but avoid spaces), like `MY_SECRET` - this is used for [the Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode).

Your `.env` file should look like this:

```bash
NEXT_EXAMPLE_CMS_STATICPROPS_API_TOKEN=...
NEXT_EXAMPLE_CMS_STATICPROPS_PREVIEW_SECRET=...
```

### Step 6. Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your blog should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/zeit/next.js/discussions).

### Step 7. Try preview mode

On Staticprops, go to one of the posts you've created and:

- **Update the title**. For example, you can add `[Draft]` in front of the title.
- Click **Save**, but **DO NOT** click **Publish**. By doing this, the post will be in the draft state.

(If it doesn't become draft, you need to go to the model settings for `Post`, go to **Additional Settings**, and turn on **Enable draft/published system**.)

Now, if you go to the post page on localhost, you won't see the updated title. However, if you use the **Preview Mode**, you'll be able to see the change ([Documentation](https://nextjs.org/docs/advanced-features/preview-mode)).

To enable the Preview Mode, go to this URL:

```
http://localhost:3000/api/preview?secret=<secret>&slug=<slug>
```

- `<secret>` should be the string you entered for `NEXT_EXAMPLE_CMS_STATICPROPS_PREVIEW_SECRET`.
- `<slug>` should be the post's `slug` attribute (you can check on Staticprops).

You should now be able to see the updated title. To exit the preview mode, you can click **Click here to exit preview mode** at the top.

### Step 8. Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com/import?filter=next.js&utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

To deploy on Vercel, you need to set the environment variables with **Now Secrets** using [Vercel CLI](https://vercel.com/download) ([Documentation](https://vercel.com/docs/now-cli#commands/secrets)).

Install [Vercel CLI](https://vercel.com/download), log in to your account from the CLI, and run the following commands to add the environment variables. Replace `<NEXT_EXAMPLE_CMS_STATICPROPS_API_TOKEN>` and `<NEXT_EXAMPLE_CMS_STATICPROPS_PREVIEW_SECRET>` with the corresponding strings in `.env`.

```
now secrets add next_example_cms_staticprops_api_token <NEXT_EXAMPLE_CMS_STATICPROPS_API_TOKEN>
now secrets add next_example_cms_staticprops_preview_secret <NEXT_EXAMPLE_CMS_STATICPROPS_PREVIEW_SECRET>
```

Then push the project to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/import?filter=next.js&utm_source=github&utm_medium=readme&utm_campaign=next-example) to deploy.
