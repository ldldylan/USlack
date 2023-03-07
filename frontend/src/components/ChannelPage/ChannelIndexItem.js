import React from "react";
import { useHistory } from "react-router-dom";

export default function ChannelIndexItem({currentUser, workspaceId, subscriptChannel}) {
    const history = useHistory()
    return (
        <div className="channel-item">  
            <div key={subscriptChannel.id} onClick={() => history.push
                (`/clients/${currentUser.id}/workspaces/${workspaceId}/channels/${subscriptChannel.id}`)}><p># {subscriptChannel.name}</p></div>
        </div>
    )
}