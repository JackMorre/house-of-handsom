const rightArrow = document.querySelector(".right-Arrow");

const leftArrow = document.querySelector(".leftArrow");

const container = document.querySelector(".max-crew-container");

const cardArray = document.querySelectorAll(".crew-card");

const serviceCards = document.querySelectorAll(".services-card");

const headerBtn = document.querySelector(".mob-nav-btn");

const bodyEl = document.querySelector("body");

const btnParent = headerBtn.parentElement;

const links = document.querySelectorAll("nav ul a");

const heroCTA = document.querySelector(".hero-btn");

heroCTA.addEventListener("click", clickHandler);

for (const link of links) {
  link.addEventListener("click", clickHandler);
}
function clickHandler(e) {
  e.preventDefault();
  btnParent.classList.remove("open");
  bodyEl.classList.remove("darken");
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;
  scroll({
    top: offsetTop,
    behavior: "smooth",
  });
}

headerBtn.addEventListener("click", () => {
  if (btnParent.classList.contains("open")) {
    btnParent.classList.remove("open");
    bodyEl.classList.remove("darken");
  } else {
    btnParent.classList.add("open");
    bodyEl.classList.add("darken");
  }
});

serviceCards.forEach((card) => {
  card.addEventListener("click", function (e) {
    e.preventDefault();
    const currentCard = e.target.closest(".basic-info");

    console.log(currentCard);

    if (currentCard.classList.contains("turn") === true) {
      currentCard.classList.remove("turn");
    } else if (currentCard.classList.contains("turn") === false) {
      currentCard.classList.add("turn");
    } else return;

    const panel = currentCard.nextElementSibling;
    if (panel.style.height) {
      panel.style.height = null;
      currentCard.style.marginBottom = "0px";
      currentCard.parentElement.classList.remove("open");
      // panel.style.padding = null;
    } else {
      panel.style.height = panel.scrollHeight + "px";
      currentCard.style.marginBottom = "1rem";
      currentCard.parentElement.classList.add("open");
      // panel.style.padding = "0 0 1rem 0";
    }
  });
});

const turnServicesOn = function () {
  Array.from(document.querySelectorAll(".basic-info")).forEach((element) => {
    const panel = element.nextElementSibling;
    if (this.screen.width > 640) {
      if (element.classList.contains("turn") === true) {
      } else if (element.classList.contains("turn") === false) {
        element.classList.add("turn");
      } else return;

      if (panel.style.height) {
        // panel.style.padding = null;
      } else {
        // panel.style.height = panel.scrollHeight + "px";
        // element.style.marginBottom = "1rem";
        element.parentElement.classList.add("open");
        // panel.style.padding = "0 0 1rem 0";
      }
    } else {
      element.classList.remove("turn");
      panel.style.height = null;
      element.style.marginBottom = "0px";
      element.parentElement.classList.remove("open");
    }
  });
};

turnServicesOn();
window.addEventListener("resize", function (e) {
  e.preventDefault();
  turnServicesOn();
  console.log();
  if (this.window.innerWidth >= 1024) {
    container.style.width = "unset";
  } else if (this.window.innerWidth < 1024) {
    container.style.width = `${cardArray.length}00vw`;
  }
});

//get the width for how many cards there are
container.style.width = `${cardArray.length}00vw`;
//gets the divided amountmso each card can fit
const dividedNumber = 100 / Number(cardArray.length);
//create currentcard and final number varibles outside scope
let currentCard = "";
let finalNumber = "";

//creating function for clicking arrows
const clickArrow = (str) => {
  let cardNumber = "";
  // making sure arrows are availble to press at start of click
  rightArrow.style.display = "block";
  leftArrow.style.display = "block";

  //this if statment cicles through all of the cards availble
  for (let i = 0; i < cardArray.length; i++) {
    //each time we go through we get a card from card array to grab the card variable.
    const card = cardArray[i];
    //we then grab the attribute from the current card to see if its current on it.
    const boolion = card.getAttribute("data-viewing");
    if (boolion == "true") {
      // if true, we change the attribute to false as it will no longer be true and on the card.
      card.setAttribute("data-viewing", "false");
      //depending on which arrow is clicked will either select the previous one in the array or next to allow for the attribute to be turned to true.
      if (str === "left") {
        cardArray[i - 1].setAttribute("data-viewing", "true");
      } else if (str === "right") {
        cardArray[i + 1].setAttribute("data-viewing", "true");
      }
      //make sure current card has true setting in the attribute
      currentCard = cardArray[i];
      break;
    }
  }
  if (str === "left") {
    //grabs card number from data number attribute
    cardNumber = Number(currentCard.getAttribute("data-number")) - 1;
    finalNumber -= dividedNumber;
  } else if (str === "right") {
    cardNumber = Number(currentCard.getAttribute("data-number")) + 1;
    finalNumber = dividedNumber * cardNumber;
  }

  container.style.transform = `translateX(-${finalNumber}%)`;

  if (cardNumber === 0) {
    leftArrow.style.display = "none";
  } else if (cardNumber + 1 === cardArray.length) {
    rightArrow.style.display = "none";
  }
};

leftArrow.addEventListener("click", (e) => {
  e.preventDefault();
  clickArrow("left");
});

rightArrow.addEventListener("click", (e) => {
  e.preventDefault();
  clickArrow("right");
});
