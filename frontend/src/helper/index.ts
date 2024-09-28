import React from 'react';
import { socialProfile } from '../types';

const convertSocialProfiles = (profiles: { [key: string]: string }): socialProfile[] => {
    return Object.entries(profiles)
      .filter(([platform, link]) => link !== 'No ' + platform) // Exclude platforms without links
      .map(([platform, link]) => ({ platform, link }));
  };
  
  export { 
    convertSocialProfiles 
  }