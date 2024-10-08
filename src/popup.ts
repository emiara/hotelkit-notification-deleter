import { getAllCookies } from "./cookies.js";
import { fetchAllNotifications, deleteNotification } from "./fetchHK.js";


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

  const notifications = await fetchAllNotifications(bgozhURL, cookies, JSON.stringify(payload));

  // Get the notificationIDs
  let notificationIDs = [];

  for (const noti of notifications) {
    notificationIDs.push(...noti.notificationIDs);
  }

  console.log("NotificationIds: " + notificationIDs);

  // Delete the notifications 
  notificationIDs.forEach(id => {
    const response = deleteNotification(bgozhURL, cookies, id);
    console.log("response: " + response)
  });
}
