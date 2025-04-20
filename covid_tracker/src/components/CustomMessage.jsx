import React, { useState } from 'react';
import { useMessageContext, useChannelStateContext } from 'stream-chat-react';
import { format } from 'date-fns';
import Avatar from './Avatar'; 

const CustomMessage = () => {
  const { message, handleAction, handleOpenThread, isMyMessage } = useMessageContext();
  const { channel } = useChannelStateContext();
  const [showActions, setShowActions] = useState(false);
  
  const messageDate = new Date(message.created_at);
  const formattedDate = format(messageDate, 'h:mm a');
  
  const messageClasses = `message-container ${isMyMessage() ? 'message-container--mine' : ''}`;
  
  const toggleActions = () => {
    setShowActions(!showActions);
  };
  
  const handleReply = () => {
    if (handleOpenThread) {
      handleOpenThread(message);
    }
  };
  
  return (
    <div 
      className={messageClasses} 
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {!isMyMessage() && (
        <div className="message-avatar">
          <Avatar 
            image={message.user?.image} 
            name={message.user?.name || message.user?.id} 
            size={36} 
          />
        </div>
      )}
      <div className="message-content-wrapper">
        {!isMyMessage() && (
          <div className="message-header">
            <span className="message-username">{message.user?.name || message.user?.id}</span>
            <span className="message-timestamp">{formattedDate}</span>
          </div>
        )}
        <div className={`message-bubble ${isMyMessage() ? 'message-bubble--mine' : ''}`}>
          {message.text}
          {message.attachments && message.attachments.length > 0 && (
            <div className="message-attachments">
              {message.attachments.map((attachment, i) => {
                if (attachment.type === 'image') {
                  return (
                    <img 
                      key={`attachment-${i}`}
                      src={attachment.image_url} 
                      alt={attachment.fallback}
                      className="message-attachment-image"
                    />
                  );
                }
                if (attachment.type === 'file') {
                  return (
                    <div className="message-attachment-file" key={`attachment-${i}`}>
                      <a href={attachment.asset_url} target="_blank" rel="noopener noreferrer">
                        {attachment.title || 'File'}
                      </a>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
        {isMyMessage() && (
          <span className="message-timestamp message-timestamp--mine">{formattedDate}</span>
        )}
        {showActions && (
          <div className="message-actions">
            <button onClick={handleReply} className="message-action-button">
              Reply
            </button>
            {/* Add more action buttons as needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomMessage;