/**
 * MA1487 matmod
 * Inlämning 2
 */

// TODO: Patrik Karlsson
// TODO: paka17

const gaussian = require('gaussian');

function distribution(mean, stdDev) {
    return gaussian(mean, Math.pow(stdDev, 2));
}

/**
 * How to create a distribution for exercise01-09
 *
 * const dist = distribution(mean, stdDev);
 *
 * Probability Functions
 *
 * dist.pdf(x): Pr(X=x), the probability density function, which describes the probability of a random variable taking on the value x
 * dist.cdf(x): Pr(X≤x) the cumulative distribution function, which describes the probability of a random variable falling in the interval (−∞, x]
 * dist.ppf(x): the percent point function, the inverse of cdf
 *
 */

/**
 * Arithmetic mean
 *
 * Write a function that computes and return the arithmetic mean of the elements
 * in the array x with 4 decimal precision.
 *
 * @param {number[]} x
 * @return {number} The arithmetic mean of the elements in the array x
 */
function mean(x) {
    const sum = x.reduce((sum, value) => {
        return sum + value;
    }, 0)

	return (sum / x.length).toFixed(4);
}

/**
 * Standard deviation
 *
 * Write a function that computes and the sample standard deviation of the elements in
 * the array x with 4 decimal precision. 
 * 
 * OBS!!! This is the bias corrected version!
 *
 * @param {number[]} elements
 * @return {number} The standard deviation of the elements in x
 */

function standardDeviation(x) {
    const n = x.length - 1;
    const arithMean = mean(x);

    return Math.sqrt(x.map(x => Math.pow(x - arithMean, 2)).reduce((a, b) => a + b) / n).toFixed(4);
}

/*
	Function that returns the factorial of number n
*/
function factorial(n){
    if (n == 0 || n == 1){
        return 1;
    } 
	
	return n * factorial(n-1);
}

/**
 * Exercise01
 *
 * @return {number} The probability of Pr(X ≤ 1.2) when X is N(0,1) with 4 decimal precision
 */
function exercise01() {
    const dist = distribution(0, 1);
	
	return dist.cdf(1.2).toFixed(4);
}

/**
 * exercise02
 *
 * @return {number} The probability of Pr(X > 1.2) when X is N(0,1) with 4 decimal precision
 */
function exercise02() {
    const dist = distribution(0, 1);

	return (1 - dist.cdf(1.2)).toFixed(4);
}

/**
 * exercise03
 *
 * @return {number} The probability of Pr(X ≤ 7) when X is N(5,2) with 4 decimal precision
 */
function exercise03() {
	const dist = distribution(5, 2);
	
    return (dist.cdf(7)).toFixed(4);
}

/**
 * exercise04
 *
 * @return {number} The probability of Pr(3 < X ≤ 5) when X is N(5,2) with 4 decimal precision
 */
function exercise04() {
	const prA = (3 - 5) / 2;
	const prB = (5 - 5) / 2;

	const distOne = distribution(prB, prA).cdf(Math.abs(prA));
	const distTwo = distribution(prB, prA).cdf(prB);

	return (distTwo - (1 - distOne)).toFixed(4);
}

/**
 * exercise05
 *
 * @return {number} The probability of Pr(X ≤ -1) when X is N(0,1) with 4 decimal precision
 */
function exercise05() {
	return (1 - distribution(0, 1).cdf(1)).toFixed(4);
}

/**
 * exercise06
 *
 * @param {number} mean mean μ
 * @param {number} stdDev standard deviation σ
 * @param {number} a lower bound
 * @param {number} b upper bound

 * @return {number} the probability of Pr(a ≤ X ≤ b) when X is
 * N(μ,σ) with 4 decimal precision
 */
function exercise06(mean, stdDev, a, b) {
    const prA = (a - mean) / stdDev;
	const prB = (b - mean) / stdDev;
		
	return (distribution(0, 1).cdf(prB) - distribution(0, 1).cdf(prA)).toFixed(4);
}

