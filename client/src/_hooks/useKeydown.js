import { useEffect, useRef, useCallback } from "react"

export default function useKeydown(targetKey, handler) {
  const savedHandler = useRef(null)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  const eventListener = useCallback(
    event => event.key === targetKey && savedHandler.current(event),
    [targetKey],
  )

  useEffect(() => {
    window.addEventListener("keydown", eventListener)
    return () => window.removeEventListener("keydown", eventListener)
  }, [eventListener])
}
