import React, { useState } from 'react';
import { useChannelStateContext, useChatContext } from 'stream-chat-react';
import { IoSend, IoAttach, IoHappy } from 'react-icons/io5';

const CustomMessageInput = () => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const { client } = useChatContext();
  const { channel } = useChannelStateContext();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    try {
      await channel.sendMessage({
        text: message.trim(),
      });
      
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const response = await client.sendFile(file.name, file, channel.cid);
      await channel.sendMessage({
        text: '',
        attachments: [
          {
            type: 'file',
            asset_url: response.file,
            title: file.name,
            mime_type: file.type,
            file_size: file.size,
          },
        ],
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  
  return (
    <div className={`team-message-input__wrapper ${isFocused ? 'team-message-input__wrapper--focused' : ''}`}>
      <form className="team-message-input__input" onSubmit={handleSubmit}>
        <div className="team-message-input__top">
          <input
            className="team-message-input__textarea"
            value={message}
            onChange={handleChange}
            placeholder="Send a message..."
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
        <div className="team-message-input__bottom">
          <div className="team-message-input__icons">
            <label className="team-message-input__icon-wrapper">
              <IoAttach className="team-message-input__icon" />
              <input
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
            </label>
            <div className="team-message-input__icon-wrapper">
              <IoHappy className="team-message-input__icon" />
            </div>
          </div>
          <button
            className="team-message-input__button"
            type="submit"
            disabled={!message.trim()}
          >
            <IoSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomMessageInput;