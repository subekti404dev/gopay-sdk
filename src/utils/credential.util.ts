import { generateUniqueId } from "./unique-id.util";

declare var localStorage: any;

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  (global as any).localStorage = new LocalStorage("./.localStorage");
}

const credentialsKey = "GOPAY_CREDENTIALS";

export interface ICredential {
  accessToken?: string;
  refreshToken?: string;
  location?: string;
  uniqueId?: string;
  lastTokenUpdated?: string;
}

export const getCredentials: () => ICredential = () => {
  const lsCredentials = localStorage.getItem(credentialsKey);
  const credentials = {
    accessToken: "",
    refreshToken: "",
    location: "-6.9314517,106.6378065",
    uniqueId: generateUniqueId(),
    lastTokenUpdated: "",
  };
  if (!localStorage.getItem(credentialsKey)) {
    localStorage.setItem(credentialsKey, JSON.stringify(credentials));
    return credentials;
  }
  try {
    return JSON.parse(lsCredentials);
  } catch (error) {
    return credentials;
  }
};

export const init: (credential?: ICredential) => ICredential = (cred = {}) => {
  const credentials = {
    accessToken: cred.accessToken || "",
    refreshToken: cred.refreshToken || "",
    location: cred.location || "-6.2438422,106.8026804",
    uniqueId: cred.uniqueId || generateUniqueId(),
    lastTokenUpdated: "",
  };
  localStorage.setItem(credentialsKey, JSON.stringify(credentials));

  return credentials;
};

export const setToken: (
  accessToken: string,
  refreshToken: string
) => ICredential = (accessToken: string, refreshToken: string) => {
  const newCredentials = {
    ...getCredentials(),
    accessToken,
    refreshToken,
    lastTokenUpdated: Date.now().toString(),
  };
  localStorage.setItem(credentialsKey, JSON.stringify(newCredentials));
  return newCredentials;
};

export const setLocation: (location: string) => ICredential = (
  location: string
) => {
  const newCredentials = {
    ...getCredentials(),
    location,
  };
  localStorage.setItem(credentialsKey, JSON.stringify(newCredentials));
  return newCredentials;
};
// console.log(getCredentials());
