import Head from "next/head";
import Chat from "../components/chat";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sense-bot</title>
        <link rel="icon" href="/logoOnly.jpg" />
      </Head>

      <main className={styles.main}>
        <Image src="/logo.jpg" width={300} height={100} alt="sensebot-logo" />
        {/* <h1 className={styles.title}>Sense-Bot !</h1> */}

        <p className={styles.description}>
          The SenseBots platform provides the infrastructure and core capabilities to power an omni-channel
          conversational exprience. Try out our work on the coversational AI technology now.
        </p>
      </main>
      <Chat />

      <footer className={styles.footer}>
        <div>
          Powered by <a href="https://intelsense.ai/">Intelsense.ai</a>
        </div>
      </footer>
    </div>
  );
}
