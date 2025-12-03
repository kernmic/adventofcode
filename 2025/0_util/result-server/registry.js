import {secretEntrance1} from "../../1_secret_entrance/secret_entrance_1.js";
import {secretEntrance2} from "../../1_secret_entrance/secret_entrance_2.js";
import {giftShop1} from "../../2_gift_shop/gift_shop_1.js";
import {lobby1, lobby2} from "../../3_lobby/lobby.js";


export const registry = [
    {
        name: 'Day 1: Secret Entrance',
        handler: secretEntrance1,
        url: '/day1_secret_entrance'
    },
    {
        name: 'Day 1: Secret Entrance. Part Two.',
        handler: secretEntrance2,
        url: '/day1_secret_entrance2'
    },
    {
        name: 'Day 2: Gift Shop',
        handler: giftShop1,
        url: '/day2_gift_shop'
    },
    {
        name: 'Day 3: Lobby',
        handler: lobby1,
        url: '/day3_lobby'
    },
    {
        name: 'Day 3: Lobby. Part Two',
        handler: lobby2,
        url: '/day3_lobby_2'
    }
];
