import generateName from "sillyname"
import moment from "moment"
import attempt from "lodash.attempt"
import isError from "lodash.iserror"

const STORAGE_KEY = "ChatPlays2048_USERNAME"

export function setupRandomUsername(): string {
  let username: string | Error

  username = attempt(JSON.parse(localStorage.getItem(STORAGE_KEY) as string))

  if (isError(username)) {
    username = generateName()
      .replace(" ", "_")
      .toLowerCase()

    attempt(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(username)))
  }

  return username
}

export function formatTime(time: string): string {
  return moment(time)
    .startOf("minute")
    .fromNow()
}
