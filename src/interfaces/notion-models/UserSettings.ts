import { UUID, Timestamp, TimeZone } from "./common/util"

export interface UserSettings {
  /** User ID. */
  id: UUID
  version: number
  settings: {
    /** Two-letter code, maybe ISO 639-1 ? */
    locale: string
    /** e.g. `entrepreneur` */
    persona: string
    /** e.g. `personal_notes_to_dos` */
    use_case: string
    time_zone: TimeZone
    /** e.g. `personal_notes_to_dos` */
    user_case: string
    signup_time: Timestamp
    used_android_app: boolean
    /** e.g. `0` */
    start_day_of_week: number
    used_mobile_web_app: boolean
    used_desktop_web_app: boolean
  }
}