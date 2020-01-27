import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { joinChannel } from "../websocket/actions"

export default function useChannel(channel) {
  const dispatch = useDispatch()
  const { isConnected } = useSelector(state => state.websocket)

  useEffect(() => {
    if (isConnected) {
      dispatch(joinChannel(channel))
    }
  }, [dispatch, channel, isConnected])
}
