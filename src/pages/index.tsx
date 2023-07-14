import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath === "/") {
      router.push("/home");
    }
  }, []);
  return (
    <>
      <Head>
        <title>Users List</title>
        <meta name="description" content="users list" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
