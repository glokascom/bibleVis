export interface User {
  id: string
  username: string
  avatarUrl: string | null
  coverUrl: string
}

export interface ProfileUser extends User {
  total_followers: number
  avatar_file_path: boolean
  isFollowed: boolean
  cover_file_path: boolean
}

export interface Image {
  url_slug: string
  title: string
  imagePath: string
}
export interface Creator extends ProfileUser {
  images: Image[]
}
export interface UserInfoProps {
  isCurrentUser: boolean
  profileUser: ProfileUser
  initialIsFollowed: boolean
  user: User
  bordered?: boolean
}

export interface ProfileUserCover extends User {
  cover_file_exists: boolean
}

export interface CoverProps {
  isCurrentUser: boolean
  profileUser: ProfileUserCover
}
