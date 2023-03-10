import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './WorkspaceSelection.css'

export default function WorkspaceIndexItem({subscriptWorkspace}) {
    const currentUser = useSelector((state) => state.session.user);

    if (!subscriptWorkspace) return null;

    return (
    <div className='workspace-name-and-button'>
        <h1>{subscriptWorkspace.name}</h1>
        <NavLink to={`/clients/${currentUser.id}/workspaces/${subscriptWorkspace.id}`} className="launch-workspace-button">LAUNCH USLACK</NavLink>
    </div>
)
}