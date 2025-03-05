"use strict";
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
        fetchApiData(inputValue)
            .then((value) => {
            if (value === customError) {
                throw new Error(customError);
            }
            if (adviceText && idInput) {
                adviceText.textContent = value;
                idInput.value = "";
            }
            if (adviceText && adviceText.classList.contains("error-color")) {
                adviceText.classList.remove("error-color");
            }
        })
            .catch((error) => {
            console.log(error.message);
            if (adviceText && idInput) {
                adviceText.textContent = error;
                adviceText.classList.add("error-color");
                idInput.value = "";
            }
        });
    });
}
const fetchApiData = (id) => {
    return fetch(`https://api.adviceslip.com/advice/${id}`)
        .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
        .then((data) => {
        if (data && data.slip && data.slip.advice) {
            const apiData = data.slip.advice;
            return apiData;
        }
        else {
            throw new Error(customError);
        }
    })
        .catch((error) => {
        console.error(error.message);
        return error.message;
    });
};
