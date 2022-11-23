import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";

const Shorty: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // effect for checking the user's shorty, if its key is valid, it will redirect there,
  // otherwise it sets isLoading to false.
  useEffect(() => {
    (async function () {
      const query = router.query.shorty;
      const response = await axios.get(`/api/get-shortyKey`, {
        params: {
          shortyValue: query,
        },
      });

      if (response.data.success) {
        router.push(`${response.data.shorty.key}`);
        return;
      }
      // only set if the query is truthy to prevent immediate change of text below
      if (query) setIsLoading(false);
    })();
  }, [router]);

  return (
    <>
      <Head>
        <title>Shorty</title>
      </Head>
      <section className="text-center">
        <h1 className="font-bold md:text-xl">
          {isLoading
            ? "REDIRECTING YOU TO YOUR LINK..."
            : "SORRY! THAT LINK MUST HAVE BEEN DELETED OR IT DOESN'T EXIST"}
        </h1>
      </section>
    </>
  );
};

export default Shorty;
