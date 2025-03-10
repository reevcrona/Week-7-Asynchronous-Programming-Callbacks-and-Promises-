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

    const updateAdviceText = async () => {
      try {
        const advice = await fetchApiData(inputValue);

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
      } catch (error: any) {
        console.error(error.message);
        if (adviceText && idInput) {
          adviceText.textContent = error;
          adviceText.classList.add("error-color");
          idInput.value = "";
        }
      }
    };
    updateAdviceText();
  });
}
const fetchApiData = async (id: string) => {
  try {
    const response = await fetch(`https://api.adviceslip.com/advice/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data && data.slip && data.slip.advice) {
      const apiData = data.slip.advice;
      return apiData;
    } else {
      throw new Error(customError);
    }
  } catch (error: any) {
    console.error(error.message);

    return error.message;
  }
};
