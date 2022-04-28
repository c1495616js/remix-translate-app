import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { validationError } from 'remix-validated-form';
import { z } from 'zod';
import { withZod } from '@remix-validated-form/with-zod';
import { GraphQLClient, gql } from 'graphql-request';

export const validator = withZod(
  z.object({
    title: z.string().nonempty('Title is required'),
    content: z.string(),
  })
);

export const gmailValidator = withZod(
  z.object({
    title: z.string().nonempty('Title is required'),
    content: z.string().nonempty('Content is required'),
    to: z.string().email().nonempty('Email is required'),
  })
);

const updateArticleById = gql`
  mutation UpdateArticle($id: ID!, $title: String!, $content: String) {
    updateArticle(
      where: { id: $id }
      data: { title: $title, content: $content }
    ) {
      id
    }
  }
`;

const addArticle = gql`
  mutation AddArticle($title: String!, $content: String) {
    createArticle(data: { title: $title, content: $content }) {
      id
    }
  }
`;

const publishArticle = gql`
  mutation PublishArticle($id: ID!) {
    publishArticle(where: { id: $id }) {
      id
    }
  }
`;

export let action: ActionFunction = async ({ request }) => {
  const url = new URL(request.url);
  const articleId = url.searchParams.get('id');

  const data = await validator.validate(await request.formData());

  if (data.error) return validationError(data.error);
  const { title, content } = data.data;

  const graphcms = new GraphQLClient(
    'https://api-us-west-2.graphcms.com/v2/cl2asc77z307o01yze9ic4hh2/master'
  );
  if (articleId) {
    await graphcms.request(updateArticleById, {
      id: articleId,
      title,
      content,
    });
    await graphcms.request(publishArticle, { id: articleId });
    return redirect(`/${articleId}`);
  }
  const { createArticle } = await graphcms.request(addArticle, {
    title,
    content,
  });
  await graphcms.request(publishArticle, { id: createArticle.id });
  return redirect('/');
};
