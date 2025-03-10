import React from 'react';

export default function DateTime({ 
  date, 
  options = { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric' 
  } 
}) {
  if (!date) {
    return <>Invalid Date</>; 
  }

  const currentLocale = navigator.language || 'en-US'; // Default to 'en-US'
  
  const formattedDate = new Intl.DateTimeFormat(currentLocale, options).format(new Date(date));

  return <>{formattedDate}</>;
}
