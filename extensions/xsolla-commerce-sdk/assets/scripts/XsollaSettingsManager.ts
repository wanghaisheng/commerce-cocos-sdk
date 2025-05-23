// Copyright 2025 Xsolla Inc. All Rights Reserved.

import { _decorator, Component, Enum, CCInteger, sys} from 'cc';
import { XsollaSettings, Xsolla, PaymentRedirectCondition, PaymentRedirectStatusManual, RedirectPolicySettings, PaymentUISettings } from './Xsolla';
const { ccclass, property, disallowMultiple, type } = _decorator;

@ccclass('XsollaSettingsManager')
@disallowMultiple(true)
export class XsollaSettingsManager extends Component {

    @property({
        displayName: 'Settings validation',
        tooltip: 'Some settings have incorrect values',
        group: 'General'
    })
    get errorField() {
        return this.getSettingsError();
    }

    @property({
        displayName: 'Login ID',
        tooltip: 'Login ID in the UUID format from your Publisher Account (required)',
        group: 'General'
    })
    loginId: string = '026201e3-7e40-11ea-a85b-42010aa80004';

    @property({
        displayName: 'Project ID',
        tooltip: 'Project ID from your Publisher Account (required)',
        group: 'General'
    })
    projectId: string = '77640';

    @property ({
        displayName: 'Client ID',
        tooltip: 'Client ID from your Publisher Account',
        group: 'General',
        type: CCInteger,
        min: 1,
        step: 1
    })
    clientId: number = 57;

    @property ({
        displayName: 'Redirect URI',
        tooltip: 'URI to redirect the user to after signing up, logging in, or password reset. Must be identical to the OAuth 2.0 redirect URI specified in Publisher Account in Login -> Security -> OAuth 2.0 settings.',
        group: 'General'
    })
    redirectURI: string = 'https://login.xsolla.com/api/blank';

    @property ({
        displayName: 'Enable Sandbox',
        tooltip: 'Enable to test the payment process: sandbox-secure.xsolla.com will be used instead of secure.xsolla.com.',
        group: 'General'
    })
    enableSandbox: boolean = true;

    @property ({
        displayName: 'Enable In-App Browser',
        tooltip: 'If the option is enabled, the in-app browser is used to open Pay Station or a window for social login.',
        group: 'General'
    })
    enableInAppBrowser: boolean = true;

    @property ({
        displayName: 'Payment UI Theme Id',
        tooltip: 'User interface theme ID for the payment interface. To use default themes, enter "63295a9a2e47fab76f7708e1" (light) or "63295aab2e47fab76f7708e3" (dark) values. Or enter the ID of a custom theme you have configured in Publisher Account to use it.',
        group: {name: 'Paystation UI', id: 'Paystation UI'}
    })
    paymentInterfaceThemeId: string = "63295aab2e47fab76f7708e3";

    @property ({
        displayName: 'Use settings from publisher account',
        tooltip: 'Disable to override default redirect policy for payments.',
        group: {name: 'Redirect Policy WebGL', id: 'Redirect Policy'}
    })
    UseSettingsFromPublisherAccountWebGL: boolean = true;

    @property ({
        displayName: 'Return Url',
        tooltip: 'Page to redirect user to after the payment.',
        group: {name: 'Redirect Policy WebGL', id: 'Redirect Policy'}
    })
    returnUrlWebGL: string = '';

    @property ({
        displayName: 'Redirect Condition',
        tooltip: 'Payment status that triggers user redirect to the return URL.',
        group: {name: 'Redirect Policy WebGL', id: 'Redirect Policy'}
    })
    @type(Enum(PaymentRedirectCondition))
    redirectConditionWebGL: PaymentRedirectCondition = PaymentRedirectCondition.none;

    @property ({
        displayName: 'Redirect Delay',
        tooltip: 'Delay after which the user will be automatically redirected to the return URL.',
        group: {name: 'Redirect Policy WebGL', id: 'Redirect Policy'}
    })
    redirectDelayWebGL: number = 0;

