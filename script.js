let products = [];

let groupedCategoryProducts = {};

window.onload = async () => {
  products = await fetchProductsData(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  );
  const groupedData = Object.groupBy(
    products.categories,
    ({ category_name }) => category_name
  );
  groupedCategoryProducts = {
    Kids: groupedData["Kids"][0].category_products,
    Men: groupedData["Men"][0].category_products,
    Women: groupedData["Women"][0].category_products,
  };

  displayCards("Men");
};
// JavaScript function to show the selected tab
function showTab(e, tabId) {
  // Hide all tab contents
  const link = document.querySelectorAll("nav a.active");
  link[0].classList.remove("active");
  link[0].classList.replace("visible", "hidden");
  e.target.classList.add(...["active", "visible"]);
  const tabContents = document.querySelectorAll("section");
  tabContents.forEach((tab) => tab.classList.remove("active"));

  // Show the selected tab content
  const selectedTab = document.getElementById(tabId);
  selectedTab.classList.add("active");

  displayCards(tabId);
}

// Function to create a card
function createCard({
  image,
  title,
  vendor,
  price,
  compare_at_price,
  badge_text,
  second_image,
}) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = image;
  img.height = 200;
  img.width = 150;
  img.alt = "";
  img.onclick = () => {
    img.src = second_image;
  };

  let badgeText = null;
  if (badge_text) {
    badgeText = document.createElement("div");
    badgeText.innerText = badge_text;
    badgeText.className = "badge";
    card.appendChild(badgeText);
  }

  const titleDiv = document.createElement("div");
  titleDiv.style.display = "flex";
  titleDiv.style.justifyContent = "space-between";
  titleDiv.style.alignItems = "center";

  const titleElement = document.createElement("p");
  titleElement.textContent = title;
  titleElement.style.fontSize = "14px";
  titleElement.classList.add(["textEllipsis"]);

  const vendorElement = document.createElement("p");
  vendorElement.style.fontSize = "11px";
  vendorElement.innerHTML = `&#x2022; ${vendor}`;

  titleDiv.appendChild(titleElement);
  titleDiv.appendChild(vendorElement);

  const priceDiv = document.createElement("div");
  priceDiv.style.display = "flex";
  priceDiv.style.justifyContent = "space-between";
  priceDiv.style.alignItems = "center";
  priceDiv.style.fontSize = "11px";

  const contentElement = document.createElement("p");
  contentElement.innerText = `Rs ${parseFloat(price).toFixed(2)}`;

  const compareAtPriceElement = document.createElement("p");
  compareAtPriceElement.textContent = `${parseFloat(compare_at_price).toFixed(
    2
  )}`;
  compareAtPriceElement.style.textDecoration = "line-through";
  compareAtPriceElement.style.color = "#8F8F8F";

  const discountElm = document.createElement("p");
  discountElm.textContent = "50% Off";
  discountElm.style.color = "#FF3737";

  priceDiv.appendChild(contentElement);
  priceDiv.appendChild(compareAtPriceElement);
  priceDiv.appendChild(discountElm);

  const btn = document.createElement("button");
  btn.innerText = "Add to Cart";
  btn.className = "button";

  card.appendChild(img);
  card.appendChild(titleDiv);
  card.appendChild(priceDiv);
  card.appendChild(btn);

  return card;
}

// Function to display cards
function displayCards(tabId) {
  const cardsContainer = document.getElementById(tabId);
  cardsContainer.replaceChildren();
  groupedCategoryProducts[tabId].forEach((item) => {
    const card = createCard(item);
    cardsContainer.appendChild(card);
  });
}

async function fetchProductsData(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error("HTTp error!!!");
  } catch (error) {
    console.error("error feching data");
  }
}
