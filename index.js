/*
 * Name: Maia Han
 * Date: Oct 16, 2022
 * Section: CSE 154 AC
 * This is the JS to implement the UI for my biodiversity calculator website
 */
"use strict";
window.addEventListener("load", init);
const SHANNON_OUTPUT = document.getElementById("shannonresult");
const RICHNESS_OUTPUT = document.getElementById("richnessresult");
const EVENNESS_OUTPUT = document.getElementById("evennessresult");
const TOTAL_OUTPUT = document.getElementById("totalresult");

/**
 * an init function adds two eventlisteners to buttons on the page.
 */
function init() {
  let buttons = document.querySelectorAll("button");
  for (let i = 0; i < buttons.ƒlength; i++) {
    buttons[i].addEventListener("mouseover", changeStyle);
    buttons[i].addEventListener("mouseout", changeStyleBack);
  }
}

/**
 * modify button styles
 */
function changeStyle() {
  let buttons = document.querySelectorAll("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.add("large");
  }
}

/**
 * change botton styles back when mouse moved
 */
function changeStyleBack() {
  let buttons = document.querySelectorAll("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.toggle("large");
  }
}

/**
 * add a duplicated row to the bottom of the calculator
 */
function addRow() {
  let calcRowList = document.querySelectorAll(".calculator-row");
  let calcRow = calcRowList[calcRowList.length - 1];
  let clonedRow = calcRow.cloneNode(true);
  let inputNum = clonedRow.querySelector("input[type='number']");
  inputNum.value = "";
  let inputName = clonedRow.querySelector("input[type='text']");
  inputName.value = "";
  let calculator = document.getElementById("calculator");
  calculator.appendChild(clonedRow);
}
document.getElementById("btnaddrow").addEventListener("click", addRow);

/**
 * delete a row from the bottom of the calculator if there are more than two rows
 */
function delRow() {
  let calculator = document.getElementById("calculator");
  let unwantedRow = calculator.lastElementChild;
  let numRow = document.querySelectorAll(".calculator-row").length;
  if (numRow > 2) {
    calculator.removeChild(unwantedRow);
  }
}
document.getElementById("btndelrow").addEventListener("click", delRow);

/**
 * make a list of input numbers, ignore the blank inputs calculate based on the list
 * output all the results.
 */
function outPutResults() {
  // get the input element list
  const INPUT_LIST = document.querySelectorAll(".calculator-input");

  // add the input value integers to a list
  let data = [];
  for (let i = 0; i < INPUT_LIST.length; i++) {
    if (INPUT_LIST[i].value > 0) {
      data.push(parseInt(INPUT_LIST[i].value));
    }
  }

  // calculations
  const SHANNON = getShannon(data);
  const RICHNESS = getRichness(data);
  const EVENNESS = getEvenness(data);
  const TOTAL = getTotal(data);

  // output results
  shannonOutResult(SHANNON);
  richnessOutResult(RICHNESS);
  evennessOutResult(EVENNESS);
  totalOutResult(TOTAL);
}
document.getElementById("btnresult").addEventListener("click", outPutResults);

/**
 * output the shannon index result.
 * @param {number} result a number represents shannon index result.
 */
function shannonOutResult(result) {
  SHANNON_OUTPUT.textContent = result;
}

/**
 * compute the shannon index
 * @param {Object} data a list of input numbers
 * @returns {number} The shannon index of these data
 */
function getShannon(data) {
  const TOTAL = getTotal(data);
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += (data[i] / TOTAL) * Math.log(data[i] / TOTAL);
  }
  return (-sum).toFixed(3);
}

/**
 * output the richness result
 * @param {number} result a number represents richness result.
 */
function richnessOutResult(result) {
  RICHNESS_OUTPUT.textContent = result;
}

/**
 * compute the richness
 * @param {Object} data a list of input numbers
 * @returns {number} The richness of these data
 */
function getRichness(data) {
  let num = 0;
  for (let i = 0; i < data.length; i++) {
    num += 1;
  }
  return num;
}

/**
 * output the evenness result
 * @param {number} result a number represents evenness result.
 */
function evennessOutResult(result) {
  EVENNESS_OUTPUT.textContent = result;
}

/**
 * compute the evenness
 * @param {Object} data a list of input numbers
 * @returns {number} The evenness of these data
 */
function getEvenness(data) {
  const SHANNON = getShannon(data);
  const COUNT = getRichness(data);
  if (COUNT <= 1) {
    return "Evenness is null when richness is 1";
  }
  return (SHANNON / Math.log(COUNT)).toFixed(3);
}

/**
 * output the total individual result
 * @param {number} result a number represents total individual result.
 */
function totalOutResult(result) {
  TOTAL_OUTPUT.textContent = result;
}

/**
 * compute the total individuals
 * @param {Object} data a list of input numbers
 * @returns {number} The total individuals of these data
 */
function getTotal(data) {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += data[i];
  }
  return total;
}
