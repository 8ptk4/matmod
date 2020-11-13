/*
 * MA1487 Matematisk modellering
 * Kursmoment 01
 *
 * Exercise 01-10 Set theory
 * Exercise 11-14 Probability
 * Exercise 15-18 Combinatorics and Probability
 * Exercise 19-23 Probability with sets
 * Exercise 24-30 Conditional probability
 */


/**
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 * for documentation for the set object in JavaScript
 *
 * In the following exercises the complements are denoted with prefix C.
 * Thus, CA is the complement of A, C(A ∩ B) is the complement of A ∩ B.
 *
 * The set U is the universal set.
 */



/**
 * Exercise01
 * Create the following sets
 * A = {2,4,6,8}
 * B = {1,2,3,4,8,9}
 *
 * Compute and the return the set A ∩ B
 *
 * @returns {Set} the set A ∩ B
 */
function exercise01() {
  let A = new Set([2, 4, 6, 8]);
  let B = new Set([1, 2, 3, 4, 8, 9]);

  return new Set([...A].filter(x => B.has(x)));
}



/**
 * Exercise02
 * Create the following sets
 * A = {1,3,5,7,9}
 * B = {1,2,3,4,5,6,7,8,9,10}
 *
 * Compute and return the set A ∪ B
 *
 * @returns {Set} the set A ∪ B
 */
function exercise02() {
  let A = new Set([1,3,5,7,9]);
  let B = new Set([1,2,3,4,5,6,7,8,9,10]);

  return new Set([...A, ...B]);
}



/**
 * Exercise03
 * Create the following sets
 * U = {1,2,3,4,5,6,7,8,9}
 * A = {2,4,6,8}
 * B = {1,2,3,4,8,9}
 *
 * @returns {Set} the set A ∩ CB
 */
function exercise03() {
  let U = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let A = new Set([2, 4, 6, 8]);
  let B = new Set([1, 2, 3, 4, 8, 9]);
  
  let CB = new Set([...U].filter(x => !B.has(x)));

  return new Set([...A].filter(x => CB.has(x)));
}


/**
 * Exercise04
 * Create the following sets
 * U = {1,2,3,4,5,6,7,8,9}
 * A = {2,4,6,8}
 * B = {1,2,3,4,8,9}
 *
 * @returns {Set} the set CA ∩ B
 */
function exercise04() {
  let U = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let A = new Set([2, 4, 6, 8]);
  let B = new Set([1, 2, 3, 4, 8, 9]);

  let CA = new Set([...U].filter(x => !A.has(x)));

  return new Set([...CA].filter(x => B.has(x)));
}


/**
 * Exercise05
 * Create the following sets
 * U = {1,2,3,4,5,6,7,8,9}
 * A = {2,4,6,8}
 * B = {1,2,3,4,8,9}
 *
 * @returns {Set} the set CA ∩ CB
 */
function exercise05() {
  let U = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let A = new Set([2, 4, 6, 8]);
  let B = new Set([1, 2, 3, 4, 8, 9]);

  let CA = new Set([...U].filter(x => !A.has(x)));
  let CB = new Set([...U].filter(x => !B.has(x)));

  return new Set([...CA].filter(x => CB.has(x)));
}



/**
 * Exercise06
 * Create the following sets
 * U = {1,2,3,4,5,6,7,8,9}
 * A = {2,4,6,8}
 * B = {1,2,3,4,8,9}
 *
 * @returns {Set} the set C(A ∪ B)
 */
function exercise06() {
  let U = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let A = new Set([2, 4, 6, 8]);
  let B = new Set([1, 2, 3, 4, 8, 9]);

  let AB = new Set([...A, ...B]);
  
  return new Set([...U].filter(x => !AB.has(x)));
}



/**
 * Exercise07
 * Create the following sets
 * U = {1,2,3,4,5,6,7,8,9}
 * A = {2,4,6,8}
 * B = {1,2,3,4,8,9}
 *
 * @returns {Set} the set (A ∩ CB)∪(CA ∩ B)
 */
function exercise07() {
  let U = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let A = new Set([2, 4, 6, 8]);
  let B = new Set([1, 2, 3, 4, 8, 9]);

  let CA = new Set([...U].filter(x => !A.has(x)));
  let CB = new Set([...U].filter(x => !B.has(x)));

  let ACB = new Set([...A].filter(x => CB.has(x)));
  let CAB = new Set([...CA].filter(x => B.has(x)));

  return new Set([...ACB, ...CAB]);
}



/**
 * Exercise 08
 * Write a function to detemine if A is a proper subset of B
 *
 * @returns {Boolean} true if A is a proper subset of B, otherwise false
 */
function exercise08(A, B) {
  
  if ([...A].every(elem => [...B].includes(elem)) && ([...A].length != [...B].length))  {
   return true;
  }

  return false;
}



