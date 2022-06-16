// Copyright 2022 Xsolla Inc. All Rights Reserved.

import { sys, Texture2D } from "cc";
import { UserDetailsUpdate } from "../api/XsollaUserAccount";
import { Xsolla } from "../Xsolla";
import { TokenStorage } from "./TokenStorage";

export class NativeUtil {
    static authSocial(socialNetworkName: string) {
        if(sys.platform.toLowerCase() == 'ios') {
            jsb.reflection.callStaticMethod("XsollaNativeUtils", "authViaSocialNetwork:client:state:redirect:",
                socialNetworkName, Xsolla.settings.clientId, 'xsollatest', 'app://xsollalogin');
        }
        if(sys.platform.toLowerCase() == 'android') {
            jsb.reflection.callStaticMethod("com/cocos/game/XsollaNativeAuth", "authSocial", "(Ljava/lang/String;ZZ)V", socialNetworkName, true, false);
        }
    }

    static modifyUserAccountData(userDetailsUpdate: UserDetailsUpdate) {
        if (sys.platform.toLowerCase() == 'ios') {
            jsb.reflection.callStaticMethod("XsollaNativeUtils", "modifyUserAccountData:userBirthday:userFirstName:userGender:userLastName:userNickname:",
        TokenStorage.token.access_token, userDetailsUpdate.birthday, userDetailsUpdate.first_name, userDetailsUpdate.gender, userDetailsUpdate.last_name, userDetailsUpdate.nickname);
        }
        if (sys.platform.toLowerCase() == 'android') {
            jsb.reflection.callStaticMethod("com/cocos/game/XsollaNativeUtils", "modifyUserAccountData",
        "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
            TokenStorage.token.access_token, userDetailsUpdate.birthday,
            userDetailsUpdate.first_name, userDetailsUpdate.gender,
            userDetailsUpdate.last_name, userDetailsUpdate.nickname);
        }
    }

    static updateUserAvatar(avatarUpdate: Texture2D) {
        if (sys.platform.toLowerCase() == 'ios') {
            jsb.reflection.callStaticMethod("XsollaNativeUtils", "updateUserProfilePicture:authToken:",
            avatarUpdate.image.nativeUrl, TokenStorage.token.access_token);
        }
        if (sys.platform.toLowerCase() == 'android') {
            jsb.reflection.callStaticMethod("com/cocos/game/XsollaNativeUtils", "updateUserProfilePicture", "(Ljava/lang/String;Ljava/lang/String;)V",
            avatarUpdate.image.nativeUrl, TokenStorage.token.access_token);
        }
    }

    static linkSocialNetwork(networkName: string) {
        if (sys.platform.toLowerCase() == 'ios') {
            jsb.reflection.callStaticMethod("XsollaNativeUtils", "linkSocialNetwork:networkName:redirectUri:",
                TokenStorage.token.access_token,
                networkName,
                "app://xlogin." + NativeUtil.getAppId());
        }

        if (sys.platform.toLowerCase() == 'android') {
            jsb.reflection.callStaticMethod("com/cocos/game/XsollaNativeUtils", "linkSocialNetwork",
                "(Ljava/lang/String;Ljava/lang/String;)V",
                TokenStorage.token.access_token,
                networkName);
        }
    }

    static openPurchaseUI(token: string, sandbox: boolean) {
        if (sys.platform.toLowerCase() == 'ios') {
            jsb.reflection.callStaticMethod("XsollaNativeUtils", "openPurchaseUI:sandbox:redirectUri:",
                token,
                sandbox,
                "app://xpayment." + NativeUtil.getAppId());
        }

        if (sys.platform.toLowerCase() == 'android') {
            jsb.reflection.callStaticMethod("com/cocos/game/XsollaNativePayments", "openPurchaseUI",
                "(Ljava/lang/String;ZLjava/lang/String;Ljava/lang/String;)V",
                token,
                sandbox,
                "app",
                "xpayment." + NativeUtil.getAppId());
        }
    }

    static getAppId() {
        let appId:string;
        if (sys.platform.toLowerCase() == 'ios') {
            appId = jsb.reflection.callStaticMethod("XsollaNativeUtils", "getBundleIdentifier");
        }
        if (sys.platform.toLowerCase() == 'android') {
            appId = jsb.reflection.callStaticMethod("com/cocos/game/XsollaNativeUtils", "getPackageName", "()Ljava/lang/String;");
        }
        return appId;
    }
}