import { UUID, NotionColor, TimeZone } from "./util"

/** 
 * A structure to represent a reminder alarm before the start of 
 * {@link DateTime}.
 * 
 * e.g. `value` is `30`, `unit` is `minute` 
 * -> 30 minutes before.
 * 
 * e.g. `value` is `1`, `unit` is `day`, `time` is `09:00` 
 * -> 1 day before at 9 a.m.
 * 
 * @category Notion Semantic String
 */
export type Reminder = {
  value: number
  unit: "minute" | "hour" | "day" | "week"
  /** e.g. "09:00" */
  time?: string
}

/**
 * A structure to represent date and time.
 * 
 * @category Notion Semantic String
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
  time_zone?: TimeZone
}

/**
 * @category Notion Semantic String
 */
export type Bold = ["b"]

/**
 * @category Notion Semantic String
 */
export type Italic = ["i"]

/**
 * @category Notion Semantic String
 */
export type Strike = ["s"]

/**
 * `string` is an URL.
 *
 * @category Notion Semantic String 
 */
export type Link = ["a", string]

/**
 * @category Notion Semantic String
 */
export type InlineCode = ["c"]

/**
 * Color or background color.
 * 
 * @category Notion Semantic String
 */
export type Colored = ["h", NotionColor]

/**
 * @category Notion Semantic String
 */
export type Commented = ["m"]

/**
 * @category Notion Semantic String
 */
export type BasicStringFormatting =
  Bold | Italic | Strike | Link | InlineCode | Colored | Commented

/**
 * @category Notion Semantic String
 */
export type BasicString = [string, BasicStringFormatting[]?]

/**
 * Mention an user by ID.
 * 
 * @category Notion Semantic String
 */
export type InlineMentionUser = ["‣", [["u", UUID]]]

/**
 * Mention a page by ID.
 * 
 * @category Notion Semantic String
 */
export type InlineMentionPage = ["‣", [["p", UUID]]]

/**
 * Mention a date only or a date with reminder.
 * 
 * @category Notion Semantic String
 */
export type InlineMentionDate = ["‣", [["d", DateTime]]]

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
 * 
 * @category Notion Semantic String
 */
export type SemanticString =
  BasicString | InlineMentionUser | InlineMentionPage | InlineMentionDate