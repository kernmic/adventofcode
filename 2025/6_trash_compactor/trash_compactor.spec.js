import {expect, describe, test} from 'vitest'
import {countFreshIngredients, countMaxNrOfFreshIngredients} from "../5_cafeteria/cafeteria";
import {findGrandTotal} from "./trash_compactor";

const input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   + `;

describe("trash compactor", () => {
    test('should correctly calculate grand total', async () => {
        const result = await findGrandTotal({
            body: input
        });
        expect(result).toBe(4277556);
    })
});