/**
 * Runs continously on every webpage.
 * Is used to:
 *  1. Check current url
 *  2. If current url is hotelkit, activate button
 *  3. Handle button press
 */

chrome.action.onClicked.addListener(click); // When icon is clicked
chrome.tabs.onUpdated.addListener(check); // When tab is updated check url

function check(tab_id, data, tab) {

  console.log("tab_id: ", tab_id);
  console.log("data", data);
  console.log("tab: ", tab);

  if (tab.url == "https://bgozh.hotelkit.net/#!/home?type=Notifications") {
    console.log("URL MATCHES");
    click();
  }

}
function click() {

  chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) { 
    const tab = tabs[0]; // current tab
    console.log("Current tab: " + tab);
    alert("Current tab: " + tab);

    //chrome.scripting.executeScript({ target: { tabId: tab.id }, function: deleteAllNotifcations,}).then(() => console.log("Script injected!"));

  });
}

/**
 * Deletes all notifications on hotelkit
 */
function deleteAllNotifications(){
  console.log("Deleting all notifications!");
}
