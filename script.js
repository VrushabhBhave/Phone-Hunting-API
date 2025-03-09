const form = document.querySelector("form");
const input = document.querySelector("input");
const mobileCard = document.querySelector("#mobile-card");
const modalContent = document.querySelector(".modal-content");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchData();
});

async function fetchData(){
    const respone = await fetch("https://openapi.programming-hero.com/api/phones?search=" + `${input.value}`);
    const result = await respone.json();
    console.log(result.data);
    displayMobileCard(result.data);
}

function displayMobileCard(result){
    mobileCard.innerHTML = "";
    const fregment = document.createDocumentFragment();
    result.forEach((data) => {
        const parent = document.createElement("div");
        const image = document.createElement("img");
        const name = document.createElement("h2");
        const para = document.createElement("p");
        const button = document.createElement("button");

        image.src = data.image;
        name.innerText = data.phone_name;
        para.innerText = "There are many variations of passages of available, but the majority have suffered";
        button.innerText = "SHOW DETAILS";
        button.value = data.slug;
        button.id = "dialog-button";

        button.addEventListener("click", (e) => {
            document.getElementById("modal").style.display = "flex";
            document.querySelector(".modal-content").style.display = "block";
            const modal = document.querySelector("#modal");
            console.log(e.target.value);
            displayDetails(e.target.value);
            modal.classList.add("modal");
        })

        parent.classList.add("parent");
        name.classList.add("name");
        para.classList.add("para");
        button.classList.add("button");

        parent.append(image, name, para, button);
        fregment.append(parent);

    });
    mobileCard.append(fregment);
}



//dialog box

// document.getElementById("openModalBtn").addEventListener("click", function() {
//     document.getElementById("modal").style.display = "flex";
// });



/* Close modal when clicking outside the content */
window.addEventListener("click", function(event) {
    let modal = document.getElementById("modal");
    modalContent.innerHTML = "";
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

async function displayDetails(value){
    const response = await fetch("https://openapi.programming-hero.com/api/phone/" + `${value}`);
    const result = await response.json();
    // console.log(result.data);
    displayData(result.data);
}

function displayData(obj){
    console.log(obj);
    const span = document.createElement("span");
    const parent = document.createElement("div");
    const img = document.createElement("img");
    const name = document.createElement("h2");
    const brand = document.createElement("p");
    const storage = document.createElement("p");
    const displaySize = document.createElement("p");
    const chipSet = document.createElement("p");
    const memory = document.createElement("p");
    const sensors = document.createElement("p");
    const releaseDate = document.createElement("p");

    span.innerHTML = "&times;"
    span.classList.add("close-btn");
    img.src = obj.image;
    name.innerText = obj.name;
    brand.innerHTML = `<strong>Brand:</strong> ${obj.brand}`;
    storage.innerHTML = `<strong>Storage:</strong> ${obj.mainFeatures.storage}`;
    displaySize.innerHTML = `<strong>DisplayStorage:</strong> ${obj.mainFeatures.displaySize}`;
    chipSet.innerHTML = `<strong>Chipset:</strong> ${obj.mainFeatures.chipSet}`;
    memory.innerHTML = `<strong>Memory:</strong> ${obj.mainFeatures.memory}`;
    sensors.innerHTML = `<strong>Sensors:</strong> ${obj.mainFeatures.sensors.toString()}`;
    releaseDate.innerHTML = `<strong>ReleaseDate:</strong> ${obj.releaseDate}`;

    name.style.margin = "1rem";
    brand.classList.add("detail-style");
    storage.classList.add("detail-style");
    displaySize.classList.add("detail-style");
    chipSet.classList.add("detail-style");
    memory.classList.add("detail-style");
    sensors.classList.add("detail-style");
    sensors.classList.add("detail-style");
    releaseDate.classList.add("detail-style");

    span.addEventListener("click", function() {
        document.getElementById("modal").style.display = "none";
        modalContent.innerHTML = "";
    });

    parent.append(img, name, brand, storage, displaySize, chipSet, memory, sensors, releaseDate);
    modalContent.prepend(span);
    modalContent.append(parent);
}