import generateName from "sillyname"

const STORAGE_KEY = "CP2048_USERNAME"

export default function setupRandomUsername() {
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