/**
 * Exercise09
 * Let A and B be sets. Write a function that returns the number of
 * elements in the set A ∪ B
 *
 * @param {Set} A
 * @param {Set} B
 * @return {Number} the number of elements in the set A ∪ B
 *
 */
function exercise09(A, B) {
  let union = new Set([...A, ...B]);

  return [...union].length;
}



/**
 * Exercise10
 * Two sets A and B are disjoint if they have no elements in common
 * Write a function to determine if A and B are disjoint
 *
 * @param {Set} A
 * @param {Set} B
 * @return {Boolean} true if A and B are disjoint, otherwise false
 */
function exercise10(A, B) {
  let intersection = new Set([...A].filter(x => B.has(x)));

  if ([...intersection].length == 0) {
    return true;
  }

  return false;
}



/**
 * Exercise11
 * Given a single n-sided symmetrical dice and an integer p such that p <= n.
 * Compute the probability the dice exactly p dots with 3-decimal precision
 *
 * @param {Number} n    Sides of the dice
 * @param {Number} p    Number of dots
 * @returns {Number}    The probability a n-sided dice will show exactly p dots with 3 decimal precision
 */
function exercise11(n, p) {
  return (1 / n).toFixed(3);
}

/**
 * Exercise12
 * Given a single n-sided symmetrical dice and an integer p such that p <= n.
 * Compute the probability the dice shows p or less dots with 3-decimal precision
 *
 * @param {Number} n    Sides of the dice
 * @param {Number} p    Number of dots
 * @returns {Number}    The probability a n-sided dice will show p dots or less
 * with 3 decimal precision
 */
function exercise12(n, p) {
  return (p / n).toFixed(3);
}

/**
 * Exercise13
 * Given a single n-sided symmetrical dice and an integer p such that p <= n.
 * Compute the probability the dice shows at least p dots with 3-decimal precision
 *
 * @param {Number} n    Sides of the dice
 * @param {Number} p    Number of dots
 * @returns {Number}    The probability a n-sided dice will show at least p dots
 * with 3 decimal precision
 */
function exercise13(n, p) {
  return (p / n).toFixed(3);
}

/**
 * Exercise14
 * A regular six sided dice is tossed 100000 times.
 * Compute the relative frequence of observering a 5 or 6 when tossing a
 * dice with 3 decimal precision
 *
 * @returns {Number}    The relative frequency a dice will show a 5 or 6 with 3 decimal precision
 */
function exercise14() {
    return null
}


/**
 * Exercise15
 * Write a function that returns n factorial (n!)
 *
 * @param {Number} n
 * @return {Number} n-factorial (n!)
 */

function exercise15(n) {
    return null
}


/**
 * Exercise16
 * Write a function that returns the number of ways you can choose k from n
 * options with respect to order
 *
 * @param {Number} n
 * @param {NUmber} k
 * @return {Number}
 */
function exercise16(n, k) {
    return null
}


/**
 * Exercise17
 * Write a function that return the number of ways you can choose k from n
 * options without respect to order (combinations)
 *
 * @param {Number} n
 * @param {Number} k
 * @return {Number}
 */
function exercise17(n, k) {
    return null
}



/**
 * Exercise16
 * Given a group of n persons and another group of m persons.
 * Five persons are choosen randomly from both groups.
 * Compute the probability 3 persons are chosen from group 1 and 2 persons are
 * choosen from group 2. Return the answer with 3-decimal precision
 *
 * @param {Number} n total number of people in group 1
 * @param {Number} m total number of people in from group 2
 * @return {Number} Probability described above
 */
function exercise18() {
    return null
}


/**
 * Exercise19
 * Given two events A and B, such that
 *
 * Pr(A) = 0.16
 * Pr(A ∩ B) = 0.003
 * Pr(CA ∩ B) = 0.12
 *
 * Compute the probability Pr(A ∪ B) with 3 decimal precision
 *
 * @returns {Number} the probability Pr(A ∪ B) with 3 decimal precision
 */
function exercise19() {
    return 0;
}


/**
 * Exercise20
 * Given two events A and B, such that
 *
 * Pr(A) = 0.16
 * Pr(A ∩ B) = 0.003, and
 * Pr(CA ∩ B) = 0.12
 *
 * Compute the probability Pr(B) with 3 decimal precision
 *
 * @returns {Number} the probability Pr(B) with 3 decimal precision
 */
function exercise20() {
    return 0;
}

/**
 * Exercise21
 * Given two events A and B, such that
 *
 * Pr(A) = 0.16
 * Pr(A ∩ B) = 0.003, and
 * Pr(CA ∩ B) = 0.12
 *
 * Compute the probability Pr(A ∩ CB) with 3 decimal precision
 *
 * @returns {Number} the probability Pr(A ∩ CB) with 3 decimal precision
 */
function exercise21() {
    return 0;
}


