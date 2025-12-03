import {expect, describe, test} from 'vitest'
import {findLargestJoltage, lobby1} from "./lobby";

describe('lobby', () => {
    test('1', () => {
        expect(findLargestJoltage('987654321111111')).toBe(98)
    })
    test('2', () => {
        expect(findLargestJoltage('811111111111119')).toBe(89)
    })
    test('3', () => {
        expect(findLargestJoltage('234234234234278')).toBe(78)
    })
    test('4', () => {
        expect(findLargestJoltage('818181911112111')).toBe(92)
    })
    test('complete test', async () => {
        const response = await lobby1({
            body: `987654321111111
811111111111119
234234234234278
818181911112111`
        })
        expect(response).toBe(357)
    })
})

