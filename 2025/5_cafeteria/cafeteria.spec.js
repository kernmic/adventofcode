import {expect, describe, test} from 'vitest'
import {countFreshIngredients} from "./cafeteria";

const input = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

describe("cafeteria", () => {
    test('should correctly count fresh ids', async () => {
        const result = await countFreshIngredients({
            body: input
        });
        expect(result).toBe(3);
    })
});