"use strict";
// I am sick at the moment, i could try and improve the code but i would rather rest so i will do that.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const idInput = document.getElementById("id-input");
const adviceForm = document.querySelector(".advice-form");
const adviceText = document.querySelector(".advice-text");
const customError = "Sorry, we could not find an advice with that id, try another";
let inputValue = "";
if (idInput) {
    idInput.addEventListener("input", (e) => {
        const target = e.target;
        inputValue = target.value;
    });
}
if (adviceForm) {
    adviceForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const updateAdviceText = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const advice = yield fetchApiData(inputValue);
                if (advice === customError) {
                    throw new Error(customError);
                }
                if (adviceText && idInput) {
                    adviceText.textContent = advice;
                    idInput.value = "";
                }
                if (adviceText && adviceText.classList.contains("error-color")) {
                    adviceText.classList.remove("error-color");
                }
            }
            catch (error) {
                console.error(error.message);
                if (adviceText && idInput) {
                    adviceText.textContent = error;
                    adviceText.classList.add("error-color");
                    idInput.value = "";
                }
            }
        });
        updateAdviceText();
    });
}
const fetchApiData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://api.adviceslip.com/advice/${id}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = yield response.json();
        if (data && data.slip && data.slip.advice) {
            const apiData = data.slip.advice;
            return apiData;
        }
        else {
            throw new Error(customError);
        }
    }
    catch (error) {
        console.error(error.message);
        return error.message;
    }
});
