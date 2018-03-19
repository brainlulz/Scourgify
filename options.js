const saveBtn = document.getElementById("saveUrl");
const urlInput = document.querySelector(".urlTab").value;

const saveUrl = e => {
  e.preventDefault();
  document.addEventListener("change", e => {
    alert(urlInput);
  });
};

document.addEventListener("DOMContentLoaded", saveUrl);
