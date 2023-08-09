import { createContext } from 'react';

export const commonDefaultValues = {
  isMobile: true,
  staticNextHost: process.env.NEXT_PUBLIC_IMAGE_HOST,
  baseUrl: process.env.BASE_URL
}

const CommonContext = createContext(commonDefaultValues)

export default CommonContext