    @property ({
        displayName: 'Redirect Status Manual',
        tooltip: 'Payment status triggering the display of a button clicking which redirects the user to the return URL.',
        group: {name: 'Redirect Policy WebGL', id: 'Redirect Policy'}
    })
    @type(Enum(PaymentRedirectStatusManual))
    redirectStatusManualWebGL: PaymentRedirectStatusManual = PaymentRedirectStatusManual.none;

    @property ({
        displayName: 'Redirect Button Caption',
        tooltip: 'Redirect button caption.',
        group: {name: 'Redirect Policy WebGL', id: 'Redirect Policy'}
    })
    redirectButtonCaptionWebGL: string = '';

    @property ({
        displayName: 'Use settings from publisher account',
        tooltip: 'Disable to override default redirect policy for payments.',
        group: {name: 'Redirect Policy Android', id: 'Redirect Policy'}
    })
    UseSettingsFromPublisherAccountAndroid: boolean = true;

    @property ({
        displayName: 'Return Url',
        tooltip: 'Page to redirect user to after the payment.',
        group: {name: 'Redirect Policy Android', id: 'Redirect Policy'}
    })
    returnUrlAndroid: string = '';

    @property ({
        displayName: 'Redirect Condition',
        tooltip: 'Payment status that triggers user redirect to the return URL.',
        group: {name: 'Redirect Policy Android', id: 'Redirect Policy'}
    })
    @type(Enum(PaymentRedirectCondition))
    redirectConditionAndroid: PaymentRedirectCondition = PaymentRedirectCondition.none;

    @property ({
        displayName: 'Redirect Delay',
        tooltip: 'Delay after which the user will be automatically redirected to the return URL.',
        group: {name: 'Redirect Policy Android', id: 'Redirect Policy'}
    })
    redirectDelayAndroid: number = 0;

    @property ({
        displayName: 'Redirect Status Manual',
        tooltip: 'Payment status triggering the display of a button clicking which redirects the user to the return URL.',
        group: {name: 'Redirect Policy Android', id: 'Redirect Policy'}
    })
    @type(Enum(PaymentRedirectStatusManual))
    redirectStatusManualAndroid: PaymentRedirectStatusManual = PaymentRedirectStatusManual.none;

    @property ({
        displayName: 'Redirect Button Caption',
        tooltip: 'Redirect button caption.',
        group: {name: 'Redirect Policy Android', id: 'Redirect Policy'}
    })
    redirectButtonCaptionAndroid: string = '';

    @property ({
        displayName: 'Use settings from publisher account',
        tooltip: 'Disable to override default redirect policy for payments.',
        group: {name: 'Redirect Policy IOS', id: 'Redirect Policy'}
    })
    UseSettingsFromPublisherAccountIOS: boolean = true;

    @property ({
        displayName: 'Return Url',
        tooltip: 'Page to redirect user to after the payment.',
        group: {name: 'Redirect Policy IOS', id: 'Redirect Policy'}
    })
    returnUrlIOS: string = '';

    @property ({
        displayName: 'Redirect Condition',
        tooltip: 'Payment status that triggers user redirect to the return URL.',
        group: {name: 'Redirect Policy IOS', id: 'Redirect Policy'}
    })
    @type(Enum(PaymentRedirectCondition))
    redirectConditionIOS: PaymentRedirectCondition = PaymentRedirectCondition.none;

    @property ({
        displayName: 'Redirect Delay',
        tooltip: 'Delay after which the user will be automatically redirected to the return URL.',
        group: {name: 'Redirect Policy IOS', id: 'Redirect Policy'}
    })
    redirectDelayIOS: number = 0;

    @property ({
        displayName: 'Redirect Status Manual',
        tooltip: 'Payment status triggering the display of a button clicking which redirects the user to the return URL.',
        group: {name: 'Redirect Policy IOS', id: 'Redirect Policy'}
    })
    @type(Enum(PaymentRedirectStatusManual))
    redirectStatusManualIOS: PaymentRedirectStatusManual = PaymentRedirectStatusManual.none;

    @property ({
        displayName: 'Redirect Button Caption',
        tooltip: 'Redirect button caption.',
        group: {name: 'Redirect Policy IOS', id: 'Redirect Policy'}
    })
    redirectButtonCaptionIOS: string = '';

