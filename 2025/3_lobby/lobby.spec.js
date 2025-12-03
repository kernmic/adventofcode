import {expect, describe, test} from 'vitest'
import {findLargestJoltage, findLargestJoltage12, lobby1, lobby2} from "./lobby";

describe('lobby 1', () => {
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

describe.only('lobby 2', () => {
    test('1', () => {
        expect(findLargestJoltage12('987654321111111')).toBe(987654321111)
    })
    test('2', () => {
        expect(findLargestJoltage12('811111111111119')).toBe(811111111119)
    })
    test('3', () => {
        expect(findLargestJoltage12('234234234234278')).toBe(434234234278)
    })
    test('4', () => {
        expect(findLargestJoltage12('818181911112111')).toBe(888911112111)
    })
    test('complete test', async () => {
        const response = await lobby2({
            body: `987654321111111
811111111111119
234234234234278
818181911112111`
        })
        expect(response).toBe(3121910778619)
    })
})

