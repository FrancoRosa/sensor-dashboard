export const getTimestamp = () => {
  return (Date.now() / 1000).toFixed(1);
};

export const capitalize = (text) => {
  return text.replace(/^\w/, (c) => c.toUpperCase());
};

export const underScoreToSpace = (text) => {
  return text.replace("_", " ");
};

export const setSavedStorage = (key, obj) => {
  window.localStorage.setItem(key, JSON.stringify(obj));
};

export const percent = (part, total) => {
  return (100 * (part / total)).toFixed();
};

export const sum = (arr) => {
  return arr.reduce((a, b) => a + b);
};

export const progress = (arr) => {
  return percent(
    sum(arr.map((p) => p.pulses_count)),
    sum(arr.map((p) => p.pulses))
  );
};

export const toDateTime = (timestamp) => {
  const time = new Date(timestamp * 1000);
  return time.toLocaleString("SV");
};

export const toDate = (timestamp) => {
  const time = new Date(timestamp * 1000);
  return time.toLocaleString("SV").split(" ")[0];
};

export const arrToCSV = (arr) => {
  const lines = arr.map((line) => line.join(","));
  const result = lines.join("\n");
  return result ? result : "No data available";
};

export const isRecent = (timestamp) => {
  const msInDay = 24 * 60 * 60 * 1000;
  const inputDate = new Date(timestamp);
  return inputDate.getTime() > Date.now() - msInDay;
};
