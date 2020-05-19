const Method = {
  POST: `POST`,
  PUT: `PUT`,
};

const ResponseStatus = {
  OK: 200,
  MULTIPLE_CHOICE: 300
};

const checkStatus = (response) => {
  if (response.status >= ResponseStatus.OK && response.status < ResponseStatus.MULTIPLE_CHOICE) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  sendFormInfo(filmId, data) {
    return this._load({
      url: `..................`,
      method: Method.POST,
      body: JSON.stringify('...................'),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json());
  }

};