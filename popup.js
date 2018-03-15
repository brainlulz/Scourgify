document.addEventListener("DOMContentLoaded", () => {
  function newTab() {
    chrome.tabs.create({
      url: "https://mail.google.com/mail/u/0/?tab=wm#inbox",
      pinned: true
    });
    chrome.tabs.create({
      url: "https://calendar.google.com/calendar/r",
      pinned: true
    });
    chrome.tabs.create({
      url: "https://twitter.com/",
      pinned: true
    });
    chrome.tabs.create({
      url: "https://medium.com/",
      pinned: false
    });
    chrome.tabs.create({
      url: "https://news.google.com/news/?ned=fr&gl=FR&hl=fr",
      pinned: false
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
