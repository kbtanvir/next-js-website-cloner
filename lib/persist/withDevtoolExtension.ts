/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { withDevTools } from "@poly-state/poly-state"

export function withDevToolsExtention(store:any, identifier: string) {
  if (
    typeof window !== "undefined" &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]
  ) {
    withDevTools(store, identifier)
  }
}