/**
 * -------------------- Svenska -------------------------
 * En kaffeautomat fördelar kaffe på ett sådant sätt att volymen
 * är normalfördelad med väntevärde 1.8 dl och standardavvikelse 0.1 dl
 * 
 * En kaffekopp har en volym av 2.0 dl. 
 * 
 * Beräkna och returnera sannolikheten med 3 decimalers precision 
 * för att en kopp kommer att översvämmas
 * ------------------------------------------------------
 * 
 * exercise07
 *
 * A coffee vending machine dispenses coffee, in a way such that the volume
 * is normally distributed with mean 1.8 dl and standard deviation 0.1 dl.
 *
 * A coffee cup can hold up to 2.0 dl of coffee.
 *
 * Calculate and return the probability with 3 decimal precision that a cup
 * will be overflowed
 *
 * @return {number} The probability of a cup will be overflown with 3 decimal precision.
 *
 */
function exercise07() {
	const z = (2 - 1.8) / 0.1;

	if (z > 0) {
		return parseFloat(1 - distribution(0, 1).cdf(z)).toFixed(3);
	}

	return (distribution(0, 1).cdf(z)).toFixed(3);
}

/**
 * -------------------- Svenska -------------------------
 * Låt X och Y vara två oberoende stokastiska variabler där 
 * X är N(a, b) och Y är N(c, d) fördelade. 
 * Då gäller att Z = X + Y är N(a+b, sqrt(b^2 + d^2)), och
 * Z = X - Y är N(a-c, sqrt(b^2 + d^2))
 * 
 * Returnera sannolikheten för Pr(X+Y ≤ 2) då X är N(2, 3) och Y är N(1, 4) fördelade
 * med 4 decimalers precision
 * ------------------------------------------------------
 * 
 * Let X and Y be two independent stochastic variables such that X is N(a,b)
 * and Y is N(c,d). Then  Z = X+Y is N(a+c,sqrt(b^2 + d^2)), and Z = X-Y is N(a-c, sqrt(b^2+d^2))
 * *
 * Return the probability of Pr(X+Y ≤ 2) when X is N(2,3), and Y is N(1,4) with 4 decimal precision
 * @return {number}
 */
function exercise08() {
	const mean = (2 + 1);
	const v = Math.sqrt(Math.pow(3, 2) + Math.pow(4, 2));
	const xy = 2;
	const z = (xy - mean) / v;

	const dist = distribution(0, 1);

	if (z < 0) {
		return parseFloat(1 - dist.cdf(0 - z)).toFixed(4);
	}
	
	return parseFloat(dist.cdf(z)).toFixed(4);
}

/**
 * -------------------- Svenska -------------------------
 * Studenters poäng på test A är normalfördelade med väntevärde 48 och standardavvikelse 5
 * Studenters poäng på test B är normalfördelade med väntevärde 40 och standardavvikelse 4
 * 
 * Låt X representera resultatet från en slumpmässigt utvald student som gjorde test A
 * Låt Y representera resultatet från en slumpmässigt utvald student som gjorde test B
 * 
 * Beräkna och returnera sannolikheten Pr(X > Y) med 4 decimalers precision
 * 
 * Ledtråd: Pr(X > Y) = Pr(X-Y > 0)
 * ------------------------------------------------------
 * 
 * The score of student test A is normally distributed with mean 48 and standard deviation 5
 * The score of student test B is normally distributed with mean 40 and standard deviation 4
 *
 * Let X be the result from a random choosen student who took test A
 * Let Y be the result from a random choosen student who took test B
 *
 * Calculate and return the probaility Pr(X > Y) with 4 decimal precision
 * Hint. Pr(X > Y)= Pr(X-Y > 0)
 */
