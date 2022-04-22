import { Outlet } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import styles from 'highlight.js/styles/github-dark-dimmed.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export default function Post() {
  return (
    <div className="flex justify-center">
      <div className="prose lg:prose-xl py-10">
        <Outlet />
      </div>
    </div>
  );
}
