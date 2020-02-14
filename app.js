import {Token} from "./model/token";

App({
    onLaunch: function () {
        const token = new Token()
        token.verify()
    }
})
