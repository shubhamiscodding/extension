const websiteList = document.getElementById("website-list");
const addWebsiteButton = document.getElementById("add-website");

function loadWebsites() {
  chrome.storage.sync.get(["websites"], (result) => {
    const websites = result.websites || [];
    renderWebsites(websites);
  });
}

function saveWebsites(websites) {
  chrome.storage.sync.set({ websites });
}

function renderWebsites(websites) {
  websiteList.innerHTML = "";
  websites.forEach((website, index) => {
    const listItem = document.createElement("li");
    const nameElement = document.createElement("span");
    const buttonsContainer = document.createElement("div");
    const openButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    nameElement.textContent = website.name;
    
    openButton.textContent = "Open";
    openButton.addEventListener("click", () => {
      openPopup(website.url);
    });

    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteWebsite(index);
    });

    buttonsContainer.classList.add("buttons");
    buttonsContainer.appendChild(openButton);
    buttonsContainer.appendChild(deleteButton);

    listItem.appendChild(nameElement);
    listItem.appendChild(buttonsContainer);
    websiteList.appendChild(listItem);
  });
}

function openPopup(url) {
  window.open(url, "_blank", "width=800,height=600");
}

function addWebsite() {
  const name = prompt("Enter website name:");
  const url = prompt("Enter website URL:");
  if (name && url) {
    chrome.storage.sync.get(["websites"], (result) => {
      const websites = result.websites || [];
      websites.push({ name, url });
      saveWebsites(websites);
      renderWebsites(websites);
    });
  }
}

function deleteWebsite(index) {
  chrome.storage.sync.get(["websites"], (result) => {
    const websites = result.websites || [];
    websites.splice(index, 1);
    saveWebsites(websites);
    renderWebsites(websites);
  });
}

addWebsiteButton.addEventListener("click", addWebsite);
loadWebsites();
