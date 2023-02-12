import React, { useEffect, useState } from "react";
import Web3 from "web3";
import styled from "styled-components";

import voteContract from "./ABI/voting.js";

const Container = styled.div`
  width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const WalletButton = styled.button`
  width: 150px;
  height: 25px;
  padding: 4px;
  border: 2px solid;
  border-radius: 20px;
  color: #baad98;
  background-color: #48617c;
  cursor: pointer;
`;

function App() {
  const [web3, setWeb3] = useState();
  const [userAccount, setUserAccount] = useState();
  const [contract, setContract] = useState();
  const [Loading, setLoading] = useState(false);

  const [userName, setUserName] = useState();
  const [inputItem, setInputItem] = useState("");
  const [getUserName, setGetUserName] = useState("");

  async function walletHandler() {
    try {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        getUserAccountInfo();
        makeContractApi();
      } else {
        console.log("Please install MetaMask");
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  async function makeContractApi() {
    const vote = await voteContract(web3);
    setContract(vote);
    console.log("contract", contract);
  }
  async function getUserAccountInfo() {
    const accounts = await web3.eth.getAccounts();
    setUserAccount(accounts[0]);
  }

  useEffect(() => {
    try {
      if (typeof window.ethereum !== "undefined") {
        setWeb3(new Web3(window.ethereum));
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const setUser = async () => {
    await contract.methods
      .setUser(userName)
      .send({ from: userAccount })
      .then(() => {
        setLoading(false);
      });
  };
  const getUser = async () => {
    let getName = await contract.methods
      .getUser()
      .call()
      .then((res) => {
        setGetUserName(res[0]);
        setLoading(false);
      });
  };
  const registerItem = async () => {};

  return (
    <Container>
      <div>2. wallet button</div>
      <WalletButton onClick={walletHandler}>CONNECT WALLET</WalletButton>
      <h5>yourAccount : {userAccount}</h5>
      <div>3. Set user </div>
      <input
        onChange={(e) => {
          setUserName(e.currentTarget.value);
        }}
        placeholder="type your name"
      ></input>
      <button
        onClick={(e) => {
          let name = String(inputItem);
          setUser(name);
          setLoading(true);
        }}
      >
        setuser
      </button>
      <div>4. Get user</div>

      <button
        onClick={(e) => {
          getUser();
          setLoading(true);
        }}
      >
        getUser
      </button>
      <div>{getUserName}</div>
      <div>5. writing a item </div>
      <input
        onChange={(e) => {
          setInputItem(e.currentTarget.value);
        }}
        placeholder="type your item"
      ></input>
      <div>6 . submit button</div>
      <button
        onClick={(e) => {
          let item = String(inputItem);
          registerItem(item);
          setLoading(true);
        }}
      >
        안건등록
      </button>
      <div>{Loading ? "Loading..." : null}</div>
      <div>7. search items</div>
      <div>8. to vote</div>
      <div>9. to show the result</div>
    </Container>
  );
}

export default App;
