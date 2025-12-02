import {secretEntrance1} from "../../1_secret_entrance/secret_entrance_1.js";
import {secretEntrance2} from "../../1_secret_entrance/secret_entrance_2.js";


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
    }
];
