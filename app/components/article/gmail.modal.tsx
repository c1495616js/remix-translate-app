import React from 'react';
import { useSearchParams, useParams, useLoaderData } from '@remix-run/react';

import { ValidatedForm } from 'remix-validated-form';

import Modal from '~/components/base/modal';
import { gmailValidator } from '~/routes/__app/article';
import { MyInput, MyTextarea } from './add-article.modal';

type Props = {
  onClose: any;
};

const GmailModal = ({ onClose }: Props) => {
  const { article } = useLoaderData();
  const param = useParams();
  const articleId = param?.id;
  const [params, setParams] = useSearchParams();

  return (
    <Modal.Frame
      open={!!params.get('gmailModal')}
      onClose={() => {
        onClose();
        params.delete('gmailModal');
        setParams(params);
      }}
    >
      <Modal.Head>Send Gmail</Modal.Head>
      <Modal.Body>
        <ValidatedForm
          id="gmailForm"
          validator={gmailValidator}
          // method="post"
          //   action={`/article?id=${articleId}`}
          defaultValues={{ title: article.title, content: article?.edit?.text }}
          resetAfterSubmit
        >
          <div className="flex  items-center justify-center shadow-lg max-w-lg">
            <section className="w-full max-w-xl bg-white rounded-lg p-4">
              <div className="flex flex-wrap -mx-3">
                <section className="px-3 w-full">
                  <MyInput name="to" label="Email" />
                </section>
                <section className="px-3 w-full">
                  <MyInput name="title" label="Title" />
                </section>
                <div className="w-full md:w-full px-3 mb-2 mt-2">
                  <MyTextarea label="Content" name="content" />
                </div>
                <div className="w-full  flex items-start md:w-full px-3">
                  <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto"></div>
                  <div className="-mr-1">
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=someone@example.com&cc=someone@ola.com&bcc=someone.else@example.com&su=SUBJECT&body=BODY"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button
                        type="button"
                        className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                      >
                        Submit
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </ValidatedForm>
      </Modal.Body>
    </Modal.Frame>
  );
};
export default GmailModal;
