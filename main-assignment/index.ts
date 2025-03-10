interface apiData {
  slip: {
    id: number;
    advice: string;
  };
}

// Part 1

const flipCoin = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    let result: number = Math.random();
    if (result > 0.5) {
      resolve("You win!");
    } else {
      reject("You lose!");
    }
  });
};

const getFlipCoinResult = async () => {
  try {
    const result: string = await flipCoin();
    console.log(result);
  } catch (rejectValue) {
    console.log(rejectValue);
  }
};

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
    .then((data: apiData) => {
      const advice: string = data.slip.advice;
      console.log(advice);
    })
    .catch((error) => {
      console.error("Error feching advice", error);
    });
};
const getAdviceAfterCoinFlip = async () => {
  const result = await flipCoin();
  console.log(result);
  const adviceResponse = await tryCatchFetch();
  console.log(adviceResponse);
};
const tryCatchFetch = async () => {
  try {
    const response = await fetch("https://api.adviceslip.com/advice");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: apiData = await response.json();

    const advice = data.slip.advice;

    return advice;
  } catch (error) {
    console.error(error);
  }
};

getAdviceAfterCoinFlip();
// Part 2
