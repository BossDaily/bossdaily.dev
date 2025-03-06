"use client";

import React from 'react';
import LanyardCard from './Lancard';
import { useLanyard } from 'react-use-lanyard'; // Replace with the actual import

const LanyardCardExample: React.FC = () => {
  const { loading, status } = useLanyard({
    userId: "274973338676494347",
    socket: true,
  });
  
  return (
    <div className="lanyard-wrapper w-full flex justify-center items-center">
      <LanyardCard
        data={status}
        theme="dark"
        idleMessage="Just chilling right now!"
        showDisplayName={true}
        hideTimestamp={false}
      />
    </div>
  );
};

export default LanyardCardExample;