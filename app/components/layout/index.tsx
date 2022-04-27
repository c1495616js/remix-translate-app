import type { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import AddArticleModal from '../article/add-article.modal';

import Nav from './nav';

const LayoutIndex: FC = ({ children }) => {
  return (
    <div className="h-full flex flex-col">
      <ToastContainer />
      <section>
        <Nav />
      </section>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default LayoutIndex;
