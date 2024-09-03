export interface ToggleSubscriptionResult {
  isFollowed?: boolean
  error?: string
}

export interface FollowUserInfo {
  id: string
  username: string
  total_followers: number
  avatar_file_exists: boolean
  isFollowed: boolean
  cover_file_exists: boolean
  coverUrl: string
  avatarUrl: string
}

export interface UserInfo {
  id: string
  username: string
  avatarUrl: string
  coverUrl: string
}

export interface UserInfoProps {
  isCurrentUser: boolean
  followUserInfo: FollowUserInfo
  initialIsFollowed: boolean
  userInfo: UserInfo
}

export interface FollowUserInfo {
  id: string
  cover_file_exists: boolean
}

export interface CoverProps {
  isCurrentUser: boolean
  followUserInfo: FollowUserInfo
}