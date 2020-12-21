const assert = require('chai').assert;
const f = require('../lab3.js');

function isEqual(a, b) 
{ 
    // if length is not equal 
    if(a.length!=b.length) 
        return false; 
    else
    { 
        // comapring each element of array 
        for(var i=0;i<a.length;i++) 
        {
            if(a[i]!=b[i]) 
                return false; 
        }
        return true; 
    } 
} 

describe('Lab3 tests', function () {
    it('Exercise01 p-value', function () {
        assert.equal(f.exercise01(), 0.0044)
    })

    it('Exercise02 twosided confidence interval of mean', function () {
        let data1 = [1.864052345967664053e+02,
            5.001572083672233049e+01,
            1.078737984105739258e+02,
            2.340893199201457833e+02,
            1.967557990149967395e+02,
            -8.772778798764110775e+01,
            1.050088417525589364e+02,
            -5.135720829769788054e+00,
            -3.218851793557853114e-01,
            5.105985019383723511e+01
            ]
        let data2 = [-9.823594765403234064e+00,
            -9.959984279163277776e+00,
            -9.902126201589426913e+00,
            -9.775910680079853421e+00,
            -9.813244200985003829e+00,
            -1.009772778798764037e+01,
            -9.904991158247440808e+00,
            -1.001513572082976999e+01,
            -1.001032188517935495e+01,
            -9.958940149806162268e+00
            ]
        let data3 = [1.764052345967664026e+00,
            4.001572083672232938e-01,
            9.787379841057392005e-01,
            2.240893199201457797e+00,
            1.867557990149967484e+00,
            -9.772778798764110153e-01,
            9.500884175255893682e-01,
            -1.513572082976978872e-01,
            -1.032188517935578448e-01,
            4.105985019383723289e-01
            ]
        assert.isTrue(isEqual(f.exercise02(data1), [20.6198, 146.9848]))
        assert.isTrue(isEqual(f.exercise02(data2), [-9.9894, -9.8630]))
        assert.isTrue(isEqual(f.exercise02(data3), [0.1062, 1.3698]))
    })

    it('Exercise03 sample size', function () {
        // Width 0.03
        assert.equal(f.exercise03(1.64, 0.03), 2989)
        assert.equal(f.exercise03(1.96, 0.03), 4269)
        assert.equal(f.exercise03(2.33, 0.03), 6033)
        assert.isBelow(f.exercise03(2.58, 0.03), 7397.1)
        assert.isAbove(f.exercise03(2.58, 0.03), 7395.9)
        
        
        // Width 0.01
        assert.equal(f.exercise03(1.64, 0.01), 26896)
        assert.equal(f.exercise03(1.96, 0.01), 38416)
        assert.equal(f.exercise03(2.33, 0.01), 54289)
        assert.equal(f.exercise03(2.58, 0.01), 66564)

        // Width 0.5
        assert.equal(f.exercise03(1.64, 0.5), 11)
        assert.equal(f.exercise03(1.96, 0.5), 16)
        assert.equal(f.exercise03(2.33, 0.5), 22)
        assert.equal(f.exercise03(2.58, 0.5), 27)

        // Width 0.005
        assert.equal(f.exercise03(1.64, 0.005), 107584)
        assert.equal(f.exercise03(1.96, 0.005), 153664)
        assert.equal(f.exercise03(2.33, 0.005), 217156)
        assert.equal(f.exercise03(2.58, 0.005), 266256)
    })

    it('Exercise04 Probability of normal distribution', function () {
        assert.equal(f.exercise04(), 0.309)
    })

    /*
    it('Exercise05 reject null-hypothesis small sample of population mean', function () {
        assert.equal(f.exercise05(), 28.5011)
    })
    
    it('Exercise06 Linear Regression', function () {
        assert.equal(f.exercise06(), 28.5011)
    })

    it('Exercise07 Linear Regression confidence interval', function () {
        assert.equal(f.exercise07(), 28.5011)
    })
    */
})


