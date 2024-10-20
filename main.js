const cards = document.querySelector(".cards");

const title__id = document.getElementById("title__id");
const price__id = document.getElementById("price__id");
const file__id = document.getElementById("fileInput");
const select__id = document.getElementById("select_id");
const rate__id = document.getElementById("rate__id");
const send__btn = document.querySelector("#send__btn");

const ul = document.querySelector(".ul");
// TEpadagilar ozgaruvchila

fetch("http://localhost:3000/product")
  .then((data) => data.json())
  .then((value) => add_card(value))
  .catch((error) => console.log(error));

function add_card(data) {
  data.forEach((element) => {
    cards.innerHTML += `
          <div class="card">
            <div class="card_img">
              <div class="img1">
                <img
                  src="${element.img}"
                  alt=""
                />
              </div>

              <div class="love">
                <i class="fa-regular fa-heart"></i>
              </div>
              <div class="card__bottom">
                <button class="btn1">Aksiya</button>
                <button>Original</button>
              </div>
            </div>

            <div class="card__text">
              <h3>${element.title}</h3>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <p>${element.rate}</p>
              </div>
              <button class="start__btn">${Math.round(
                Number(element.price / 12)
              )} so'm / oyiga</button>

              <div class="card__price">
                <div class="price__all">
                  <p><s>${Number(element.price * 2)}</s></p>
                  <p class="main__price">${Number(element.price)}so'm</p>
                </div>
                <div class="bag">
                  <button><i class="fa-solid fa-bag-shopping"></i></button>
                </div>
              </div>
            </div>
          </div>
        `;
  });
}

// Bu post yani yangi card qoshish uchun

send__btn?.addEventListener("click", (e) => {
  e.preventDefault();

  const file = file__id.files;
  if (
    file.length > 0 &&
    (file[0].type === "image/png" ||
      file[0].type === "image/jpeg" ||
      file[0].type === "image/svg+xml")
  ) {
    const img = file[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const baseIMg = event.target.result;

      const selectedCategory =
        select__id.options[select__id.selectedIndex].text;
      fetch("http://localhost:3000/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now(),
          title: title__id.value,
          price: price__id.value,
          rate: rate__id.value,
          category: selectedCategory,
          img: baseIMg,
        }),
      })
        .then((data) => console.log(data))
        .catch((error) => console.log("error", error));
    };

    reader.readAsDataURL(img);
  } else {
    console.log("Fayl tanlanmagan yoki noto'g'ri fayl formati");
  }
});

// Bu sortlash uchun

fetch("http://localhost:3000/product")
  .then((response) => response.json())
  .then((data) => addJson(data))
  .catch((error) => console.log("error", error));

ul?.addEventListener("click", (e) => {
  if (e.target.tagName === "A" && e.target.id) {
    filterByCategory(e.target.id);
  }
});

function filterByCategory(categoryId) {
  fetch("http://localhost:3000/product")
    .then((response) => response.json())
    .then((data) => {
      const filteredData = data.filter((item) => {
        return item.category === categoryId;
      });

      addJson(filteredData);
    })
    .catch((error) => console.log("error", error));
}

function addJson(data) {
  cards.innerHTML = "";

  data.forEach((element) => {
    cards.innerHTML += `
    <div class="card">
      <div class="card_img">
        <div class="img1">
          <img
            src="${element.img}"
            alt=""
          />
        </div>

        <div class="love">
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="card__bottom">
          <button class="btn1">Aksiya</button>
          <button>Original</button>
        </div>
      </div>

      <div class="card__text">
        <h3>${element.title}</h3>
        <div class="star">
          <i class="fa-solid fa-star"></i>
          <p>${element.rate}</p>
        </div>
        <button class="start__btn">${Math.round(
          Number(element.price / 12)
        )} so'm / oyiga</button>

        <div class="card__price">
          <div class="price__all">
            <p><s>${Number(element.price * 2)}</s></p>
            <p class="main__price">${Number(element.price)}so'm</p>
          </div>
          <div class="bag">
            <button><i class="fa-solid fa-bag-shopping"></i></button>
          </div>
        </div>
      </div>    
    </div>
  `;
  });
}
