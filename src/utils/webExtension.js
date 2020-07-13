// getActiveTabId :: IO -> Promise( Array )
export const getActiveTabId = () =>
  browser.tabs.query({ currentWindow: true, active: true }).then(tabs => tabs[0].id);

// sendMessageToTab :: Number -> Object -> Promise
export const sendMessageToTab = tabId => msg => browser.tabs.sendMessage(tabId, msg);

// sendMessageToActiveTab :: Object -> IO
export const sendMessageToActiveTab = msg =>
  getActiveTabId().then(activeTabId => sendMessageToTab(activeTabId)(msg));
