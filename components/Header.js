import UAuth from "@uauth/js";
import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useMoralis } from "react-moralis"



const uauth = new UAuth({
    clientID: "6e13ab70-38ab-4898-b5ad-62c362270e73",
    redirectUri: "http://localhost:3000",
    scope: "openid wallet"
  });


  
function Header() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setLoading(true);
    uauth
      .user()
      .then(setUser)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);


  const { enableWeb3, isWeb3Enabled, isWeb3EnableLoading, account, Moralis, deactivateWeb3 } =
        useMoralis()

    useEffect(() => {
        if (
            !isWeb3Enabled &&
            typeof window !== "undefined" &&
            window.localStorage.getItem("connected")
        ) {
            enableWeb3()
            // enableWeb3({provider: window.localStorage.getItem("connected")}) // add walletconnect
        }
    }, [isWeb3Enabled])
    // no array, run on every render 
    // empty array, run once
    // dependency array, run when the stuff in it changesan

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null Account found")
            }
        })
    }, [])

  //Login Functions
  const handleLogin = async () => {
    setLoading(true);
    try {
      await uauth.loginWithPopup().then(() => uauth.user().then(setUser));
      
      await enableWeb3()
      // depends on what button they picked
      if (typeof window !== "undefined") {
          window.localStorage.setItem("connected", "injected")}
      console.log(accounts);

      setLoading(true);
      // setWalletAddress(user.wallet_address);
      console.log(user);
    } 
    catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setLoading(true);
    uauth
      .logout()
      .then(() => setUser(undefined))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  const getEllipsisTxt = (str, n = 6) => {
    if (str) {
      return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
  };

  console.log(loading);

  if (user) {
    return (
        
    <nav className="p-5 border-b-2 bg-[#a3a09d] flex flex-row">
    <h1 className="py-4 px-4 font-bold text-3xl bg-[#aafe1e]"> RecycloMade </h1>
        <div className="ml-auto py-2 px-8 bg-[#1a9ccf]">
      <Button
      type="button"
        colorScheme="teal"
        variant="outline"
        w="4xs"
        display="flex"
        fontSize={{ base: "md", md: "lg" }}
        cursor="pointer"
        onClick={handleLogout}
      >
      
      <h1>{user.sub}   Logout </h1>  
      </Button>
      </div>
      </nav>
    );
  }

  return (
    <nav className="p-5 border-b-2 bg-[#a3a09d] flex flex-row">
            <h1 className="py-4 px-4 font-bold text-3xl bg-[#aafe1e]"> RecycloMade </h1>
            <div className="ml-auto py-4 px-8 ">
              <meta/>
              </div>
            <div className="ml-auto py-2 px-4 bg-[#1a9ccf]">
    <Button
    type="button"
      colorScheme="teal"
      variant="outline"
      w="4xs"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize={{ base: "md", md: "lg" }}
      cursor="pointer"
      
      onClick={handleLogin}
    >
     <h1> Login UNS Domains </h1>
    </Button>
    </div>
        </nav>
  );
}
export default Header;