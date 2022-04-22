import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import { json, LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getPost } from '~/utils/post';

type LoaderData = {
  frontmatter: any;
  code: string;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const slug = params['slug'];
  if (!slug) throw new Response('Not found', { status: 404 });

  const post = await getPost(slug);
  if (post) {
    const { frontmatter, code } = post;
    return json({ frontmatter, code });
  } else {
    throw new Response('Not found', { status: 404 });
  }
};

export default function Post() {
  const { code, frontmatter } = useLoaderData<LoaderData>();
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <Link to="/post">← Back to blog index</Link>
      <h1>{frontmatter.title}</h1>
      <Component />
    </>
  );
}
