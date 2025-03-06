"use client";

import React from 'react';
import LanyardCard from './Lancard';
import { useLanyard } from 'react-use-lanyard';

const DiscordCard: React.FC = () => {
  const { loading, status } = useLanyard({
    userId: "274973338676494347",
    socket: true,
  });
  
  return (
    <div className="w-full h-full flex justify-center items-center">
      {loading ? (
        <div className="text-white text-sm animate-pulse">Loading Discord status...</div>
      ) : (
        <LanyardCard
          data={status}
          theme="dark"
          idleMessage="Just chilling right now!"
          showDisplayName={true}
          hideTimestamp={false}
        />
      )}
    </div>
  );
};

export default DiscordCard;