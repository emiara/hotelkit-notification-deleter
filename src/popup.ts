import { getAllCookies } from "./cookies.js";
import { fetchAllNotifications, deleteNotification, fetchFirstPageNotifications } from "./fetchHK.js";


const deleteAll = document.getElementById("deleteAll");

if (!deleteAll) {
  throw new Error("Delete all button doesn't exist: " + deleteAll);
}

deleteAll.onclick = async function(event) {
  console.log("Get all cookies:");
  const cookies = await getAllCookies(); // Wait for the cookies to be retrieved
  console.log(cookies);

  // Get the Notifcations
  const bgozhURL = new URL("https://bgozh.hotelkit.net");
  const payload = { type: "notifications" };

  let deletedCount = 0
  while (deletedCount <= 1) {
    const notifications = await fetchFirstPageNotifications(bgozhURL, cookies, JSON.stringify({ ...payload, first: `${24 + (25 * deletedCount)},1,0,0` }));
    if (notifications.length <= 0) {
      console.log("No more notifications! Great Success 😎")
      break
    }
    // Get the notificationIDs
    console.log("NotificationIds: ");
    let notificationIDs = notifications.flatMap((notification) => {
      console.log(notification)
      return notification.notificationIDs
    })

    // Delete the notifications 
    notificationIDs.forEach(id => {
      const response = deleteNotification(bgozhURL, cookies, id);
      console.log("response: " + response)
    });
    deletedCount++;
  }
  console.log("Notifcations deleted: " + deletedCount)
}
