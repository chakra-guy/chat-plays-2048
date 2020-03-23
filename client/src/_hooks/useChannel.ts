import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { AppState } from "../store"
import { joinChannel } from "../_websocket/actions"

export default function useChannel(channel: string) {
  const dispatch = useDispatch()
  const { isConnected } = useSelector<AppState, any>(state => state.websocket)

  useEffect(() => {
    if (isConnected) {
      dispatch(joinChannel(channel))
    }
  }, [dispatch, channel, isConnected])
}
