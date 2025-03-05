"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Part 1
const flipCoin = () => {
    return new Promise((resolve, reject) => {
        let result = Math.random();
        if (result > 0.5) {
            resolve("You win!");
        }
        else {
            reject("You lose!");
        }
    });
};
flipCoin()
    .then((gameResult) => {
    console.log(gameResult);
})
    .catch((gameResult) => {
    console.log(gameResult);
});
const getFlipCoinResult = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield flipCoin();
        console.log(result);
    }
    catch (rejectValue) {
        console.log(rejectValue);
    }
});
getFlipCoinResult();
// Part 1
// Part 2
const fetchApiData = () => {
    fetch("https://api.adviceslip.com/advice")
        .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
        .then((data) => {
        const advice = data.slip.advice;
        console.log(advice);
    })
        .catch((error) => {
        console.error("Error feching advice", error);
    });
};
const tryCatchFetch = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("https://api.adviceslip.com/advice");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = yield response.json();
        const advice = data.slip.advice;
        console.log(advice);
    }
    catch (error) {
        console.error(error);
    }
});
flipCoin()
    .then((gameResult) => {
    console.log(gameResult);
    fetchApiData();
})
    .catch((gameResult) => {
    console.log(gameResult);
});
// Part 2
