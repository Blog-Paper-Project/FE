import React, { useContext } from 'react'
import { Button } from '@material-ui/core';

import { SocketContext } from '../../Context';

const Notifications = () => {
    const { answerCall, call, callAccepted } = useContext(SocketContext);
    return (
        <>
            {call.isReceivingCall && !callAccepted && (
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                
                </div>
            )}
        </>
    )
}

export default Notifications
