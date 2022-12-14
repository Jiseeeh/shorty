import React from "react";
import Head from "next/head";

import ShortiesTable from "../../components/Table";

const Shorties: React.FC = () => {
  return (
    <>
      <Head>
        <title>Your Shorties</title>
        <meta name="description" content="User shorties" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ShortiesTable />
    </>
  );
};

export default Shorties;
