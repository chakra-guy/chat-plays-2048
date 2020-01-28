import generateName from "sillyname"
import moment from "moment"

const STORAGE_KEY = "ChatPlays2048_USERNAME"

export function setupRandomUsername() {
  let username

  try {
    username = JSON.parse(localStorage.getItem(STORAGE_KEY))
  } catch (error) {
    // ignore
  }

  if (!username) {
    username = generateName()
      .replace(" ", "_")
      .toLowerCase()

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(username))
    } catch (error) {
      // ignore
    }
  }

  return username
}

export function formatTime(time) {
  return moment(time)
    .startOf("minute")
    .fromNow()
}
