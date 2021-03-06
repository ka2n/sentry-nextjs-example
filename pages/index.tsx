import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { fetchHello, FetchResult } from "./api/hello";

export default function Home() {
  const [message, setMessage] = useState<FetchResult>({
    result: null,
    error: null,
  });

  useEffect(() => {
    Promise.resolve(fetchHello()).then(setMessage);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {message.result
            ? `Hello ${message.result.name}!`
            : message.error
            ? `Error: ${JSON.stringify(message.error)}`
            : "loading..."}
        </h1>
      </main>
    </div>
  );
}
