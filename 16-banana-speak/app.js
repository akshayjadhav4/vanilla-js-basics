const translateButton = document.getElementById("translate-btn");
const translateInput = document.getElementById("english-text");
const translatedOutput = document.getElementById("minions-text");

translateButton.addEventListener("click", () => {
  let textToTranslate = translateInput.value;
  if (!textToTranslate) {
    alert("Enter text");
  } else {
    fetch(
      `https://api.funtranslations.com/translate/minion.json?text=${textToTranslate}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error.message);
          translatedOutput.innerText = "";
        }
        translatedOutput.innerText = data.contents.translated;
      })
      .catch((error) => {
        console.log("PROBLEM WITH API SERVER");
      });
  }
});
