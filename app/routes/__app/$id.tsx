import React from 'react';
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { GraphQLClient, gql } from 'graphql-request';

import Translate from '~/components/article/translate';
import Editor from '~/components/article/editor';

const GetArticleById = gql`
  query ArticleQuery($id: ID!) {
    article(where: { id: $id }) {
      id
      title
      translate {
        raw
      }
      edit {
        raw
      }
    }
  }
`;

export let loader = async ({ params }: any) => {
  const { id } = params;

  const graphcms = new GraphQLClient(
    'https://api-us-west-2.graphcms.com/v2/cl2asc77z307o01yze9ic4hh2/master'
  );

  const { article } = await graphcms.request(GetArticleById, {
    id,
  });

  return json({ article });
};

const ArticleId = () => {
  const { article } = useLoaderData();

  return (
    <div className="grid grid-cols-2">
      <Translate article={article} />
      <Editor article={article} />
    </div>
  );
};

export default ArticleId;
