import {expect, describe, test} from 'vitest'

import {findLocationsWithLessThan4Adjacents} from "./printing_department";

const xyz = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`

describe('printing department', () => {
    test('should calculate correct amount', async ()=> {
        expect((await findLocationsWithLessThan4Adjacents({
            body: xyz
        }))).toBe(13)
    })
})