function exercise09() {
    const mean = 48 - 40;
	const xy = 0;
	const v = Math.sqrt(Math.pow(5, 2) + Math.pow(4, 2));
	const z = (xy - mean) / v;

	if (z < 0) {
		return (1 - distribution(0, 1).cdf(z)).toFixed(4);
	} 
	
	return (distribution(0, 1).cdf(z)).toFixed(4);
}

/**
 * -------------------- Svenska -------------------------
 * Y är en linjärkombination av X så att Y = a*X + b.
 * Beräkna väntevärdet för Y, dvs. E[Y], givet väntevärde för X
 * 
 * @param {Number} eX är väntevärdet för den stokastiska variablen X
 * @param {Number} a är en konstant
 * @param {Number} b är en konstant
 * ------------------------------------------------------
 * 
 * Y is a linear combination of X such that Y = a*X + b.
 * Calculate the expected value for Y, i.e. E[Y], given the expected value of X
 * 
 * @param {Number} eX is the expected value of the stocastic variable X
 * @param {Number} a is a constant
 * @param {Number} b is a constant
 */
function exercise10(eX, a, b) {
    return ((a * eX) + b).toFixed(4);
}

/**
 * -------------------- Svenska -------------------------
 * Y är en linjärkombination av X så att Y = a*X + b.
 * Beräkna variansen för Y, dvs. V[Y], givet variansen för X
 *
 * @param {Number} vX är variansen för den stokastiska variablen X
 * @param {Number} a är en konstant
 * @param {Number} b är en konstant
 * ------------------------------------------------------
 * 
 * Y is a linear combination of X such that Y = a*X + b.
 * Calculate the variance of Y, i.e. V[Y], given the variance of X
 * 
 * @param {Number} vX is the variance of the stocastic variable X
 * @param {Number} a is a constant
 * @param {Number} b is a constant
 */
function exercise11(vX, a, b) {    
/*
		Y = a*X + b
		vY = v(aX + b)
		vY = a^2(v(x) + v(b))
	  	v(b) variance of a constant is zero = 0
*/

    return Math.abs((a * a) * (vX + 0));
}

/**
 * -------------------- Svenska -------------------------
 * Du spelar ett chansspel där oddsen är emot dig.
 * Du har 1% chans att vinna varje gång du spelar. 
 * Om du vinner får du 95 gånger insatsen.
 * Om du spelar splet 1000 gånger, vad är sannolikheten 
 * att du går med vinst?
 * ------------------------------------------------------
 * 
 * You play a game of chance where the odds at stacked against you.
 * You have a 1% chance of winning and when you win you get paid 95 times 
 * the stake. 
 * If you play the game 1000 times, what is the probability of the 
 * game being porfitable for you?
 * 
 * @return {Number} The probability of profit with 4 decimals
 */
function exercise12() { 
	// To gain proffit 1000/95 => 1000/95 => 10.5 => 11
	// One must win 11(10.5) or more games to gain proffit (P(11 >= 11))

	const n = 1000; 	// Number of total games
	const x = 11;		// Number of desired wins
	const p = 0.01;		// Probability of gettin a win in a game
	const q = 1 - p;	// Probability of getting a loss in a game

	// Binomial Distribution Formula
	// P(x) = nCx * p^x * q^n-x

	//Using this calculator for the desired result
	//https://stattrek.com/online-calculator/binomial.aspx

	// Result:
	// P(11 >= 11) = 0.4169591967
    return 0.4169591967.toFixed(4);
}

/**
 * -------------------- Svenska -------------------------
 * Upprepa exercise12 men approximera sannolikhetsfördelningen med
 * Poissonfördelningen. Returnera differancen mellan det
 * approximerade svaret och svaret i exercise12.
 * ------------------------------------------------------
 * 
 * Redo exercise12 but approximate the distribution using the
 * Poisson distribution. Return the difference between this answer 
 * and the one in exercise12.
 * 
 * @return {Number} Difference between exercise12 and its Poisson approximation
 */
