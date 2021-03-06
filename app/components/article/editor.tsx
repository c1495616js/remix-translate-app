import React from 'react';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { GraphQLClient, gql } from 'graphql-request';
import { toast } from 'react-toastify';

import SlateEditor from '~/components/article/slate';
import { SlateType } from '~/types/enum';

const updateEditorById = gql`
  mutation UpdateArticle($id: ID!, $edit: RichTextAST!) {
    updateArticle(where: { id: $id }, data: { edit: $edit }) {
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

const Editor = () => {
  const { article } = useLoaderData();
  const fetcher = useFetcher();

  const toastId = React.useRef<React.ReactText | undefined>(undefined);
  const loading = () =>
    (toastId.current = toast.loading('Saving Edition...', {
      position: toast.POSITION.TOP_CENTER,
    }));
  const dismiss = () => toast.dismiss(toastId.current);

  const handleEditorSubmit = async () => {
    const value = JSON.parse(localStorage.getItem(SlateType.Editor) || '[]');
    const graphcms = new GraphQLClient(
      'https://api-us-west-2.graphcms.com/v2/cl2asc77z307o01yze9ic4hh2/master'
    );
    if (value.length > 0) {
      loading();
      await graphcms.request(updateEditorById, {
        id: article.id,
        edit: value[0],
      });
      await graphcms.request(publishArticle, { id: article.id });
      dismiss();
      toast.success('success', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  React.useEffect(() => {
    if (fetcher.type === 'done' && fetcher.data.article) {
      const data = fetcher.data.article;
      window?.open(
        `https://mail.google.com/mail/?view=cm&fs=1&su=${data?.title}&body=${data?.edit?.text}`,
        '__blank'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.type, fetcher?.data?.article?.edit?.text]);

  return (
    <section className="p-8 flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Editor</h1>
        <div className="flex gap-2 items-center justify-center">
          <button
            className="border px-4 py-2 bg-blue-500 text-white"
            type="button"
            onClick={handleEditorSubmit}
          >
            Save
          </button>

          <button
            className="border px-4 py-2 bg-purple-500 text-white"
            type="button"
            onClick={() => {
              fetcher.load(`/${article?.id}`);
            }}
          >
            Email
          </button>
        </div>
      </header>
      <main>
        <SlateEditor
          initialData={
            article?.edit?.raw
              ? [article?.edit?.raw]
              : [
                  {
                    type: 'paragraph',
                    children: [{ text: '' }],
                  },
                ]
          }
          slateType={SlateType.Editor}
        />
      </main>
    </section>
  );
};

export default Editor;
