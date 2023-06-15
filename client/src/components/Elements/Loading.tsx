import React from "react";

export default function Loading() {
  return (
    <div className="flex self-center justify-center w-24 h-24 overflow-hidden">

      <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin m-3" width="64" height="64" viewBox="0 0 64 64" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64ZM32 59.52C47.1989 59.52 59.52 47.1989 59.52 32C59.52 16.8011 47.1989 4.48 32 4.48C16.8011 4.48 4.48 16.8011 4.48 32C4.48 47.1989 16.8011 59.52 32 59.52Z" fill="#D9D9D9" fillOpacity="0.5" />
        <path d="M32 0C40.4869 1.01206e-07 48.6262 3.37142 54.6274 9.37258C60.6286 15.3737 64 23.5131 64 32L57.8847 32C57.8847 25.1349 55.1576 18.5511 50.3033 13.6967C45.4489 8.84241 38.8651 6.11527 32 6.11527L32 0Z" fill="#D38EE5" />
      </svg>
    </div>
  );
}
