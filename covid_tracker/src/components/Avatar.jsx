import React from 'react';

const Avatar = ({ image, name, size = 32 }) => {
  // Get initials from name for fallback
  const getInitials = () => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length === 1) return name.charAt(0).toUpperCase();
    return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
  };

  // Generate a consistent background color based on the name
  const getAvatarColor = () => {
    if (!name) return '#005fff'; // Default color
    
    // Simple hash function for the name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Convert to hex color
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  };

  const styles = {
    container: {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: getAvatarColor(),
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: `${size / 2.5}px`,
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  };

  return (
    <div style={styles.container}>
      {image ? (
        <img src={image} alt={name} style={styles.image} />
      ) : (
        getInitials()
      )}
    </div>
  );
};

export default Avatar;