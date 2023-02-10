const daovote = artifacts.require("B2");

module.exports = async function (deployer) {
  await deployer.deploy(daovote);
};
