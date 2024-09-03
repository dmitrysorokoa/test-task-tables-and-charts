import { useEffect, useState } from "react"

const useDimension = (ref: React.RefObject<HTMLElement>, data: any) => {
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (ref.current) {
      setDimension({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
      });
    }
  }, [data]);

  return dimension
}

export default useDimension;
