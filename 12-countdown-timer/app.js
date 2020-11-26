const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");
// console.log(items);

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// let featureDate = new Date(2020, 10, 23, 16, 59, 00);
// console.log(featureDate);
const featureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);
const year = featureDate.getFullYear();
const day = featureDate.getDay();
const date = featureDate.getDate();
const month = featureDate.getMonth();
const hours = featureDate.getHours();
const min = featureDate.getMinutes();

giveaway.textContent = `Giveaway ends on ${weekdays[day]}, ${date} ${months[month]} ${year}, ${hours}:${min}am`;

const futureTime = featureDate.getTime();
// console.log(futureTime);

const getRemainingTime = () => {
  const today = new Date().getTime();
  // console.log(today);
  const t = futureTime - today;
  // console.log(t);
  // 1sec = 1000ms

  // values in ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;

  let days = t / oneDay;
  days = Math.floor(days);

  let hours = (t % oneDay) / oneHour;
  hours = Math.floor(hours);

  let minutes = Math.floor((t % oneHour) / oneMin);

  let seconds = Math.floor((t % oneMin) / 1000);

  // set values array
  const values = [days, hours, minutes, seconds];

  // to add 0 in front of value if it is less than 10
  const format = (item) => {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  };

  items.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  });
  if (t < 0) {
    clearInterval(countDown);
    deadline.innerHTML = `<h4 class="expired">Sorry , this giveaway is over.</h4>`;
  }
};

// countdown so that we dont need refresh
let countDown = setInterval(getRemainingTime, 1000);

getRemainingTime();
