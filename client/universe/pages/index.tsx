import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { lazy } from "react";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

// @ts-ignore
const Devlog: any = lazy(() => import('devlog/Page'))

export default function Home() {
  return (
    <div>
      <div>하이</div>
      <Devlog />
    </div>
  );
}
