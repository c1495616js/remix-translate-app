import React from 'react';
import { useSearchParams } from '@remix-run/react';

import Modal from '~/components/base/modal';

const AddArticleModal = () => {
  const [params, setParams] = useSearchParams();
  return (
    <Modal.Frame
      open={!!params.get('modal')}
      onClose={() => {
        params.delete('modal');
        setParams(params);
      }}
    >
      <Modal.Head>Article 🙋‍♀️</Modal.Head>
      <Modal.Body>
        <div className="flex flex-col space-y-2">
          <input
            className="text-gray-800 outline-none border-2 border-white focus:border-blue-300 p-1"
            placeholder="Username"
          />
          <input
            className="text-gray-800 outline-none border-2 border-white focus:border-blue-300 p-1"
            placeholder="Password"
            type="password"
          />
          <button className="text-gray-100 border-2 border-blue-700 bg-blue-600 rounded shadow-xl p-2 outline-none focus:border-blue-300">
            Sign in
          </button>
        </div>
      </Modal.Body>
    </Modal.Frame>
  );
};

export default AddArticleModal;
