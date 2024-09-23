export interface ToggleSubscriptionResult {
  isFollowed?: boolean
  error?: string
}

export interface ProfileUser {
  id: string
  username: string
  total_followers: number
  avatar_file_exists: boolean
  isFollowed: boolean
  cover_file_exists: boolean
  coverUrl: string
  avatarUrl: string
}

export interface User {
  id: string
  username: string
  avatarUrl: string
  coverUrl: string
}

export interface UserProps {
  isCurrentUser: boolean
  profileUser: ProfileUser
  initialIsFollowed: boolean
  user: User
}

export interface ProfileUser {
  id: string
  cover_file_exists: boolean
}

export interface CoverProps {
  isCurrentUser: boolean
  profileUser: ProfileUser
}
