import { UUID } from "./common"

/** TODO: Unfinished */
export interface Date {
  type: "date" | "daterange"
  /** e.g. "2019-05-27" */
  start_date: string
  /** e.g. "2019-05-27" */
  end_date?: string
  date_format: "relative"
}

export type StringColor =
  "gray" | "brown" | "orange" | "yellow" | "teal" | "blue" | "purple"
  | "pink" | "red" | "gray_background" | "brown_background"
  | "orange_background" | "yellow_background" | "teal_background"
  | "blue_background" | "purple_background" | "pink_background"
  | "red_background"

export type Bold = ["b"]
export type Italic = ["i"]
export type Strike = ["s"]
/** `string` is an URL. */
export type Link = ["a", string]
export type InlineCode = ["c"]
/** Color or background color. */
export type Color = ["h", StringColor]
export type Commented = ["m"]

export type BasicStringOption =
  Bold | Italic | Strike | Link | InlineCode | Color | Commented

export type BasicString = [string, BasicStringOption[]?]
/** `UUID` is an user ID. */
export type InlineMentionUser = ["‣", [["u", UUID]]]
/** `UUID` is a page ID. */
export type InlineMentionPage = ["‣", [["p", UUID]]]
export type InlineMentionDate = ["‣", [["d", Date]]]

export type SemanticString =
  BasicString | InlineMentionUser | InlineMentionPage | InlineMentionDate