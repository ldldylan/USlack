import React from "react";
import { NavLink } from "react-router-dom";

export default function ChannelIndexItem({currentUser, workspaceId, subscriptChannel}) {
    return (
        <div className="channel-item"> 
            <NavLink to={`/clients/${currentUser.id}/workspaces/${workspaceId}/channels/${subscriptChannel.id}`}><p># {subscriptChannel.name}</p></NavLink>
        </div>
    )
}