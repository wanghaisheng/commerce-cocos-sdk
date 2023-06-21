// Copyright 2023 Xsolla Inc. All Rights Reserved.

import { _decorator, Component, Button, Texture2D, Sprite, SpriteFrame, UITransform } from 'cc';
const { ccclass, property, executeInEditMode} = _decorator;
 
@ccclass('UserAvatarItem')
@executeInEditMode(true)
export class UserAvatarItem extends Component {

    @property(Sprite)
    avatarSprite: Sprite;

    @property(Sprite)
    selectionSprite: Sprite;

    @property(Button)
    btn: Button;

    static AVATAR_PICK: string = 'avatarPick';

    private _texture: Texture2D;

    start() {
        this.showSelection(false);
    }

    onEnable() {
        this.addListeners();
    }

    onDisable() {
        this.removeListeners();
    }

    addListeners () {
        this.btn.node.on(Button.EventType.CLICK, this.onClicked, this);
    }

    removeListeners () {
        this.btn.node.off(Button.EventType.CLICK, this.onClicked, this);
    }

    init(texture: Texture2D) {
        const spriteFrame = new SpriteFrame();
        spriteFrame.texture = texture;
        this.avatarSprite.spriteFrame = spriteFrame;
        this.avatarSprite.getComponent(UITransform).setContentSize(80, 80); 
        this._texture = texture;
    }

    onClicked() {
        if(this.isSelected()) {
            return;
        }
        this.showSelection(true);
        this.node.emit(UserAvatarItem.AVATAR_PICK, this._texture);
    }

    showSelection(showSelection: boolean) {
        this.selectionSprite.node.active = showSelection;
    }

    isSelected(): boolean {
        return this.selectionSprite.node.active;
    }
}