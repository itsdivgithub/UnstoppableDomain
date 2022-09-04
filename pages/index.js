import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import LotteryEntrance from "../components/LotteryEntrance";
import { useMoralis } from "react-moralis";
import MintNFT from "../components/MintNFT";

const supportedChains = ["31337", "4"];

export default function Home() {
  const { isWeb3Enabled, chainId } = useMoralis();

  return (
      <div className="px-4 bg-[#fc89ac]">
          <Head>
              <title>RecycloLottery</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          {isWeb3Enabled ? (
              <div className=" flex flex-col justify-center items-center">
                  {supportedChains.includes(parseInt(chainId).toString()) ? (
                      <div className="flex flex-row">
                          <LotteryEntrance className="p-8" />
                      </div>
                  ) : (
                      <div>{`Please switch to a supported chainId. The supported Chain Ids are: ${supportedChains}`}</div>
                  )}
              </div>
          ) : (
              <div className="font-bold text-align: center">Please connect to a Wallet</div>
          )}
          <MintNFT />
      </div>
  )
}
