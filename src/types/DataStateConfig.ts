import {PreventType} from "./PreventType";

export interface DataStateConfig {
  onlyProps?: string[]
  preventProps?: string[]
  preventTypes?: PreventType[]
  recursiveOnlyProps?: boolean
  recursivePreventProps?: boolean
  dateFormat?: string
}
