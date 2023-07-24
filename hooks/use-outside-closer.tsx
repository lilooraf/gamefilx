import { useEffect } from "react"

export default function useOutsideCloser(
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (ref.current && (!ref.current.contains(event.target) && !(typeof event.target?.parentElement?.className === "string" ? event.target?.parentElement?.className : undefined)?.match("Toast"))) {
        callback()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])
}
