export const getTimestamp = () => {
  return (Date.now()/1000).toFixed(1)
}

export const capitalize = text => {
  return text.replace(/^\w/, (c) => c.toUpperCase());
}

export const setSavedStorage = (key, obj) => {
  window.localStorage.setItem(key, JSON.stringify(obj))
}

export const percent = (part,total) => {
  return (100*(part/total)).toFixed()
}

export const sum = arr => {
  return arr.reduce((a,b) => a + b)
}

export const progress = arr => {
  return percent(
    sum(arr.map(p => p.pulses_count)),
    sum(arr.map(p => p.pulses))
  )
}