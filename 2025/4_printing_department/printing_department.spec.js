import {expect, describe, test} from 'vitest'

import {findLocationsWithLessThan4Adjacents, removePaperrolls} from "./printing_department";

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
    test('should remove correct amount', async ()=> {
        expect((await removePaperrolls({
            body: xyz
        }))).toBe(43)
    })

})