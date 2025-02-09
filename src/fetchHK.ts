export interface Notification {
  headline: string;
  actionTypes: string[];
  texts: string[];
  actions: {
    userID: string;
    text: string;
  }[];
  itemType: string;
  itemID: string;
  timestamp: number;
  kitID: string;
  notificationIDs: string[];
  info: any[];
  priority: number;
  hash: string;
  userID: string;
}

async function fetchHK(url: URL, cookies: chrome.cookies.Cookie[], method: string, data?: string): Promise<any> {
  let xxsrftoken = cookies.find((cookie) => cookie.name === "XSRF-TOKEN")?.value ?? (() => { throw new Error("XSRF-TOKEN could not be found!"); })();

  const response = await fetch(url, {
    headers: {
      "x-xsrf-token": xxsrftoken,
      "Content-Type": "application/json"
    },
    body: data,
    method: method,
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(`Response failed with status: ${response.status}. Error: ${JSON.stringify(errorResponse)}`);
  }

  try {
    return await response.json()
  } catch (SyntaxError) {
    console.log("No JSON response recieved, probably a delete POST")
    return undefined
  }
}

//TODO: figure out if itemTitle are always part of a notification, and if: update the INotification
export async function fetchFirstPageNotifications(url: URL, cookies: chrome.cookies.Cookie[], count: number): Promise<Notification[]> {
  const jsonResponse = await fetchHK(new URL(`/notification/first-page?count=${count}`, url), cookies, "GET"); // 99 is the maximum
  return jsonResponse.notifications as Notification[];
}

export async function deleteNotification(url: URL, cookies: chrome.cookies.Cookie[], notificationID: string): Promise<void | { success: boolean; hash: string }> {
  const jsonResponse = await fetchHK(new URL("/notification/delete", url), cookies, "POST", JSON.stringify({ notificationIDString: notificationID }));

  if (jsonResponse && jsonResponse.success === false) {
    return {
      success: false,
      hash: jsonResponse.hash,
    };
  }
  return;
}
