// Copyright 2023 Xsolla Inc. All Rights Reserved.

import { _decorator, Component, Node, Sprite, Label, Button, UITransform, Color } from 'cc';
import { StoreItem as XsollaStoreItem, VirtualCurrencyPackage } from 'db://xsolla-commerce-sdk/scripts/api/XsollaCatalog';
import { CurrencyFormatter } from '../../Common/CurrencyFormatter';
import { PurchaseUtil } from '../../Common/PurchaseUtil';
import { StoreManager } from '../Screens/StoreManager';
import { ImageUtils } from '../Utils/ImageUtils';
const { ccclass, property } = _decorator;
 
@ccclass('StoreItem')
export class StoreItem extends Component {

    @property(Sprite)
    background: Sprite;

    @property(Node)
    container: Node;

    @property(Sprite)
    icon: Sprite;

    @property(Node)
    timerContainer: Node;

    @property(Label)
    timerLabel: Label;

    @property(Label)
    itemName: Label;

    @property(Sprite)
    currencyIcon: Sprite;

    @property(Label)
    price: Label;

    @property(Label)
    priceWithoutDiscount: Label;

    @property(Node)
    freePrice: Node;

    @property(Button)
    buyBtn: Button;

    @property(Button)
    previewBtn: Button;

    @property(Button)
    infoBtn: Button;

    @property(Label)
    purchased: Label;

    private _parent: StoreManager;

    private _data: XsollaStoreItem | VirtualCurrencyPackage;

    onEnable() {
        this.addListeners();
    }

    onDisable() {
        this.removeListeners();
    }

    addListeners () {
        this.buyBtn.node.on(Button.EventType.CLICK, this.onBuyClicked, this);
        this.previewBtn.node.on(Button.EventType.CLICK, this.onInfoClicked, this);
        this.infoBtn.node.on(Button.EventType.CLICK, this.onInfoClicked, this);
    }

    removeListeners () {
        this.buyBtn.node.off(Button.EventType.CLICK, this.onBuyClicked, this);
        this.previewBtn.node.off(Button.EventType.CLICK, this.onInfoClicked, this);
        this.infoBtn.node.off(Button.EventType.CLICK, this.onInfoClicked, this);
    }

    init(data: XsollaStoreItem | VirtualCurrencyPackage, parent:StoreManager, isItemInInventory: boolean = false) {
        if(data == null) {
            this.background.color = new Color(0, 0, 0, 0);
            this.infoBtn.node.active = false;
            this.icon.node.active = false;
            this.container.active = false;
            return;
        }
        this._parent = parent;
        this._data = data;
        this.timerContainer.active = data.virtual_item_type == 'non_renewing_subscription';
        let isItemPurchased = data.virtual_item_type == 'non_consumable' && isItemInInventory;
        let isBundle = data.bundle_type && data.bundle_type.length > 0 && data.bundle_type != 'virtual_currency_package';
        this.buyBtn.node.active = !isItemPurchased && !isBundle;
        this.purchased.node.active = isItemPurchased;
        this.previewBtn.node.active = isBundle;

        let isVirtualCurrency = data.virtual_prices.length > 0;
        let isFree = !isVirtualCurrency && data.price == null;

        if (data.inventory_options && data.inventory_options.expiration_period) {
            this.timerLabel.string = data.inventory_options.expiration_period.value + data.inventory_options.expiration_period.type;
        }
        this.itemName.string = data.name;
        
        let price;
        let priceWithoutDiscount;
        if (isVirtualCurrency) {
            price = data.virtual_prices[0].amount.toString();
            priceWithoutDiscount = data.virtual_prices[0].amount_without_discount.toString();
        } else if (!isFree) {
            price = CurrencyFormatter.formatPrice(parseFloat(data.price.amount), data.price.currency);
            priceWithoutDiscount = CurrencyFormatter.formatPrice(parseFloat(data.price.amount_without_discount), data.price.currency);
        }

        this.price.string = price;
        this.priceWithoutDiscount.string = priceWithoutDiscount;

        this.currencyIcon.node.active = isVirtualCurrency;
        this.price.node.active = !isFree;
        this.priceWithoutDiscount.node.active = !isFree;
        this.priceWithoutDiscount.node.getParent().active = !isFree && price != priceWithoutDiscount;
        this.freePrice.active = isFree;

        ImageUtils.loadImage(data.image_url, spriteFrame => {
            if(this.icon != null) {
                this.icon.spriteFrame = spriteFrame;
            }
        });

        if(isVirtualCurrency) {
            ImageUtils.loadImage(data.virtual_prices[0].image_url, spriteFrame => {
                if(this.currencyIcon != null) {
                    this.currencyIcon.spriteFrame = spriteFrame;
                    this.currencyIcon.getComponent(UITransform).setContentSize(20, 20); 
                }
            });
        }
    }

    onBuyClicked() {
        PurchaseUtil.buyItem(this._data, () => {
            this._parent.refreshVCBalance();
        });
    }

    onInfoClicked() {
        this._parent.showItemInfo(this._data);
    }
}
