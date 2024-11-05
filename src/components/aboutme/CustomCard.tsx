"use client"

import React from 'react';
import { BaseDiscordCard } from 'discord-card-react';
import "discord-card-react/styles.css";
import customStyles from './CustomDiscordCard.module.css';
import { cn } from '@/lib/utils';

const CustomDiscordCard = (props) => {
  
  return (
    
    <BaseDiscordCard
      {...props}
      classNameOuter={customStyles['discord-card-outer-body']}
      classNameInner={customStyles['discord-card-inner-body']}
    />
  );
};

export default CustomDiscordCard; 