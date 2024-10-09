import { getAllCookies } from "./cookies.js";
import { deleteNotification, fetchFirstPageNotifications } from "./fetchHK.js";


const MAX_DELETED = 2
const FETCH_SIZE = 5
const deleteAllButton = document.getElementById("deleteAll");
const deleteNonMentionedButton = document.getElementById("deleteNonMentioned")
if (!deleteAllButton) {
  throw new Error("Delete all button doesn't exist: " + deleteAllButton);
}
if (!deleteNonMentionedButton) {
  throw new Error("Delete non-mentioned button doesn't exist: " + deleteNonMentionedButton)
}


async function deleteAbsolutelyAll(url: URL, cookies: chrome.cookies.Cookie[]): Promise<number> {
  let deletedCount: number = 0
  while (deletedCount <= MAX_DELETED) {
    const notifications = await fetchFirstPageNotifications(url, cookies, FETCH_SIZE);
    if (notifications.length <= 0) {
      console.log("No more notifications! Great Success 😎")
      return deletedCount
    }
    let notificationIdStrings = notifications.map((notification) => {
      return notification.notificationIDs.join("|") // NotificationIDString format: "abc|xyz"
    })

    notificationIdStrings.forEach(idString => {
      const response = deleteNotification(url, cookies, idString);
      deletedCount++;
    })
  }
  return deletedCount
}
async function deleteNonMentioned(url: URL, cookies: chrome.cookies.Cookie[]): Promise<number> {
  let deletedCount: number = 0
  while (deletedCount <= MAX_DELETED) {
    let notifications = await fetchFirstPageNotifications(url, cookies, FETCH_SIZE);

    if (notifications.length <= 0) {
      console.log("No more notifications! Great Success 😎")
      return deletedCount
    }

    // Filters notifications that mention user
    notifications = notifications.filter((notification) => !notification.actionTypes.some((type) => type.endsWith("MentionUser")))

    let notificationIdStrings = notifications.map((notification) => {
      return notification.notificationIDs.join("|") // NotificationIDString format: "abc|xyz"
    })

    notificationIdStrings.forEach(idString => {
      deleteNotification(url, cookies, idString);
      deletedCount++;
    })
  }
  return deletedCount
}

deleteAllButton.addEventListener('click', async () => {
  showResult('Processing all deletions...');
  const cookies = await getAllCookies();
  const bgozhURL = new URL("https://bgozh.hotelkit.net");
  const total = await deleteAbsolutelyAll(bgozhURL, cookies);
  showResult(`Deleted ${total} notifications!`)
});

deleteNonMentionedButton.addEventListener('click', async () => {
  showResult('Processing non-mentioned notifications...');
  const cookies = await getAllCookies();
  const bgozhURL = new URL("https://bgozh.hotelkit.net");
  const total = await deleteNonMentioned(bgozhURL, cookies);
  showResult(`Deleted ${total} notifications!`)
});

function showResult(message: string) {
  const resultDiv = document.getElementById('result');
  if (!resultDiv) {
    throw new Error("Result div doesn't exist: " + resultDiv);
  }
  resultDiv.innerText = message;
  resultDiv.hidden = false;
}

