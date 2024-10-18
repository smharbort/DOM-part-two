// import "./styles.css";

// Menu data structure
var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

const mainEl = document.querySelector("main");
mainEl.style.backgroundColor = "var(--main-bg)";
const mainh1 = document.createElement("h1");
mainEl.prepend(mainh1);
mainh1.textContent = "DOM Manipulation";
mainEl.classList.add("flex-ctr");

const topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

for (const objEntry of menuLinks) {
  let anchor = document.createElement("a");
  anchor.setAttribute("href", objEntry.href);
  anchor.textContent = objEntry.text;
  topMenuEl.appendChild(anchor);
}

// part 3!
const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");

subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

// part 4
const topMenuLinks = document.querySelectorAll("a");

function navWhenClicked (event) {
  event.preventDefault();
  subMenuEl.style.top = "0";

  for (const link of topMenuLinks) {
    if (link !== event.target) {
      link.classList.remove("active");
    }
  }

  if (event.target.matches("a")) {
    event.target.classList.toggle("active");
    console.log(event.target);
  } else {
    return;
  }

  // part 5
  if (event.target.classList.contains("active")) {
    menuLinks.forEach((linkObj) => {
      if ((linkObj.text === event.target.text) && (linkObj["subLinks"])) {
        subMenuEl.style.top = "100%";
          let subLinks = linkObj["subLinks"];

          // part 5.5
          buildSubMenu(subLinks);

      }
    })
  }

  if (event.target.text === "about") {
    mainh1.textContent = event.target.text.toUpperCase();
    event.target.classList.remove("active");
  }
};

topMenuEl.addEventListener("click", navWhenClicked);

function buildSubMenu (subL) {

  subMenuEl.innerHTML = "";

  subL.forEach((link) => {
    const anchor = document.createElement("a");
    anchor.setAttribute("href", link.href);
    anchor.textContent = link.text;
    subMenuEl.appendChild(anchor);
  });
}

subMenuEl.addEventListener("click", (event) => {
  event.preventDefault();

  if (!event.target.matches("a")) {
    return;
  }
  console.log(event.target.text);

  subMenuEl.style.top = "0";

  topMenuLinks.forEach((link) => {
    link.classList.remove("active");
  });

  mainh1.textContent = event.target.text.toUpperCase();
});