    @property({
        tooltip: 'Facebook app identifier (can be obtained on Facebook developer page). Used for native user authentication via Facebook Android application.',
        group: {name: 'Android', id: 'General'}
    })
    facebookAppId: String = '';

    @property({
        tooltip: 'Facebook client token (can be obtained on Facebook developer page). Used for native user authentication via Facebook Android application.',
        group: {name: 'Android', id: 'General'}
    })
    facebookClientToken: String = '';

    @property({
        tooltip: 'Google app identifier (can be obtained on Google developer page). Used for native user authentication via Google Android application.',
        group: {name: 'Android', id: 'General'}
    })
    googleAppId: String = '';

    @property({
        tooltip: 'WeChat app identifier (can be obtained on WeChat developer page). Used for native user authentication via WeChat Android application.',
        group: {name: 'Android', id: 'General'}
    })
    wechatAppId: String = '';

    @property({
        tooltip: 'QQ app identifier (can be obtained on QQ developer page). Used for native user authentication via QQ Android application.',
        group: {name: 'Android', id: 'General'}
    })
    qqAppId: String = '';

    start() {

        let redirectPolicySettingsWebGL: RedirectPolicySettings = {
            useSettingsFromPublisherAccount: this.UseSettingsFromPublisherAccountWebGL,
            returnUrl: this.returnUrlWebGL,
            redirectCondition: this.redirectConditionWebGL,
            redirectDelay: this.redirectDelayWebGL,
            redirectStatusManual: this.redirectStatusManualWebGL,
            redirectButtonCaption: this.redirectButtonCaptionWebGL
        };

        let redirectPolicySettingsAndroid: RedirectPolicySettings = {
            useSettingsFromPublisherAccount: this.UseSettingsFromPublisherAccountAndroid,
            returnUrl: this.returnUrlAndroid,
            redirectCondition: this.redirectConditionAndroid,
            redirectDelay: this.redirectDelayAndroid,
            redirectStatusManual: this.redirectStatusManualAndroid,
            redirectButtonCaption: this.redirectButtonCaptionAndroid
        };

        let redirectPolicySettingsIOS: RedirectPolicySettings = {
            useSettingsFromPublisherAccount: this.UseSettingsFromPublisherAccountIOS,
            returnUrl: this.returnUrlIOS,
            redirectCondition: this.redirectConditionIOS,
            redirectDelay: this.redirectDelayIOS,
            redirectStatusManual: this.redirectStatusManualIOS,
            redirectButtonCaption: this.redirectButtonCaptionIOS
        };

        let paymentUISettings: PaymentUISettings = {
            theme: this.paymentInterfaceThemeId,
        };

        var settings: XsollaSettings = {
            loginId: this.loginId,
            projectId: this.projectId,
            clientId: this.clientId,
            redirectURI: this.redirectURI,
            enableSandbox: this.enableSandbox,
            enableInAppBrowser: this.enableInAppBrowser,
            paymentUISettings: paymentUISettings,
            redirectPolicySettingsWebGL: redirectPolicySettingsWebGL,
            redirectPolicySettingsAndroid: redirectPolicySettingsAndroid,
            redirectPolicySettingsIOS: redirectPolicySettingsIOS
        }

        Xsolla.init(settings);

        if (sys.platform.toLowerCase() == 'android') {
            jsb.reflection.callStaticMethod("com/cocos/game/XsollaNativeAuth", "xLoginInit",
                "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
                Xsolla.settings.loginId,
                Xsolla.settings.clientId.toString(),
                this.facebookAppId,
                this.facebookClientToken,
                this.googleAppId,
                this.wechatAppId,
                this.qqAppId);
        }
    }

    getSettingsError() {
        var regex = new RegExp('^(?:\\{{0,1}(?:[0-9a-fA-F]){8}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){12}\\}{0,1})$');
        if (!regex.test(this.loginId))
            return "Login ID has incorrect value";

        regex = new RegExp("^[1-9]\\d*$");
        if (!regex.test(this.projectId))
            return "Project ID has incorrect value";

        if (this.clientId <= 0)
            return "Client ID has incorrect value";

        return "ID format is valid";
    }
}
