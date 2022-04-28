import React from 'react';
import { useLoaderData, useFetcher } from '@remix-run/react';
import { json } from '@remix-run/node';
import { GraphQLClient, gql } from 'graphql-request';

import Translate from '~/components/article/translate';
import Editor from '~/components/article/editor';
import AddArticleModal from '~/components/article/add-article.modal';
import GmailModal from '~/components/article/gmail.modal';

const GetArticleById = gql`
  query ArticleQuery($id: ID!) {
    article(where: { id: $id }) {
      id
      title
      content
      translate {
        raw
        text
        html
      }
      edit {
        raw
        text
        html
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

  return json({
    article,
  });
};

const ArticleId = () => {
  const { article } = useLoaderData();
  const [loadModal, setLoadModal] = React.useState(!!article);

  const [gmail, setGmail] = React.useState(false);

  React.useEffect(() => {
    setLoadModal(false);
    setTimeout(() => {
      setLoadModal(true);
    }, 500);
  }, [article?.id]);

  // React.useEffect(() => {
  //   if (gmail && fetcher.type === 'init') {
  //     fetcher.load(`/${article?.id}`);
  //     setGmail(false);
  //   }
  // }, [article?.id, fetcher, gmail]);

  return (
    <div className="grid grid-cols-2">
      {!loadModal && <div className="p-4">Loading...</div>}
      {loadModal && <AddArticleModal />}
      {/* {loadModal && gmail && <GmailModal onClose={() => setGmail(false)} />} */}
      {loadModal && <Translate article={article} />}
      {loadModal && <Editor />}
    </div>
  );
};

export default ArticleId;
