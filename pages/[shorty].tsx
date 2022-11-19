import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import React from "react";

const Shorty: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("ran");
    (async function () {
      const response = await axios.get(`/api/get-shortyKey`, {
        params: {
          shortyValue: router.query.shorty,
        },
      });

      if (response.data.success) {
        router.push(`${response.data.shorty.key}`);
        return;
      }
      setIsLoading(false);
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
