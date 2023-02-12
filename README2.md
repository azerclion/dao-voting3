---
marp: true
---

# Getting Started with Create React App

---

### 12월 7일 화요일

#### truffle / truffle test / deploy / migration at goerli network

1. 한꺼번에 return값 두개 확인하기 ✔️
2. deploy (ganache) ✔️
3. 지갑연결
4. migrations ✔️
5. deploy (goerli net) ✔️

```
   ❯ truffle migrate --network goerli --reset
```

5. web3js

---

### 12월 14일 화요일

#### styled-components

1. 화면 설계 ✔️
1. 지갑 연결 ✔️
1. setUser (send, transfer, call)
1. getUser
1. 안건 입력
1. 안건 등록
1. 안건 검색
1. 투표 하기
1. 결과 확인

---

```
❯ truffle migrate --network goerli --reset

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'goerli'
> Network id:      5
> Block gas limit: 30000000 (0x1c9c380)


1_voting_migrations.js
======================

   Deploying 'B2'
   --------------
   > transaction hash:    0xdf45373f61abbd1f97c53a9e180628af9ea5a77dbccf203155cde53197a2dd1f
   > Blocks: 1            Seconds: 17
   > contract address:    0x1AB52eA150232A070C9E1DC3a6F7DCB5d229a495
   > block number:        8444818
   > block timestamp:     1675692072
   > account:             0x56C53049a267d05578163706C3589D44061AD9A6
   > balance:             4.996947994519038492
   > gas used:            1217036 (0x12920c)
   > gas price:           2.507736403 gwei
   > value sent:          0 ETH
   > total cost:          0.003052005480961508 ETH

   Pausing for 2 confirmations...

   -------------------------------
   > confirmation number: 1 (block: 8444819)
   > confirmation number: 2 (block: 8444820)
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.003052005480961508 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.003052005480961508 ETH
```

---

---

# NEXT STEP

### 다음 프로젝트는 무엇을 진행할지?

- nft
- vote upgrade

### 다음 프로젝트는 누가 진행할지?
