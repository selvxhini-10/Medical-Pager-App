import React, {useState, useEffect } from 'react';
import {useChatContext } from 'stream-chat-react';

import {SearchIcon} from '../assets/SearchIcon';
import ResultsDropdown from './ResultsDropdown';

const ChannelSearch = ({setToggleContainer}) => { //destructured prop
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const {client, setActiveChannel} = useChatContext();
    const [teamChannels, setTeamChannels] = useState([])
    const [directChannels, setDirectChannels] = useState([])

    useEffect(() => {
      if(!query) {
        setTeamChannels([]);
        setDirectChannels([]);
      }
    },[query])

    const getChannels = async (text) => {
      try {
        // Fetch channels
        const channelResponse = client.queryChannels({
          type: 'team', 
          name: {$autocomplete: text}, 
          members: {$in: [client.userID]}
        });
        //query users
        const userResponse = client.queryUsers({
          id: {$ne: client.userID},
          name: {$autocomplete: text}
        })
        //fetch at same time to make it quicker
        const [channels, {users}] = await Promise.all([channelResponse, userResponse]);

        //if channels exist
        if (channels.length) setTeamChannels(channels);
        if (users.length) setDirectChannels(users);
      } catch (error) {
        setQuery('')
      }
    }

    const onSearch = (event) => {
      event.preventDefault();

      setLoading(true);
      setQuery(event.target.value);
      getChannels(event.target.value);
    }

    const setChannel = (channel) => {
      setQuery('');
      setActiveChannel(channel);
    }
  return (
    <div className="channel-search__container">
    <div className='channel-search__input__wrapper'>
        <div className='channel-search__input__icon'>
            <SearchIcon/>
        </div>
        <input 
        className='channel-search__input__text' 
        placeholder="Search" 
        type="text" 
        value={query}
        onChange={onSearch}
        
        />
        </div>
        {query && (
          <ResultsDropdown
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          setChannel={setChannel}
          setQuery={setQuery}
          setToggleContainer={setToggleContainer} 
          />
        )}
    </div>
  )
}

export default ChannelSearch;