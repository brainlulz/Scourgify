document.addEventListener("DOMContentLoaded", () => {
  const savedMessage = () => {
    // Update status to let user know options were saved.
    const status = document.getElementById("status");
    status.textContent = "Saved.";
    setTimeout(function() {
      status.textContent = "";
    }, 750);
  };

  // Saves options to chrome.storage.sync.
  function save_options(e) {
    e.preventDefault();
    chrome.storage.sync.get(store => {
      const saved = store.savedTabs;
      if (saved !== undefined) {
        const urlTab = document.getElementById("urlTab").value;
        const pinned = document.getElementById("pinned").checked;
        saved.push({
          url: urlTab,
          pinned: pinned
        });
        chrome.storage.sync.clear();
        chrome.storage.sync.set(
          {
            savedTabs: saved
          },
          savedMessage
        );
      } else {
        const urlTab = document.getElementById("urlTab").value;
        const pinned = document.getElementById("pinned").checked;
        chrome.storage.sync.set(
          {
            savedTabs: [
              {
                url: urlTab,
                pinned: pinned
              }
            ]
          },
          savedMessage
        );
      }
    });
  }

  function clean() {
    chrome.storage.sync.clear();
  }

  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get(
      {
        favoriteColor: "red",
        likesColor: true
      },
      function(items) {
        document.getElementById("color").value = items.favoriteColor;
        document.getElementById("like").checked = items.likesColor;
      }
    );
  }
  document.addEventListener("DOMContentLoaded", restore_options);
  document.getElementById("saveUrl").addEventListener("click", save_options);
});
