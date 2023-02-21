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
const TodoList = styled.div`
  margin-top: 20px;
`;
const LoadingBox = styled.div`
  font-size: 40px;
  font-weight: 600;
`;

function App() {
  const [web3, setWeb3] = useState();
  const [userAccount, setUserAccount] = useState();
  const [contract, setContract] = useState();
  const [Loading, setLoading] = useState(false);

  const [userName, setUserName] = useState();
  const [getUserName, setGetUserName] = useState("");

  const [inputItemName, setInputItemName] = useState("");
  const [inputItem, setInputItem] = useState("");
  const [searchItemName, setSearchItemName] = useState();
  const [getPollItem, setGetPollItem] = useState("");
  const [itemNameForVote, setitemNameForVote] = useState("");

  const [userData, setUserData] = useState([null, null]);

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
    await contract.methods
      .getUser()
      .call({ from: userAccount })
      .then((rst) => {
        setUserData(rst);
        console.log(rst);
      });
  };
  const registerItem = async (name, content) => {
    await contract.methods
      .setPoll(name, content)
      .send({ from: userAccount })
      .then(() => {
        setLoading(false);
      });
  };
  const getItem = async (name) => {
    await contract.methods
      .getPoll(name)
      .call()
      .then((ItemName) => {
        setLoading(false);
        setGetPollItem(ItemName);
        console.log(ItemName);
      });
  };
  const vote = async (name) => {
    await contract.methods
      .vote(name, true)
      .send({ from: userAccount })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <LoadingBox>{Loading ? "Loading..." : null}</LoadingBox>
      <TodoList>2. wallet button</TodoList>
      <WalletButton onClick={walletHandler}>CONNECT WALLET</WalletButton>
      <h5>yourAccount : {userAccount}</h5>
      <TodoList>3. Set user </TodoList>
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
      <TodoList>4. Get user</TodoList>
      <input
        onChange={(e) => {
          setUserName(e.currentTarget.value);
        }}
        placeholder="type your name"
      ></input>
      <button
        onClick={() => {
          getUser();
          setLoading(true);
        }}
      >
        getUser
      </button>
      <div>getUserName : {getUserName}</div>
      <TodoList>5. writing a item </TodoList>
      <input
        onChange={(e) => {
          setInputItem(e.currentTarget.value);
        }}
        placeholder="type your item"
      ></input>
      <input
        onChange={(e) => {
          setInputItemName(e.currentTarget.value);
        }}
        placeholder="type your item name"
      ></input>
      <button
        onClick={(e) => {
          let item = String(inputItem);
          let itemName = String(inputItemName);
          registerItem(itemName, item);
          setLoading(true);
        }}
      >
        안건등록
      </button>

      <TodoList>7. get items</TodoList>
      <input
        onChange={(e) => {
          setSearchItemName(e.currentTarget.value);
        }}
        placeholder="type your item name"
      ></input>
      <button
        onClick={() => {
          getItem(searchItemName);
          setLoading(true);
        }}
      >
        안건
      </button>
      <div>ItemName : {getPollItem.title}</div>
      <div>Content : {getPollItem.contents}</div>
      <div>agree : {getPollItem.agree}</div>
      <TodoList>8. voting</TodoList>
      <input
        onChange={(e) => {
          setitemNameForVote(e.currentTarget.value);
        }}
        placeholder="type your item name"
      ></input>
      <button
        onClick={() => {
          vote(itemNameForVote);
          setLoading(true);
        }}
      >
        투표
      </button>

      <TodoList>9. show the result</TodoList>
    </Container>
  );
}

export default App;
