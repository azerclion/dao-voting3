import styled from "styled-components";
import { useState, useRef } from "react";
import { useEffect } from "react";
import Web3 from "web3";
import voteContract from "./ABI/voting";

const Container = styled.div`
  width: 900px;
  height: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: lavender;
  gap: 5px;
`;

const WalletButton = styled.button`
  width: 150px;
  height: 25px;
  margin-top: 50px;
  margin-bottom: 50px;
  border-radius: 20px;
  border: 1px solid transparent;
  background-color: aliceblue;
`;

const LoadingBox = styled.div`
  font-size: 35px;
  font-weight: 800;
  color: blueviolet;
`;

const VoteBox = styled.div`
  padding: 10px;
  background-color: beige;
`;

const VoteTitle = styled.div`
  position: relative;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid gray;
  padding-bottom: 5px;
  margin-bottom: 3px;
`;

const pollStatus = ["ongoing", "passed", "failed"];

function App() {
  // const web3 = new Web3(window.ethereum);
  const [web3, setWeb3] = useState();
  const [userAccount, setUserAccount] = useState();
  const [contract, setContract] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState();

  const [userData, setUserData] = useState([null, null]);
  const [pollData, setPollData] = useState({
    number: null,
    title: null,
    contents: null,
    by: null,
    agree: null,
    disag: null,
    status: null,
  });

  const nameRef = useRef(null);
  const contentRef = useRef(null);
  var radios = document.getElementsByName("poll");

  async function walletHandler() {
    try {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        getUserAccountInfo();
        makeContractApi();
      } else {
        console.log("please install wallet");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getUserAccountInfo() {
    const accounts = await web3.eth.getAccounts();
    setUserAccount(accounts[0]);
  }

  async function makeContractApi() {
    const vote = await voteContract(web3);
    setContract(vote);
    console.log(vote);
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
        setIsLoading(false);
      });
  };

  const setPoll = async () => {
    await contract.methods
      .setPoll(nameRef.current.value, contentRef.current.value)
      .send({ from: userAccount })
      .then(() => {
        setIsLoading(false);
      });

    // console.log(nameRef.current.value);
    // console.log(contentRef.current.value);
  };
  //https://stackoverflow.com/questions/51847788/msg-sender-does-not-work-inside-a-view-function-why-is-there-a-workaround
  const getUser = async () => {
    await contract.methods
      .getUser()
      .call({ from: userAccount })
      .then((rst) => {
        setUserData(rst);
      });
  };

  //????????? ??????
  const settingPollData = () => {
    // pollData.map((data) => {
    //   console.log(data);
    // });
    // for (const [key, value] of Object.entries(pollData)) {
    //   console.log(`${key}: ${value}`);
    // }
    for (const key in pollData) {
      if (pollData.hasOwnProperty(key)) {
        console.log(key + ": " + pollData[key]);
      }
    }
  };

  const getPoll = async () => {
    // await contract.methods
    //   .getPoll(nameRef.current.value)
    //   .call()
    //   .then((rst) => {
    //     // setPollData(rst);
    //     console.log(rst);
    //     // console.log("-----------");
    //     // settingPollData();

    //     // const structArray = Object.entries(rst).map(([key, value]) => ({
    //     //   key,
    //     //   value,
    //     // }));
    //     // console.log(structArray);
    //     // structArray.forEach(({ key, value }) => {
    //     //   console.log(`${key}: ${value}`);
    //     // });
    //   });
    const tmp = await contract.methods.getPoll(nameRef.current.value).call();
    setPollData(tmp);
    //-> then ????????? ?????????
  };

  const vote = async () => {
    let value;
    for (let radio of radios) {
      if (radio.checked) value = JSON.parse(radio.value);
    }
    if (value === undefined || nameRef.current.value === "") {
      console.log("check input");
      return;
    }

    await contract.methods
      .vote(nameRef.current.value, value)
      .send({ from: userAccount })
      .then(() => {
        setIsLoading(false);
      });
  };

  const commitVote = async () => {
    await contract.methods
      .finishVote(nameRef.current.value)
      .send({ from: userAccount })
      .then(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <LoadingBox>{isLoading ? "LOADING..." : null}</LoadingBox>
      <WalletButton onClick={walletHandler}>1. connect wallet</WalletButton>
      <h3>userAccount : {userAccount}</h3>
      <button
        onClick={() => {
          setUser();
          setIsLoading(true);
        }}
      >
        2. ?????? ??????
      </button>
      <input
        onChange={(e) => {
          setUserName(e.currentTarget.value);
        }}
        placeholder="type your name"
      ></input>
      <button
        onClick={() => {
          getUser();
        }}
      >
        3. ?????? ?????? ????????????
      </button>
      <div>
        ??????: {userData[0]} ???????????????: {userData[1]}
      </div>

      <button
        onClick={() => {
          setPoll();
          setIsLoading(true);
        }}
      >
        4. ?????? ????????????
      </button>
      <input ref={nameRef} type="text" placeholder="type poll's name"></input>
      <input
        ref={contentRef}
        type="text"
        placeholder="type poll's content"
      ></input>
      <button
        onClick={() => {
          commitVote();
        }}
      >
        5. ?????? ??????
      </button>
      <button
        onClick={() => {
          getPoll();
        }}
      >
        6. ?????? ??????
      </button>
      <VoteBox>
        <VoteTitle>?????? ??????</VoteTitle>
        <div>??????: {pollData.number}</div>
        <div>??????: {pollData.title}</div>
        <div>??????:{pollData.contents}</div>
        <div>?????????:{pollData.by}</div>
        <div>?????????: {pollData.agree}</div>
        <div>????????????: {pollData.disag}</div>
        <div>
          ??????:{" "}
          {/* {pollData.status === "0"
            ? "?????????"
            : pollData.status === "1"
            ? "??????"
            : "??????"} */}
          {pollStatus[pollData.status]}
        </div>
      </VoteBox>
      <div>
        <button
          onClick={() => {
            vote();
            setIsLoading(true);
          }}
        >
          7. ????????????
        </button>
        <input type="radio" name="poll" value={true} />
        <label>??????</label>
        <input type="radio" name="poll" value={false} />
        <label>?????????</label>
      </div>
      <div>8. Result</div>
    </Container>
  );
}

export default App;