function exercise13() {	
	const n = 1000; 	// Number of total games
	const x = 11;		// Number of desired wins
	const p = 0.01;		// Probability of getting a win in a game
	const q = 1 - p;	// Probability of getting a loss in a game

	return (Math.pow(q, x) / factorial(x)) * Math.pow(Math.E, -q) - 0.4169591967;
}

/**
 * -------------------- Svenska -------------------------
 * I en unersökning tillfrågades en stor grupp vilka
 * frukostflinger de föredrog, märke A, B eller C. 
 * pA av gruppen föredrog A
 * pB av gruppen föredrog B
 * Således föredrog resten C. 
 * 
 * Beräkna korrelationskoefficienten mellan grupp A och B.
 * ------------------------------------------------------
 * 
 * In a survey a large group were asked which brand of serial they preferred A, B or C.
 * pA of the group preferred A.
 * pB of the group preferred B.
 * Hence the rest preferred C.
 * 
 * Calculate the correlation coefficient between group A and B. 
 * 
 * @param {Number} pA Probability of preferring product A
 * @param {Number} pB Probability of preferring product B
 * 
 * @return {Number} Correlation coefficient between A and B with 4 decimals. 
 */
function exercise14(pA, pB) {
	/* 
	_____________________________________
	Y\X		0		1		p(Y)
	______________________
	 0	 1-pA-pB   pA    | 1-pB
	 1     pB      0     |  pB
	_____________________|
	p(X)  1-pA     pA        1
	_____________________________________
	*/

	const covXY = -pA * pB; 						// Cov(X, Y)
	const varX = pA * (1 - pA) 						// Var(X) 
	const varY = pB * (1 - pB);						// Var(Y)
	const varXY = pA + pB - Math.pow((pA - pB), 2); // Var(X-Y) == 1

	return (covXY / Math.pow((varX * varY), 0.5)).toFixed(4);
}

/**
 * -------------------- Svenska -------------------------
 * Kommunen har fått in 36 propositioner som de behöver behandla 
 * vid nästa möte.
 * En tidigare studie kom fram till att det tar 3 minuter
 * i genomsnitt att behandla en proposition, med en standardavvikelse
 * på 1 minut.
 * 
 * Hur långt möte ska bokas in för att man med 95% sannolikhet ska
 * hinna behandla alla propositioner? (Avrunda upp till närmaste minut)
 * ------------------------------------------------------
 * 
 * The municipality have recived 36 proposition that they need to address at 
 * the next meeting.
 * A previous study has shown that it on average takes 3 minutes to address each proposition,
 * with a standard deviation of 1. 
 * How long meet should be booked so that with all proposition will be handled
 * with 95% probability? (Round up to nearest minute)
 * 
 * @return {Number} Minutes needed for the meeting rounded up. 
 */
function exercise15() {
	const n = 36;
	const a = 3 * 36;		// Average
	const d = 1 * 36;		// Deviation
	const z = 1.6449; 		// Z score

	// const lower = medelv - zScore * (d / Math.sqrt(n));
	const higher = a + z * (d / Math.sqrt(n));

    return Math.round(higher);
}




module.exports.mean = mean;
module.exports.standardDeviation = standardDeviation;
module.exports.exercise01 = exercise01;
module.exports.exercise02 = exercise02;
module.exports.exercise03 = exercise03;
module.exports.exercise04 = exercise04;
module.exports.exercise05 = exercise05;
module.exports.exercise06 = exercise06;
module.exports.exercise07 = exercise07;
module.exports.exercise08 = exercise08;
module.exports.exercise09 = exercise09;
module.exports.exercise10 = exercise10;
module.exports.exercise11 = exercise11;
module.exports.exercise12 = exercise12;
module.exports.exercise13 = exercise13;
module.exports.exercise14 = exercise14;
module.exports.exercise15 = exercise15;
