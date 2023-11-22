// Copyright 2023 Xsolla Inc. All Rights Reserved.

import { _decorator, Component, Sprite, Label } from 'cc';
import { RedeemedCouponItem as XsollaRedeemedCouponItem} from 'db://xsolla-commerce-sdk/scripts/api/XsollaCatalog';
import { ImageUtils } from 'db://xsolla-commerce-sdk/scripts/common/ImageUtils';
import { UIManager } from '../UIManager';
const { ccclass, property } = _decorator;
 
@ccclass('RedeemedCouponItem')
export class RedeemedCouponItem extends Component {

    @property(Sprite)
    icon: Sprite;

    @property(Label)
    itemName: Label;

    @property(Label)
    description: Label;

    @property(Label)
    counter: Label;

    init(bundle: XsollaRedeemedCouponItem) {
        ImageUtils.loadImage(bundle.image_url, spriteFrame => {
            if(this.icon != null) {
                this.icon.spriteFrame = spriteFrame;
            }
        }, error => {
            UIManager.instance.showErrorPopup(error);
        });
        this.itemName.string = bundle.name;
        this.description.string = bundle.description;
        this.counter.string = bundle.quantity.toString();
    }
}