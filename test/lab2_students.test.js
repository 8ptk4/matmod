const assert = require('chai').assert;
const f = require('../lab2.js');

describe('Lab2 tests', function () {
    it('Mean of [21.3232, 38.3422, 12.7212, 41.6178] should be 28.5011', function () {
        assert.equal(f.mean([21.3232, 38.3422, 12.7212, 41.6178]), 28.5011)
    })

    it('Population standard deviation of [21.3232, 38.3422, 12.7212, 41.6178] should be 13.7771', function () {
        assert.equal(f.standardDeviation([21.3232, 38.3422, 12.7212, 41.6178]), 13.7771)
    })
})


