import React, { FC } from 'react'
import {ChannelQuantity,ChannelBox,ChannelName,ChannelUsers} from "./channel.components"
import {FiUser} from "react-icons/fi"

interface IChannelProps {
    channelName:string,
    channelUsers:number
}

const Channel : FC<IChannelProps> = ({channelName,channelUsers}) => {
  return (
    <ChannelBox>
      <ChannelUsers>
          <ChannelQuantity color={channelUsers > 0 ? "green" : "red"}>
            {channelUsers}
          </ChannelQuantity> 
          <FiUser/>
      </ChannelUsers>
      <ChannelName>
        {channelName}
      </ChannelName>
    </ChannelBox>
  )
}

export default Channel