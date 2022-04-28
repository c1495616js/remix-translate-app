import React from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import { toast } from 'react-toastify';
import Icon from 'react-icons-kit';
import { save } from 'react-icons-kit/fa/save';
import { useLoaderData } from '@remix-run/react';

import SlateEditor from '~/components/article/slate';
import { SlateType } from '~/types/enum';

const updateTranslateById = gql`
  mutation UpdateArticle($id: ID!, $translate: RichTextAST!) {
    updateArticle(where: { id: $id }, data: { translate: $translate }) {
      id
      title
      translate {
        raw
      }
    }
  }
`;

const publishArticle = gql`
  mutation PublishArticle($id: ID!) {
    publishArticle(where: { id: $id }) {
      id
      title
      translate {
        raw
      }
    }
  }
`;

const Translate = () => {
  const { article } = useLoaderData();

  const toastId = React.useRef<React.ReactText | undefined>(undefined);
  const loading = () =>
    (toastId.current = toast.loading('Saving Translation...', {
      position: toast.POSITION.TOP_CENTER,
    }));
  const dismiss = () => toast.dismiss(toastId.current);

  const handleTranslateSubmit = async () => {
    const value = JSON.parse(localStorage.getItem(SlateType.Translate) || '[]');
    const graphcms = new GraphQLClient(
      'https://api-us-west-2.graphcms.com/v2/cl2asc77z307o01yze9ic4hh2/master'
    );
    if (value.length > 0) {
      loading();
      await graphcms.request(updateTranslateById, {
        id: article.id,
        translate: value[0],
      });
      await graphcms.request(publishArticle, { id: article.id });
      dismiss();
      toast.success('success', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <section className="p-8 flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Translate</h1>
        <div>
          <button
            className="border px-4 py-2 bg-green-500 text-white flex items-center gap-2 rounded-md"
            type="button"
            onClick={handleTranslateSubmit}
          >
            <Icon icon={save} className="!flex" />
            <span>Save</span>
          </button>
        </div>
      </header>
      <main>
        <SlateEditor
          initialData={
            article?.translate?.raw
              ? [article?.translate?.raw]
              : [
                  {
                    type: 'paragraph',
                    children: [{ text: '' }],
                  },
                ]
          }
          slateType={SlateType.Translate}
        />
      </main>
    </section>
  );
};

export default Translate;
