/**
 * MA1487 matmod
 * Inlämning 3
 */

// TODO: Patrik Karlsson
// TODO: paka17

const gaussian = require('gaussian');

function distribution(mean, stdDev) {
    return gaussian(mean, Math.pow(stdDev, 2));
}

/*-------------------------------------------------
-------------------------------------------------

-------------------- Svenska -------------------------
Då uppgifterna innehåller kvantiler så ska två decimaler användas,
t.ex. 1.96 för tvåsidigt intervall vid konfidensgrad 95% för normalfördelningen
------------------------------------------------------


When excercise involves quantiles use two decimals, 
e.g. 1.96 for two sided 95% confidence of the normal distribution. 

-------------------------------------------------
-------------------------------------------------*/
function GetZPercent(z) {
    //z == number of standard deviations from the mean

    //if z is greater than 6.5 standard deviations from the mean
    //the number of significant digits will be outside of a reasonable 
    //range
    if ( z < -6.5)
      return 0.0;

    if ( z > 6.5) 
      return 1.0;

    var factK = 1;
    var sum = 0;
    var term = 1;
    var k = 0;
    var loopStop = Math.exp(-23);

    while(Math.abs(term) > loopStop) {
      term = .3989422804 * Math.pow(-1,k) * Math.pow(z,k) / (2 * k + 1) / Math.pow(2,k) * Math.pow(z,k+1) / factK;
      sum += term;
      k++;
      factK *= k;
    }

    sum += 0.5;

    return sum;
}


function getStandardDeviation (array, mean) {
    const n = array.length;

    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / (n - 1));
}


/**
 * -------------------- Svenska -------------------------
 * En webbsida utför ett AB-test för att avgöra vilken UI feature 
 * som bäst på att få besökarna att bli betalande kunder.
 * 1000 av besökarna ser standard interfacet (A) och
 * 300 det nya (B).
 * 250 av A och 100 av B blir betalande kunder.
 * Vad är p-värdet för differansen mellan grupperna?
 * ------------------------------------------------------
 * 
 * A website is doing a AB-test to figure out which UI feature works best
 * in turning visitors to paying customers. 
 * 1000 of the visitors is greated by the standard interface (A) and
 * 300 by the new (B).
 * 250 of A and 100 of B turns into paying customers.
 * What is the p-value of differance between the two groups?
 * 
 * @returns {Number} p-value of differance with 4 decimals
 */
function exercise01() {

    /* Hypotheses
        H0 = piA - piB = 0
        H1 = piA - piB != 0
    */

    const pA = 250 / 1000;
    const pB = 100 / 300;

    const p = ((250 + 100) / (1000 + 300));

    // Test function
    const Z = (pA - pB) / Math.sqrt(p * (1 - p) * (1 / 1000 + 1 / 300))
    
    const pValue = GetZPercent(Z).toFixed(4);
    const TwosidedPvalue = pValue * 2

    return TwosidedPvalue;
}

/**
 * -------------------- Svenska -------------------------
 * Givet en godtycklig datavektor med normalfördelad data.
 * Beräkna det tvåsida 95%-iga konfidensintervallet för populationens medelvärde.
 * 
 * @param {Number[]} data är en vektor med godtycklig data
 * @returns {Number[]} [Undre gräns, Övre gräns]
 * ------------------------------------------------------
 * 
 * Given an abitrary data array with normal distributed data.
 * Calculate the two sided 95% confidence interval for the population mean
 * 
 * @param {Number[]} data is an abitrary data array 
 * @returns {Number[]} [lower bound, upper bound], with 4 decimal precision
 */
function exercise02(data) {
    const sampleSize = data.length;

    const sampleTotal = data.reduce(function(a, b) {
        return a + b;
    }, 0);

    const sampleMean = sampleTotal / sampleSize;
    const standardDeviation = getStandardDeviation(data, sampleMean);
    
    // Value taken from Commonly used z - values for Confidence Interval
    const zValue = 1.96;

    const standardError = (standardDeviation / Math.sqrt(sampleSize));
    const marginOfError = standardError * zValue;

    const lowerBound = sampleMean - marginOfError;
    const upperBound = sampleMean + marginOfError;

    // Took me a while to realize that i had to use Bessel's correction (n - 1) for 
    // the calculation of the standard deviation. Because this is a sample!

    return [lowerBound.toFixed(4), upperBound.toFixed(4)];
}


