import { useEffect, useRef, useCallback } from "react"

export default function useKeydown(targetKey, handler, element = window) {
  const savedHandler = useRef(null)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  const eventListener = useCallback(
    event => event.key === targetKey && savedHandler.current(event),
    [targetKey],
  )

  useEffect(() => {
    element.addEventListener("keydown", eventListener)
    return () => element.removeEventListener("keydown", eventListener)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventListener])
}
