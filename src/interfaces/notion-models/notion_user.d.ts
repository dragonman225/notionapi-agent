import { Util } from "./"

/**
 * Describe a Notion user.
 */
export interface NotionUser {
  /** User ID. */
  id: Util.UUID
  version: number
  email: string
  given_name: string
  family_name: string
  /** URL of the photo. */
  profile_photo: string
  onboarding_completed: boolean
  mobile_onboarding_completed: boolean
  clipper_onboarding_completed: boolean
}