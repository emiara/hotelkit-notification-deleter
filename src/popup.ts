import { getAllCookies } from "./cookies.js";
import { deleteNotification, fetchFirstPageNotifications } from "./fetchHK.js";


const deleteAll = document.getElementById("deleteAll");
if (!deleteAll) {
  throw new Error("Delete all button doesn't exist: " + deleteAll);
}


async function deleteAbsolutelyAll(url: URL, cookies: chrome.cookies.Cookie[]): Promise<number> {
  let deletedCount: number = 0
  while (deletedCount <= 1) { // low number for testing
    const notifications = await fetchFirstPageNotifications(url, cookies, 5);
    if (notifications.length <= 0) {
      console.log("No more notifications! Great Success 😎")
      return deletedCount
    }
    // Get the notificationIDs
    console.log("NotificationIds: ");
    let notificationIdStrings = notifications.map((notification) => {
      console.log(notification)
      return notification.notificationIDs.join("|") // NotificationIDString format: "abc|xyz"
    })

    // Delete the notifications 
    notificationIdStrings.forEach(idString => {
      const response = deleteNotification(url, cookies, idString);
      console.log("response: ", response)
      deletedCount++;
    })
  }
  return deletedCount
}

deleteAll.onclick = async function(event) {
  const cookies = await getAllCookies(); // Wait for the cookies to be retrieved
  const bgozhURL = new URL("https://bgozh.hotelkit.net");

  console.log("Cookies", cookies);
  console.log("Notifcations deleted", deleteAbsolutelyAll(bgozhURL, cookies))
}
