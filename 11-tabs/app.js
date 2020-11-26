const btns = document.querySelectorAll(".tab-btn");
const about = document.querySelector(".about");
const articles = document.querySelectorAll(".content");

about.addEventListener("click", (event) => {
  //   console.log(event.target.dataset.id);
  const id = event.target.dataset.id;
  if (id) {
    btns.forEach((btn) => {
      btn.classList.remove("active");
      event.target.classList.add("active");
    });

    articles.forEach((article) => {
      article.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
});
