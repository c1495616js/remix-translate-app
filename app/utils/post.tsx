// import haskell from 'highlight.js/lib/languages/haskell';
import parseFrontMatter from 'front-matter';
import { bundleMDX } from './mdx.server';
import { join, readFile, readdir } from './fs.server';

export type Post = {
  slug: string;
  title: string;
};

export type PostMarkdownAttributes = {
  title: string;
};

export async function getPost(slug: string) {
  const source = await readFile(
    join(`${__dirname}/../blog-posts`, `${slug}.mdx`),
    'utf-8'
  );
  const rehypeHighlight = await import('rehype-highlight').then(
    (mod) => mod.default
  );
  const { default: remarkGfm } = await import('remark-gfm');
  const { default: rehypeAutolinkHeadings } = await import(
    'rehype-autolink-headings'
  );

  const { default: rehypeToc } = await import('rehype-toc');
  const { default: rehypeSlug } = await import('rehype-slug');
  const { default: haskell } = await import(
    'highlight.js/lib/languages/haskell'
  );

  const post = await bundleMDX({
    source,
    mdxOptions(options, frontmatter) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        // remarkMdxImages,
        remarkGfm,
        // remarkBreaks,
        // [remarkFootnotes, { inlineNotes: true }],
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeAutolinkHeadings,
        rehypeSlug,
        rehypeToc,
        [
          rehypeHighlight,
          { format: 'detect', ignoreMissing: true, languages: { haskell } },
        ],
      ];

      return options;
    },
  }).catch((e) => {
    console.error(e);
    throw e;
  });

  return post;
}

export async function getPosts(): Promise<Post[]> {
  const postsPath = await readdir(`${__dirname}/../blog-posts`, {
    withFileTypes: true,
  });

  const posts = await Promise.all(
    postsPath.map(async (dirent) => {
      const file = await readFile(
        join(`${__dirname}/../blog-posts`, dirent.name)
      );
      const { attributes } = parseFrontMatter(file.toString());

      return {
        slug: dirent.name.replace(/\.mdx/, ''),
        //@ts-ignore
        title: attributes?.meta?.title ?? 'Title Not Found',
      };
    })
  );
  return posts;
}
