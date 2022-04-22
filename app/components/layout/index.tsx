import type { FC } from 'react';
import Nav from './nav';

const LayoutIndex: FC = ({ children }) => {
  return (
    <div className="h-full flex flex-col">
      <section>
        <Nav />
      </section>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default LayoutIndex;
