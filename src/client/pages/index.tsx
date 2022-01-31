import React from 'react';
import { NextPage } from 'next';

export async function getServerSideProps(context) {
  const protocol = context.req.headers['x-forwarded-proto'] || 'http';
  const baseUrl = context.req
    ? `${protocol}://${context.req.headers.host}`
    : '';

  const productsRes = await fetch(baseUrl + `/v1/products`);
  const productsData = await productsRes.json();
  return {
    props: {
      products: productsData,
    },
  };
}

const Index: NextPage = (props) => {
  console.log(props);
  return <div>Hello world</div>;
};

export default Index;
