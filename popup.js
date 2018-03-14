document.addEventListener("DOMContentLoaded", () => {
  function newTab() {
    chrome.tabs.create({
      url: "https://mail.google.com/mail/u/0/?tab=wm#inbox",
      pinned: true
    });
  }

  document.getElementById("btnScourgify").addEventListener("click", newTab);

  const test = document.querySelector("#go-to-options");
  test.addEventListener('click', () => {
    if (chrome.runtime.openOptionsPage) {
      // New way to open options pages, if supported (Chrome 42+).
      chrome.runtime.openOptionsPage();
    } else {
      // Reasonable fallback.
      window.open(chrome.runtime.getURL("options.html"));
    }
  });
});