/**
 * -------------------- Svenska -------------------------
 * Ett företag vill att du ska göra en undersökning av hur 
 * stor andel som föredrar deras varumärke över konkurrenternas. 
 * De måste avsätta olika mängd pengar till undersökningen beroende 
 * på vilken konfidensgrad och vilken bredd på konfidensintervallet de kan acceptera
 * Inför sin budgetförhandling behöver de därför kunna 
 * beräkna hur många individer de måste få svar från 
 * för att uppnå olika konfidensgrader och bredd på intervallet.
 * 
 * Beräkna den maximala storleken på stickprovet vid given konfidensgrad
 * och angiven accepterad bredd på intervallet. Avrund upp till närmaste heltal
 * 
 * @param {Number} confidence tabellvärde vid olika konfidensgrader. T.ex. 1.96 för 95% konfidensgrad
 * @param {Number} maxWidth Maximala accepterade bredden på konfidensintervallet.
 * @returns {Number} Maximala antalet personer som stickprovet behöver innehålla, avrundat upp.
 * ------------------------------------------------------
 * 
 * A company wants you to do a survey of how large proportion 
 * who prefer their brand over that of competitors. 
 * They have to set aside different amounts of money for the survey 
 * depending on which confidence level and the width of the confidence interval they can accept. 
 * Before their budget negotiations, they therefore need to 
 * be able to calculate how many individuals they must receive answers 
 * from in order to achieve different confidence levels and width of the interval.
 * 
 * Calculate the maximal size of the sample needed to ensure
 * the width of the confidens interval at different confidens levels. Round to nearest integer.
 * 
 */
function exercise03(confidence, maxWidth) {
    /* 
        Engelska delen utav uppgiften står det, "Round to nearest integer" vilket 
        bör vara "Round a number upward to its nearest integer".
    */ 

    const p = 0.5;

    const n = ((2 * confidence / (maxWidth)) * (2 * confidence / (maxWidth))) * (p * p);

    return Math.ceil(n);
}

/**
 * -------------------- Svenska -------------------------
 * Temperaturen i Åre en vinterdag är -11°C. 
 * Temperaturen nästkommande vinterdag kan beskrivas som en normalfördelning
 * med väntevärde E[T₁] = E[T₀] - 0.5 och standardavvikelse på 1. 
 * (T₀ är dagens temperatur och T₁ är morgondagens)
 * 
 * Vad är sannolikheten att temperaturen understiger -12°C nästa dag. 
 *
 * @return {number} Sannolikheten Pr(T₁ < -12°C) med 3 decimalers precision
 * ------------------------------------------------------
 * 
 * The temperature in Åre on a winter day is -11°C.
 * The temperature of the next winter day can be described as a normal distribution
 * with expected value E[T₁] = E[T₀] - 0.5 and standard deviation of 1.
 * (T₀ is today's temperature and T₁ is tomorrow's)
 *
 * What is the probability that the temperature falls below -12 ° C the next day.
 * 
 */
function exercise04() {
    const targetTemp= -12;
    const t1 = -11.5;

    const standardDeviation = 1;

	const z = (targetTemp - t1) / standardDeviation;

	if (z > 0) {
		return parseFloat(1 - distribution(0, 1).cdf(z)).toFixed(3);
	}

	return (distribution(0, 1).cdf(z)).toFixed(3);
}

