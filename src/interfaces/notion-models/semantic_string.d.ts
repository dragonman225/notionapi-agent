import { Util } from "./"

/** 
 * TODO: Some collection-only structures not included.
 * 
 * This is what Notion uses to represent a rich text string. 
 * 
 * For example, an HTML string `<strong><em>Hello</em></strong>World` 
 * can be translated into
 * 
 * ```javascript
 * [
 *   ["Hello", [["b"], ["i"]]], // A SemanticString
 *   ["World"] // Another SemanticString
 * ]
 * ```
 */
export type SemanticString =
  SemanticString.BasicString | SemanticString.InlineMentionUser
  | SemanticString.InlineMentionPage | SemanticString.InlineMentionDate
  | SemanticString.InlineMath

export namespace SemanticString {

  /**
   * A structure to represent a reminder alarm before the start of 
   * {@link DateTime}.
   * 
   * e.g. `value` is `30`, `unit` is `minute` 
   * -> 30 minutes before.
   * 
   * e.g. `value` is `1`, `unit` is `day`, `time` is `09:00` 
   * -> 1 day before at 9 a.m.
   */
  export type Reminder = {
    value: number
    unit: "minute" | "hour" | "day" | "week"
    /** e.g. "09:00" */
    time?: string
  }

  /**
   * A structure to represent date and time.
   */
  export type DateTime = {
    type: "date" | "daterange" | "datetime" | "datetimerange"
    /** e.g. "2019-05-27" */
    start_date: string
    /** e.g. "2019-05-27" */
    end_date?: string
    /** e.g. "15:00" */
    start_time?: string
    /** e.g. "15:00" */
    end_time?: string
    reminder?: Reminder
    date_format: "relative" | "MM/DD/YYYY" | "MMM DD, YYYY"
    | "DD/MM/YYYY" | "YYYY/MM/DD"
    /** 12h ("h:mm A") or 24h ("H:mm") */
    time_format?: "h:mm A" | "H:mm"
    time_zone?: Util.TimeZone
  }

  export type Bold = ["b"]
  export type Italic = ["i"]
  export type Strike = ["s"]
  /** `string` is an URL. */
  export type Link = ["a", string]
  export type InlineCode = ["c"]
  /** Color or background color. */
  export type Colored = ["h", Util.NotionColor]
  export type Commented = ["m"]

  export type BasicStringFormatting =
    Bold | Italic | Strike | Link | InlineCode | Colored | Commented

  export type BasicString = [string, BasicStringFormatting[]?]

  /**
   * Mention an user by ID.  
   */
  export type InlineMentionUser = ["‣", [["u", Util.UUID]]]

  /**
   * Mention a page by ID.
   */
  export type InlineMentionPage = ["‣", [["p", Util.UUID]]]

  /**
   * Mention a date only or a date with reminder.
   */
  export type InlineMentionDate = ["‣", [["d", DateTime]]]

  /**
   * Inline math.
   */
  export type InlineMath = ["⁍", [["e", Util.Latex]]]

}