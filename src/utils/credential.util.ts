import { generateUniqueId } from "./unique-id.util";

const credentialsKey = "GOPAY_CREDENTIALS";

export interface IInit {
  location?: string;
  uniqueId?: string;
}

export interface ICredential {
  accessToken?: string;
  refreshToken?: string;
  location?: string;
  uniqueId?: string;
  lastTokenUpdated?: string;
}

export interface ICredentialProps {
  localStorage?: any;
  location?: string;
  uniqueId?: string;
}

export class Credential {
  _localStorage: any;
  _credentials: ICredential = {};

  constructor(props: ICredentialProps = {}) {
    if (props.localStorage) {
      this._localStorage = props.localStorage;
    } else {
      this._localStorage = window.localStorage;
    }
    this._init({ location: props.location, uniqueId: props.uniqueId });
  }

  _save = () => {
    this._localStorage.setItem(
      credentialsKey,
      JSON.stringify(this._credentials)
    );
  };

  _init = (cred: IInit = {}) => {
    const lsCredentials = this._localStorage.getItem(credentialsKey);
    this._credentials = {
      accessToken: "",
      refreshToken: "",
      location: "-6.2438422,106.8026804",
      uniqueId: generateUniqueId(),
      lastTokenUpdated: "",
    };
    if (lsCredentials) {
      try {
        const tmp = JSON.parse(lsCredentials);
        this._credentials = tmp;
      } catch (error) {}
    }

    this._credentials = {
      ...this._credentials,
      ...(!!cred.location && { location: cred.location }),
      ...(!!cred.uniqueId && { uniqueId: cred.uniqueId }),
    };

    this._save();
  };

  getCredentials = () => {
    return this._credentials;
  };

  setToken = (accessToken: string, refreshToken: string) => {
    this._credentials = {
      ...this._credentials,
      ...(!!accessToken && { accessToken }),
      ...(!!refreshToken && { refreshToken }),
    };
    this._save();
    return this._credentials;
  };
}