/**
 * -------------------- Svenska -------------------------
 * En högskola vill undersöka om deras kurser ökar studenternas kunskapsnivå.
 * Därför konstrueras två tester, A och B, i varje kurs. Dessa anses vara av samma svårighetsgrad.
 * 8 slumpmässigt utvalda studenter i varje kurs får göra ett test innan kursens start 
 * och sedan det andra testet efter kursen är genomförd.
 * För att undvika systematiska fel får hälften av studenterna göra test A innan och den andra hälten B. 
 * 
 * Beräkna populationsmedelvärdets konfidensintervall för differensen och avgör om 
 * kursen höjt studenternas resultat vid konfidensgrad 95%.
 * 
 * Ledtråd: Stickprovet är litet
 * 
 * @param {Number[]} preCourseResult vektor med studenternas resultat innan kursen
 * @param {Number[]} postCourseResult vektor med studenternas resultat efter kursen
 * @returns {Boolean} True om resultatet höjts efter kursen, annars false.
 * ------------------------------------------------------
 * 
 * A university wants to investigate whether their courses increase students' level of knowledge.
 * Therefore, two tests, A and B, are constructed in each course. These are considered to be of the same degree of difficulty.
 * 8 randomly selected students in each course may take a test before the start of the course
 * and then the second test after the course is completed.
 * To avoid systematic errors, half of the students takes test A before and the other half B.
 *
 * Calculate the confidence interval for the population mean for the difference and decide if
 * the course increased the students' results at a confidence level of 95%.
 *
 * Hint: The sample size is small
 */
function exercise05(preCourseResult, postCourseResult) {
  const table = {};
    table.pre = preCourseResult;
    table.preN = table.pre.length;
    table.post = postCourseResult;
    table.postN = table.pre.length;
    table.diff = [];
    table.diffSqr = [];
    
    table.post.map((x, i) => {
        table.diff.push(x - table.pre[i]);
    });
    
    const calcSum = ((dataSet) =>
    dataSet.reduce(function(a, b) {
        return a + b;
    }, 0))

    const xSum = calcSum(table.diff);

    table.diff.map((x, i) => {
        table.diffSqr.push(x * x);
    });

    const xxSum = calcSum(table.diffSqr);
    
    const xMean = xSum / table.preN;

    const s_part1 = xxSum;
    const s_part2 = xSum**2 / table.preN;

    const s = Math.sqrt((s_part1 - s_part2) / (table.preN - 1));
    
    const t = 1.895;

    const confidenceInterval = t * Math.sqrt(s**2 / table.preN);

    const lower = xMean - confidenceInterval;
    // const upper = xMean + confidenceInterval;

    return lower > 0;
}

/**
 * -------------------- Svenska -------------------------
 * Under vintern görs mätningar av tjockleken av isarna på sjöar i en kommun.
 * För att föutse hur tjockleken ökar med tiden vill kommunen ha en linjär 
 * modell som beskriver hur tjockleken förändras över tid på en godtycklig sjö.
 * Observationerna kan beskrivas med observationsparet (x_i, y_i) där
 * x_i är dagen i sedan första observationen och
 * y_i tjocklek dag i.
 * 
 * Beräkna koefficienterna till en linjär modell (y = a + b*x) 
 * från data från en godtycklig sjö.
 * 
 * @param {Number[]} x är en vektor med dagar sedan första observationen för varje observation, t.ex. [0, 2, 3, 4, 7]
 * @param {Number[]} y är en vektor med istjocklek vid varje observation
 * @return {Number[]} [a, b] där a och b är koefficienterna i ekvationen Y = a + b*X
 * ------------------------------------------------------
 *
 * During the winter, measurements are made of the thickness of the ice on lakes by the municipality.
 * To predict how the thickness increases over time, the municipality wants a linear
 * model that describes how the thickness changes over time on an arbitrary lake.
 * The observations can be described with the observation pair (x_i, y_i) where
 * x_i is the day i since the first observation and
 * y_i thickness day i.
 *
 * Calculate the coefficients for a linear model (y = a + b * x)
 * from data from an arbitrary lake. 
 * 
 */
