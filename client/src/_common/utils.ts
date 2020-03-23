import generateName from "sillyname"
import moment from "moment"
import attempt from "lodash.attempt"

const STORAGE_KEY = "ChatPlays2048_USERNAME"

export function setupRandomUsername(): string {
  let username: string

  username = attempt(() => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) as string)
  })

  if (!username) {
    username = generateName()
      .replace(" ", "_")
      .toLowerCase()

    attempt(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(username))
    })
  }

  return username
}

export function formatTime(time: string): string {
  return moment(time)
    .startOf("minute")
    .fromNow()
}
