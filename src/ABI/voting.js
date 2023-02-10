const abi = [
  {
    inputs: [{ internalType: "string", name: "_title", type: "string" }],
    name: "finishVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_title", type: "string" }],
    name: "getPoll",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "number", type: "uint256" },
          { internalType: "string", name: "title", type: "string" },
          { internalType: "string", name: "contents", type: "string" },
          { internalType: "address", name: "by", type: "address" },
          { internalType: "uint256", name: "agree", type: "uint256" },
          { internalType: "uint256", name: "disag", type: "uint256" },
          { internalType: "enum B2.Status", name: "status", type: "uint8" },
        ],
        internalType: "struct B2.poll",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUser",
    outputs: [
      { internalType: "string", name: "", type: "string" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_title", type: "string" },
      { internalType: "string", name: "_contents", type: "string" },
    ],
    name: "setPoll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_name", type: "string" }],
    name: "setUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_title", type: "string" },
      { internalType: "bool", name: "_b", type: "bool" },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const voteContract = (web3) => {
  return new web3.eth.Contract(
    abi,
    "0x1AB52eA150232A070C9E1DC3a6F7DCB5d229a495"
  );
};

export default voteContract;
