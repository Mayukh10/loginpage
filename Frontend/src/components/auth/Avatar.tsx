import React from 'react';

interface AvatarProps {
  letter: string;
  color?: string;
  count?: number;
  position?: 'top-right' | 'bottom-left';
}

const Avatar: React.FC<AvatarProps> = ({ 
  letter, 
  color = '#007bff', 
  count, 
  position = 'top-right' 
}) => {
  return (
    <div className={`user-avatars ${position}`}>
      <div className="avatar-group">
        <div className="avatar" style={{ backgroundColor: color }}>
          {letter}
        </div>
        {count && <div className="avatar-count">{count}</div>}
      </div>
    </div>
  );
};

export default Avatar; 