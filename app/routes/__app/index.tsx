import type { ActionFunction } from '@remix-run/node';

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  console.log('bsss:', body);
  return null;
};

const Home = () => {
  return <div>Home</div>;
};

export default Home;
