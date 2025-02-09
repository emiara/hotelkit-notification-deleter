const statusDiv = document.getElementById("status");
const deleteAllButton = document.getElementById("deleteAll");
const deleteNonMentionedButton = document.getElementById("deleteNonMentioned")
let hotelkitURL = "";

if (!statusDiv) {
  throw new Error("Status div doesn't exist: " + statusDiv);
}

if (!deleteAllButton) {
  throw new Error("Delete all button doesn't exist: " + deleteAllButton);
}

if (!deleteNonMentionedButton) {
  throw new Error("Delete non-mentioned button doesn't exist: " + deleteNonMentionedButton)
}

chrome.tabs.query({}, (tabs) => {
  const hotelkitTabs = new Set(tabs.filter(tab => tab.url && tab.url.includes(".hotelkit.net/")).map(tab => new URL(tab.url || "")).map(url => url.origin));

  console.log(hotelkitTabs); // This will log all matching tabs
  if (hotelkitTabs.size > 1) {
    statusDiv.innerHTML = "<p>I don't know how to handle multiple hotels. Please exit one of the hotelkit instances</p>";
    throw new Error("Doesnt know which hotel to delete notifications from!");
  } else if (hotelkitTabs.size == 1) {
    hotelkitURL = hotelkitTabs.values().next().value || "";
  } else {
    statusDiv.innerHTML = "<p>No hotelkit is currently open!</p>";
    throw new Error("No hotelkit found!");
  }
});

deleteAllButton.addEventListener('click', async () => {
  showResult('Processing all deletions...');
  chrome.runtime.sendMessage(
    { action: 'deleteAll', hotelkitURL: hotelkitURL },
    response => {
      showResult(`Deleted ${response.deletedCount} notifications!`);
    }
  );
});

deleteNonMentionedButton.addEventListener('click', async () => {
  showResult('Processing non-mentioned notifications...');
  chrome.runtime.sendMessage(
    { action: 'deleteNonMentioned', hotelkitURL: hotelkitURL },
    response => {
      showResult(`Deleted ${response.deletedCount} notifications!`);
    }
  );
});

function showResult(message: string) {
  const resultDiv = document.getElementById('result');
  if (!resultDiv) {
    throw new Error("Result div doesn't exist: " + resultDiv);
  }
  resultDiv.innerText = message;
  resultDiv.hidden = false;
}