/**
 * Exercise22
 * Let A and B be events such that
 *
 * Pr(A) = x,
 * Pr(B) = y, and
 * Pr(A ∩ B) = z
 *
 * Write a function to determine the probability of Pr(CA ∩ CB),
 * (the probability that neither of the events A nor B occurs)
 * with 3 decimal precision
 *
 * @param {Number} x probability Pr(A)
 * @param {Number} y probability Pr(B)
 * @param {Number} z probability Pr(A ∩ B)
 * @returns {Number} probability of Pr(CA ∩ CB) with 3 decimal precision
 */
function exercise22(x, y, z) {
    return 0;
}


/**
 * Exercise23
 * Let A, B and C be event such that
 *
 * Pr(A) = 0.2
 * Pr(B) = 0.3
 * Pr(C) = 0.4
 * The events A and B are independent
 * The events A and C are independent
 * The events B anc C can not occur simultaneously
 *
 * Compute and the return the probability that at
 * least one event will occur (Pr(A ∪ B ∪ C) )with 3 decimal precision
 *
 * @returns {Number} the probability Pr(A ∪ B ∪ C) with 3 decimal precision
 */
function exercise23() {
    return 0;
}

/**
 * Exercise24
 * Let A and B be event such that
 * Pr(A) = x
 * Pr(B) = y
 * Pr(A ∩ B) = z
 *
 * Compute and the return the probability Pr(A|B) with 3 decimal precision
 *
 * @returns {Number} the probability Pr(A|B) with 3 decimal precision
 */
function exercise24(x, y, z) {
    return 0;
}

/**
 * Exercise25
 * Let A and B be two events such that
 * Pr(A ∩ B) = 0.212, and
 * P(CA ∩ B) = 0.431
 *
 * Compute and return the probability Pr(A|B) with 3 decimal precision
 *
 *
 * @returns {Number} the probability Pr(A|B) with 3 decimal precision
 */
function exercise25() {
    return 0;
}

/**
 * Exercise 26
 * Let A and B be two events such that
 * P(A) = 0.8
 * P(A ∩ B) = 0.2, and
 * P(A ∪ B) = 0.9.
 *
 * Compute and return the probability Pr(A|B) with 3 decimal precision
 *
 * @returns {Number} the probability Pr(A|B) with 3 decimal precision
 */
function exercise26() {
    return 0;
}

/**
 * Exercise27
 * A regular 6-sided die is tossed twice.
 *
 * Compute and return the probability of an odd sum of the dots with
 * 3 decimal precision given that the sum of the dots is 11 or greater.

 *  @returns {Number} the probability of 2 dice showing an odd sum given
 *                      given that the sum of the dots is 11 or greater
 *                      with 3 decimal precision
 *
 */
function exercise27() {
    return 0;
}

/**
 * Exercise28
 * A gambler is playing a game where the probability of winning is x.
 * Suppose the gambler is playing the game 10 times.
 *
 * Compute and return the probability that the gambler will win the game
 * exactly n times with 3 decimal precision.
 *
 * @param {Number} x probability of winning the game
 * @param {Number} n games won
 * @returns {Number} probability that the gambler will win the game
 *                     exactly n times with 3 decimal precision.
 */
function exercise28(x, n) {
    return 0;
}


/**
 * Exercise29 (Bayes' theorem)
 *
 * A fictional university offers three different programmes A,B, and C.
 * Currently 30 students are enrolled in A, 60 in students in B, and 60 students in C.
 *
 * A student enrolled in the A-programme passes an exam with 0.6 probability
 * A student enrolled in the B-programme passes an exam with 0.5 probability
 * A student enrolled in the B-programme passes an exam with 0.4 probability
 *
 * Student X passed the exam.
 * Compute and return the probaility student X is enrolled in the A-programme
 * with 3 decimal precision
 */
function exercise29() {
    return 0;
}

/**
 * Exercise30 (Bayes' theorem)
 * In a employee survey, the results shows that x% of the M male employee are satisfied
 * with their salary, and y% of the F female employee are satisfied with their salary.
 *
 * Compute and return the probability a satisfied person is a female
 *
 */
function exercise30(x, y, M, F) {
    return 0;
}



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
module.exports.exercise16 = exercise16;
module.exports.exercise17 = exercise17;
module.exports.exercise18 = exercise18;
module.exports.exercise19 = exercise19;
module.exports.exercise20 = exercise20;
module.exports.exercise21 = exercise21;
module.exports.exercise22 = exercise22;
module.exports.exercise23 = exercise23;
module.exports.exercise24 = exercise24;
module.exports.exercise25 = exercise25;
module.exports.exercise26 = exercise26;
module.exports.exercise27 = exercise27;
module.exports.exercise28 = exercise28;
module.exports.exercise29 = exercise29;
module.exports.exercise30 = exercise30;
