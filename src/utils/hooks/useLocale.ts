import { useMemo } from 'react'
import { useRouter } from "next/router";

const useLocale = (context: common.LocalType) => {
  const router = useRouter();
  return useMemo(() => {
    return context[router.locale as string];
  }, [router.locale])
}

export default useLocale
