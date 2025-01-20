import { getAllCookies } from "./cookies.js";
import { deleteNotification, fetchFirstPageNotifications, Notification } from "./fetchHK.js";

const MAX_DELETED = 2048;
const FETCH_SIZE = 99;
const BGOZHURL = new URL("https://bgozh.hotelkit.net");

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  const COOKIES = await getAllCookies();

  if (request.action === 'deleteAll') {
    const notifications: Notification[] = await fetchFirstPageNotifications(BGOZHURL, COOKIES, FETCH_SIZE);
    deleteNotificationsByID(() => true).then(total => {
      sendResponse({ total });
    });
    return true; // Indicating we will send a response asynchronously
  }

  if (request.action === 'deleteNonMentioned') {
    deleteNotificationsByID((notification) =>
      !notification.actionTypes.some(type => type.endsWith("MentionUser"))
    ).then(total => {
      sendResponse({ total });
    });
    return true;
  }
});

async function deleteNotificationsByID(
  filterFn: (notification: Notification) => boolean
): Promise<number> {
  const COOKIES = await getAllCookies();
  let notifications: Notification[] = await fetchFirstPageNotifications(BGOZHURL, COOKIES, FETCH_SIZE);
  let deletedCount = 0;

  notifications = notifications.filter(filterFn);

  while (deletedCount < MAX_DELETED && notifications.length > 0) {
    const notificationIdStrings = notifications.map(notification =>
      notification.notificationIDs.join("|") // NotificationIDString format: "abc|xyz"
    );

    for (const idString of notificationIdStrings) {
      await deleteNotification(BGOZHURL, COOKIES, idString);
      deletedCount++;
      if (deletedCount >= MAX_DELETED) break;
    }

    // Fetch the next batch of notifications
    notifications = await fetchFirstPageNotifications(BGOZHURL, COOKIES, FETCH_SIZE);
    notifications = notifications.filter(filterFn); // Reapply the filter for the new batch
  }

  return deletedCount;
}
