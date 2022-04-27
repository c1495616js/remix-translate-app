import React from 'react';
import { useSearchParams, useParams, useLoaderData } from '@remix-run/react';

import { ValidatedForm, useField } from 'remix-validated-form';

import Modal from '~/components/base/modal';
import { validator } from '~/routes/__app/article';

type MyInputProps = {
  name: string;
  label: string;
};

export const MyInput = ({ name, label }: MyInputProps) => {
  const { error, getInputProps } = useField(name);
  return (
    <div>
      <label htmlFor={name} className="text-black">
        {label}
      </label>
      <input
        type="text"
        {...getInputProps({ id: name })}
        className="text-black w-full border p-2"
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export const MyTextarea = ({ name, label }: MyInputProps) => {
  const { error, getInputProps } = useField(name);
  return (
    <div>
      <label htmlFor={name} className="text-black">
        {label}
      </label>
      <textarea
        {...getInputProps({ id: name })}
        className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-80 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white text-black"
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

const AddArticleModal = () => {
  const { article } = useLoaderData();
  const param = useParams();
  const articleId = param?.id;
  const [params, setParams] = useSearchParams();

  return (
    <Modal.Frame
      open={!!params.get('modal')}
      onClose={() => {
        params.delete('modal');
        setParams(params);
      }}
    >
      <Modal.Head>{articleId ? 'Update ' : 'Add '}Article 🙋‍♀️</Modal.Head>
      <Modal.Body>
        <ValidatedForm
          id="articleForm"
          validator={validator}
          method="post"
          action={`/article?id=${articleId ?? ''}`}
          defaultValues={article}
          resetAfterSubmit
        >
          <div className="flex  items-center justify-center shadow-lg max-w-lg">
            <section className="w-full max-w-xl bg-white rounded-lg p-4">
              <div className="flex flex-wrap -mx-3">
                <section className="px-3 w-full">
                  <MyInput name="title" label="Title" />
                </section>
                <div className="w-full md:w-full px-3 mb-2 mt-2">
                  <MyTextarea
                    label="Content"
                    name="content"
                    // defaultValue={article?.content}
                  />
                </div>
                <div className="w-full  flex items-start md:w-full px-3">
                  <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto"></div>
                  <div className="-mr-1">
                    <button
                      type="submit"
                      className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                    >
                      Submit
                    </button>
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
export default AddArticleModal;