function exercise06(x, y) {
    const table = {
        "x": [],
        "y": [],
        "xx": [],
        "xy": [],
        "yy": [],
    };

    const calcSum = ((dataSet) =>
        dataSet.reduce(function(a, b) {
            return a + b;
        }, 0))

    x.map((x, i) => {
        table.x.push(x);
        table.y.push(y[i])
        table.xx.push(x * x);
        table.xy.push(x * y[i]);
        table.yy.push(y[i] * y[i]);
        
        table.xSum = calcSum(table.x);
        table.ySum = calcSum(table.y);
        table.xxSum = calcSum(table.xx);
        table.xySum = calcSum(table.xy);
        table.yySum = calcSum(table.yy);
    });

    const xMean = (1 / table.x.length) * table.xSum;
    const yMean = (1 / table.y.length) * table.ySum;

    const xxS = table.xxSum - ((1 / table.xx.length) * table.xSum * table.xSum);
    const xyS = table.xySum - ((1 / table.xy.length) * table.xSum * table.ySum);
    
    const b = xyS / xxS;
    const a = (yMean - (b * xMean));

    return [a, b];
}

/**
 * -------------------- Svenska -------------------------
 * Givet data från en godtycklig sjö (se exercise06 för problemformulering)
 * beräkna konfidensintervall vid 95% konfidensgrad för de skattade koefficienterna för modeller 
 * för istjockleken. 
 * Anta att residualerna är normalfördelade och stickprovens storlek minst 30.
 * 
 * @param {Number[]} x är en vektor med dagar sedan första observationen för varje observation, t.ex. [0, 2, 3, 4, 7]
 * @param {Number[]} y är en vektor med istjocklek vid varje observation
 * @return {Number[]} [a nedre gräns, a övre gräns, b nedre gräns, b övre gräns] Konfidensintervaller för koefficienterna
 * ------------------------------------------------------
 * 
 * Given data from an arbitrary lake (see exercise06 for problem formulation)
 * calculate confidence intervals at confidence level 95% for the estimated coefficients for the ice thickness model.
 * Assume normal distributed residuals and a sample sice of at least 30
 */
function exercise07(x, y) {
    const table = {
        "x": x,
        "y": y,
        "xx": [],
        "yy": [],
        "xy": []
    };

    const n = table.x.length;
    const calcSum = ((dataSet) =>
        dataSet.reduce(function(a, b) {
            return a + b;
        }, 0))
    
    table.y.map((x, i) => {
        table.yy.push(x * x);
    });
    
    table.x.map((x, i) => {
        table.xx.push(x * x);
    });

    table.x.map((x, i) => {
        table.xy.push(table.y[i] * x);
    });
    
    const xSum = calcSum(table.x);
    const ySum = calcSum(table.y);
    const xxSum = calcSum(table.xx);
    const yySum = calcSum(table.yy);
    const xySum = calcSum(table.xy);
    
    const xxS = xxSum - ((1 / n) * xSum * xSum);
    const xyS = xySum - ((1 / n) * xSum * ySum);
    
    const xMean = xSum / n;
    const yMean = ySum / n;

    const b = xyS / xxS;
    const a = yMean - (b * xMean);

    const SST = yySum - ySum**2 / n;

    const SSR_part1 = (xySum - (xSum * ySum) / n);
    const SSR_part2 = (xySum - (xSum * ySum) / n) / b;
    
    const SSR = SSR_part1 / SSR_part2 * SSR_part1

    const SSE = SST - SSR;

    const MSE = SSE / (n - 2);

    const sApart1 = 1 / n;
    const sApart2 = xMean**2 / SSR_part2;
    const sApart3 = sApart1 + sApart2;
    const sA = Math.sqrt(MSE * sApart3);

    const sB = Math.sqrt(MSE / SSR_part2);

    const t = 1.96;

    const aLower = a - t * sA;
    const aUpper = a + t * sA;
    
    const bLower = b - t * sB;
    const bUpper = b + t * sB;

    return [aLower, aUpper, bLower, bUpper];
}


module.exports.exercise01 = exercise01;
module.exports.exercise02 = exercise02;
module.exports.exercise03 = exercise03;
module.exports.exercise04 = exercise04;
module.exports.exercise05 = exercise05;
module.exports.exercise06 = exercise06;
module.exports.exercise07 = exercise07;