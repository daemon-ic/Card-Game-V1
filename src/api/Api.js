import axios from "axios";

const domain = "http://localhost:5000";

export const mongoCreate = (infoBeingStored) => {
  axios.post(domain + "/create", infoBeingStored).then((res) => {
    console.log("Creating Room...");
  });
};

// ------
export const getPing = async () => {
  const currentTime = Date.now();

  const response = await axios.get(domain + "/ping");
  const { data } = response;
  if (data === "OK") {
    return Date.now() - currentTime;
  }

  throw new Error("Error getting ping");
};

// use set interval to retrive game data incremently
// when a gamestate changes, retreive new data as opposed to waiting for next interval
//for users:
//
//----------
export const mongoUpdate = async (roomCheck, infoBeingUpdated) => {
  const response = await axios.post(
    domain + "/update?roomCheck=" + roomCheck,
    infoBeingUpdated
  );
  return response.data.specificInfo;
};
//--------

export const leaveRoom = (roomId, playerKey, player2) => {
  let url = domain + "/leave-room?roomId=" + roomId + "&playerKey=" + playerKey;

  if (player2) {
    url += "&player2=" + player2;
  }

  axios.get(url).then((res) => {
    console.log("leaveRoom:", res.data);
  });
};

//--------

export const mongoReadAll = async () => {
  let mainArray = [];
  await axios.get(domain + "/read_all").then((res) => {
    mainArray = res.data.specificInfo;
  });

  return mainArray;
};

//

export const mongoRead = async (roomCheck) => {
  let mainArray = [];
  await axios.get(domain + "/read?roomCheck=" + roomCheck).then((res) => {
    mainArray = res.data.specificInfo;
  });

  return mainArray;
};

// export const mongoCount = async () => {
//   let result = "";
//   await axios.get(domain + "/no_docs").then((res) => {
//     result = res.data.noDocs;
//   });
//   return result;
// };

export const mongoDeleteMatching = (value) => {
  axios.delete(domain + "/delete?value=" + value).then((res) => {
    console.log("mongoDeleteMatching: Room", res.data);
  });
};
