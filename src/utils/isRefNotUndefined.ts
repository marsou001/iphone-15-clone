import { MutableRefObject } from "react";

function isRefNotUndefined<R>(
  elementRef: MutableRefObject<R | undefined>
): elementRef is MutableRefObject<R> {
  return elementRef.current !== undefined;
}

export default isRefNotUndefined;