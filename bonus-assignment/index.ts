// I am sick at the moment, i could try and improve the code but i would rather rest so i will do that.

const idInput = document.getElementById("id-input") as HTMLInputElement | null;

const adviceForm = document.querySelector(
  ".advice-form"
) as HTMLFormElement | null;

const adviceText = document.querySelector(".advice-text");

const customError: string =
  "Sorry, we could not find an advice with that id, try another";

let inputValue: string = "";

if (idInput) {
  idInput.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
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
        console.error(error.message);
        if (adviceText && idInput) {
          adviceText.textContent = error;
          adviceText.classList.add("error-color");
          idInput.value = "";
        }
      });
  });
}
const fetchApiData = (id: string) => {
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
      } else {
        throw new Error(customError);
      }
    })
    .catch((error) => {
      console.error(error.message);

      return error.message;
    });
};
