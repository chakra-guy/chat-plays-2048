import styled from "styled-components"

export const MessageListContainer = styled.div`
  flex: 1;
  background-color: #efefef;
  margin: 12px 12px 0;
  border-radius: 8px;
  border: 1px solid #d2d2d2;
  padding: 8px 8px 12px;
  overflow-y: scroll;
`

export const Message = styled.div`
  margin-bottom: 16px;
`

export const MessageUser = styled.div`
  font-size: 14px;
  font-weight: 700;
`

export const MessageCreatedAt = styled.div`
  opacity: 0.6;
  font-size: 12px;
  font-weight: normal;
`

export const UserContainer = styled.div`
  max-height: 160px;
  padding: 16px;
  font-size: 20px;
  font-weight: 600;
  overflow-y: scroll;
`

export const OnlineUser = styled.div`
  height: 32px;
  position: relative;
  font-size: 14px;
  margin-top: 12px;
  align-items: center;
  padding-left: 16px;

  &:before {
    content: "●";
    color: #07c74c;
    position: absolute;
    top: 0px;
    left: 0;
  }
`
export const OnlineSince = styled.div`
  opacity: 0.6;
  font-size: 12px;
  font-weight: normal;
`
