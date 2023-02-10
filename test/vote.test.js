const daovote = artifacts.require("B2");

contract("B2", async () => {
  let vote;
  before(async () => {
    vote = await daovote.new();
  });
  describe("user function test", async () => {
    it("setUser test", async () => {
      await vote.setUser("mobumsae");
    });
    it("getUser test", async () => {
      const result = await vote.getUser();
      assert.equal(result.toString(), {
        name: "mobumsae",
        length: 0,
      });
    });
  });
  describe("poll function test", async () => {
    it("setPoll test", async () => {
      await vote.setPoll("hello human", "are you happy?");
    });
    it("getPoll test", async () => {
      const result = await vote.getPoll("hello human");
      assert.equal(result.title, "hello human");
      assert.equal(result.contents, "are you happy?");
    });
  });
  describe("voting test", async () => {
    it("vote", async () => {
      await vote.vote("hello human", true);
    });
    it("vote result", async () => {
      const result = await vote.getPoll("hello human");
      assert.equal(result.agree, 1);
    });
  });
  describe("user function test again", async () => {
    it("setUser test", async () => {
      await vote.setUser("mobumsae");
    });
    it("getUser test", async () => {
      const result = await vote.getUser();
      assert.equal(result.toString(), {
        name: "mobumsae",
        length: web3.utils.BN(1),
      });
    });
  });
});
