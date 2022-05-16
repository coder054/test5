export interface ListCommentType {
  countComments: number
  data: CommentType[]
}

export interface CommentType {
  commentId: string
  content: string
  createdAt: number
  faceImage: string
  firstName: string
  isLiked: false
  lastName: string
  type: string
  updatedAt: number
  userId: string
  username: string
}
