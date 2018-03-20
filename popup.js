document.addEventListener("DOMContentLoaded", () => {
  const newTab = () => (chrome.storage.sync.get(store => {
    const savedUrls = store.savedTabs;
    savedUrls.map(saved => {
      chrome.tabs.create({
        url: saved.url,
        pinned: saved.pinned
      });
    })
  }))
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
