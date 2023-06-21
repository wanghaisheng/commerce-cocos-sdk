// Copyright 2022 Xsolla Inc. All Rights Reserved.

import { _decorator, Component, Node, Label, Sprite, instantiate, Button } from 'cc';
import { StoreBundleContent, StoreItem, VirtualCurrencyPackage } from 'db://xsolla-commerce-sdk/scripts/api/XsollaCatalog';
import { CurrencyFormatter } from '../../Common/CurrencyFormatter';
import { PurchaseUtil } from '../../Common/PurchaseUtil';
import { BundleContentItem } from '../Misc/BundleContentItem';
import { ImageUtils } from '../Utils/ImageUtils';
import { StoreManager } from './StoreManager';
const { ccclass, property } = _decorator;

@ccclass('StoreItemInfoManager')
export class StoreItemInfoManager extends Component {

    @property(Sprite)
    icon: Sprite;

    @property(Label)
    itemName: Label;

    @property(Label)
    description: Label;

    @property(Node)
    bundleContainer: Node;

    @property(Label)
    bundleLabel: Label;

    @property(Node)
    bundleList: Node;

    @property(Sprite)
    currency: Sprite;

    @property(Label)
    price: Label;

    @property(Label)
    priceWithoutDiscount: Label;

    @property(Node)
    freePrice: Node;

    @property(Button)
    buyBtn: Button;

    @property(Button)
    closeBtn: Button;

    private _parent: StoreManager;

    private _data: StoreItem | VirtualCurrencyPackage;

    onEnable() {
        this.addListeners();
    }

    onDisable() {
        this.removeListeners();
    }

    addListeners () {
        this.buyBtn.node.on(Button.EventType.CLICK, this.buyItemClicked, this);
        this.closeBtn.node.on(Button.EventType.CLICK, this.closeClicked, this);
    }

    removeListeners () {
        this.buyBtn.node.off(Button.EventType.CLICK, this.buyItemClicked, this);
        this.closeBtn.node.off(Button.EventType.CLICK, this.closeClicked, this);
    }

    init(item:StoreItem | VirtualCurrencyPackage, parent:StoreManager, bundleContent?:Array<StoreBundleContent>) {

        this._parent = parent;
        this._data = item;

        ImageUtils.loadImage(item.image_url, spriteFrame => {
            if(this.icon != null) {
                this.icon.spriteFrame = spriteFrame;
            }
        });

        this.itemName.string = item.name;
        this.description.string = item.description;

        let isVirtualCurrency = item.virtual_prices.length > 0;
        let isFree = !isVirtualCurrency && item.price == null;

        let price;
        let priceWithoutDiscount;
        if(isVirtualCurrency) {
            price =  item.virtual_prices[0].amount.toString();
            priceWithoutDiscount =  item.virtual_prices[0].amount_without_discount.toString();
        } else if (!isFree) {
            price = CurrencyFormatter.formatPrice(parseFloat(item.price.amount), item.price.currency);
            priceWithoutDiscount = CurrencyFormatter.formatPrice(parseFloat(item.price.amount_without_discount), item.price.currency);
        }

        this.price.string = price;
        this.priceWithoutDiscount.string = priceWithoutDiscount;

        this.currency.node.active = isVirtualCurrency;
        this.price.node.active = !isFree;
        this.priceWithoutDiscount.node.active = !isFree;
        this.priceWithoutDiscount.node.getParent().active = !isFree && price != priceWithoutDiscount;
        this.freePrice.active = isFree;
        this.bundleContainer.active = bundleContent != null;

        if(isVirtualCurrency) {
            ImageUtils.loadImage(item.virtual_prices[0].image_url, spriteFrame => {
                if(this.currency != null) {
                    this.currency.spriteFrame = spriteFrame;
                }
            });
        }

        if(bundleContent) {
            this.bundleList.destroyAllChildren();
            this.bundleLabel.string = 'This bundle includes '+ bundleContent.length + ' items:'
            for(let bundle of bundleContent) {
                let bundleItem = instantiate(this._parent.bundleItemPrefab);
                this.bundleList.addChild(bundleItem);
                bundleItem.getComponent(BundleContentItem).init(bundle);
            }
        }
    }

    buyItemClicked() {
        PurchaseUtil.buyItem(this._data, () => {
            this._parent.refreshVCBalance();
            this._parent.openAllItemsScreen();
            this._parent.currencyClicked();
        });
    }

    closeClicked() {
        this._parent.openAllItemsScreen();
    }
}