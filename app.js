import { Token } from "./model/token";

App({
  onLaunch: async function() {
    const token = new Token();
    await token.verify();
  }
});
