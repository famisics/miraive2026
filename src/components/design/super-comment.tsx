'use client';

import { useEffect } from 'react';

export const SuperComment = () => {
  useEffect(() => {
    console.log(
      '%c🎉 新入生のみなさん、未来大へようこそ！🎉',
      'color: white; background-color: #ffff55; color: #009999; font-size: 18px; padding: 10px 15px; font-weight: bold; border-radius: 5px; font-family: "Noto Sans JP", "Noto Sans JP", "Noto Sans JP Variable", sans-serif; '
    );
  }, []);

  return null;
};
