"use client";

import React from 'react';
import LanyardCard from './Lancard';
import { useLanyard } from 'react-use-lanyard';
import UniqueLoading from '../ui/morph-loading';

const DiscordCard: React.FC = () => {
  const { loading, status } = useLanyard({
    userId: "274973338676494347",
    socket: true,
  });
  
  return (
    <div className="w-full h-full flex justify-center items-center">
      {loading ? (
        <div className="flex flex-col items-center space-y-4">
          <UniqueLoading 
            variant="morph" 
            size="md" 
            className="text-primary"
          />
          <div className="text-muted-foreground text-sm font-medium animate-pulse">
            Loading Discord status...
          </div>
        </div>
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