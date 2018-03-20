document.addEventListener("DOMContentLoaded", () => {
  const savedMessage = () => {
    // Update status to let user know options were saved.
    const status = document.getElementById("status");
    status.textContent = "Please refresh to see in the list";
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
    chrome.storage.sync.get(store => {
      console.log(store);
      const savedUrls = store.savedTabs;
      const ul = document.getElementById("urls");
      const fragment = document.createDocumentFragment();
      const savedUrlHTML = savedUrls.map(saved => {
        const li = document.createElement("li");
        const url = document.createElement("p");
        url.innerHTML = saved.url;
        const pinned = document.createElement("i");
        pinned.innerHTML = saved.pinned;
        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = "X";
        removeBtn.setAttribute("classe", "btn rmvBtn");
        li.setAttribute("id", saved.url);
        li.appendChild(url);
        li.appendChild(pinned);
        li.appendChild(removeBtn);
        fragment.appendChild(li);
      })
      ul.appendChild(fragment);
    });
  }
  restore_options();
  document.getElementById("saveUrl").addEventListener("click", save_options);
});
