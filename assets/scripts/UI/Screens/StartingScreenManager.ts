// Copyright 2023 Xsolla Inc. All Rights Reserved.

import { _decorator, Component, Button, sys } from 'cc';
import { XsollaAuth } from 'db://xsolla-commerce-sdk/scripts/api/XsollaAuth';
import { TokenStorage } from "db://xsolla-commerce-sdk/scripts/common/TokenStorage";
import { UIManager, UIScreenType } from '../UIManager';
const { ccclass, property } = _decorator;
 
@ccclass('StartingScreenManager')
export class StartingScreenManager extends Component {

    @property(Button)
    basicAuthButton: Button;

    @property(Button)
    deviceIdAuthButton: Button;

    @property(Button)
    authByEmailButton: Button;

    @property(Button)
    authByPhoneButton: Button;

    @property(Button)
    otherAuthButton: Button;

    start() {
        this.deviceIdAuthButton.node.active = sys.isMobile;
        this.otherAuthButton.node.active = sys.isMobile;
    }

    onEnable() {
        this.addListeners();
    }

    onDisable() {
        this.removeListeners();
    }

    addListeners() {
        this.basicAuthButton.node.on(Button.EventType.CLICK, this.onBasicAuthClicked, this);
        this.deviceIdAuthButton.node.on(Button.EventType.CLICK, this.onDeviceIdAuthClicked, this);
        this.authByEmailButton.node.on(Button.EventType.CLICK, this.onAuthByEmailClicked, this);
        this.authByPhoneButton.node.on(Button.EventType.CLICK, this.onAuthByPhoneClicked, this);
        this.otherAuthButton.node.on(Button.EventType.CLICK, this.onSocialAuthClicked, this);
    }

    removeListeners() {
        this.basicAuthButton.node.off(Button.EventType.CLICK, this.onBasicAuthClicked, this);
        this.deviceIdAuthButton.node.off(Button.EventType.CLICK, this.onDeviceIdAuthClicked, this);
        this.authByEmailButton.node.off(Button.EventType.CLICK, this.onAuthByEmailClicked, this);
        this.authByPhoneButton.node.off(Button.EventType.CLICK, this.onAuthByPhoneClicked, this);
        this.otherAuthButton.node.off(Button.EventType.CLICK, this.onSocialAuthClicked, this);
    }

    onBasicAuthClicked() {
        UIManager.instance.openScreen(UIScreenType.BasicAuth);
    }

    onDeviceIdAuthClicked() {
        let deviceId: string;
        let deviceName: string;
        if(sys.platform.toLowerCase() == 'android') {
            deviceId = jsb.reflection.callStaticMethod("com/cocos/game/XsollaNativeUtils", "getDeviceId", "()Ljava/lang/String;");
            deviceName = jsb.reflection.callStaticMethod("com/cocos/game/XsollaNativeUtils", "getDeviceName", "()Ljava/lang/String;");
        }
        if(sys.platform.toLowerCase() == 'ios') {
            deviceId = jsb.reflection.callStaticMethod("XsollaNativeUtils", "getDeviceId");
            deviceName = jsb.reflection.callStaticMethod("XsollaNativeUtils", "getDeviceName");
        }

        UIManager.instance.showLoaderPopup(true);
        XsollaAuth.authByDeviceId(deviceName, deviceId, 'xsollatest', token => {
            UIManager.instance.showLoaderPopup(false);
            console.log(token);
            TokenStorage.saveToken(token, true);
            UIManager.instance.openScreen(UIScreenType.MainMenu);
        }, err => {
            UIManager.instance.showLoaderPopup(false);
            console.log(err);
            UIManager.instance.showErrorPopup(err.description);
        })
    }

    onAuthByEmailClicked() {
        UIManager.instance.openScreen(UIScreenType.AuthByEmail);
    }

    onAuthByPhoneClicked() {
        UIManager.instance.openScreen(UIScreenType.AuthByPhone);
    }

    onSocialAuthClicked() {
        UIManager.instance.openScreen(UIScreenType.SocialAuth);
    }
}
