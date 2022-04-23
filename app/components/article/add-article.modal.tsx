import React from 'react';
import { useSearchParams, useParams, Form } from '@remix-run/react';

import Modal from '~/components/base/modal';

const AddArticleModal = () => {
  const param = useParams();
  const [params, setParams] = useSearchParams();
  return (
    <Modal.Frame
      open={!!params.get('modal')}
      onClose={() => {
        params.delete('modal');
        setParams(params);
      }}
    >
      <Modal.Head>{param?.id ? 'Update ' : 'Add '}Article 🙋‍♀️</Modal.Head>
      <Modal.Body>
        <Form method="post" action={param?.id ? `/${param.id}` : '/?index'}>
          <div className="flex flex-col space-y-2">
            <input
              className="text-gray-800 outline-none border-2 border-white focus:border-blue-300 p-1"
              placeholder="Username"
              name="name"
            />
            <input
              className="text-gray-800 outline-none border-2 border-white focus:border-blue-300 p-1"
              placeholder="Password"
              type="password"
              name="password"
            />
            <button
              type="submit"
              className="text-gray-100 border-2 border-blue-700 bg-blue-600 rounded shadow-xl p-2 outline-none focus:border-blue-300"
            >
              Submit
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal.Frame>
  );
};

export default AddArticleModal;
