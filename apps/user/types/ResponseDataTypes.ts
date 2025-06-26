export type CommonResponseType<T> = {
  httpStatus: string;
  isSuccess: boolean;
  message: string;
  code: number;
  result: T;
};

export type UserDataType = {
  accessToken: string;
  refreshToken: string;
  name: string;
  userUuid: string;
};

export type LoginArticleDataType = {
  title: string;
  views: string;
  description: string;
  hashtags: string[];
  cta: string;
};

export type VideoCarouselDataType = {
  id: string;
  videoSrc: string;
  thumbnailSrc: string;
};

export type CategoryDataType = {
  id: string;
  name: string;
};

export type LiveFreeViewType = {
  id: string;
  buskerId: string;
  buskerName: string;
  liveName: string;
  buskerProfileImage: string;
  isMembership: boolean;
  viewerCount?: number;
};

export type ProfileDataType = {
  id: string;
  nickname: string;
  introduction: string;
  profileImage: string;
};

export type SearchResult = {
  id: number;
  title: string;
  buskerName: string;
  buskerUrl: string;
};

export type RecentSearchItem = {
  id: number;
  title: string;
};

export type SubscriptionType = {
  id: string;
  name: string;
  months: number;
  avatarUrl: string;
  subscribedSince: string;
};

export type BuskerLiveDataType = {
  buskerId: string;
  buskerName: string;
  liveLikeCount: number;
  liveName: string;
  buskerProfileImage: string;
  liveViews: number;
};

export type ReelsUrlDataType = {
  realsId: string;
  realsUrl: string;
  realsThumbnailUrl: string;
  realsDescription: string;
  realsLikeCount: number;
  realsCommentCount: number;
  buskerId: string;
  buskerName: string;
  buskerProfileImage: string;
};

export type CommentDataType = {
  id: number;
  username: string;
  avatarUrl: string;
  text: string;
  timeAgo: string;
  likes: number;
};

export type FanFeedDataType = {
  id: string;
  buskerName: string;
  buskerProfileImage: string;
  timeAgo: string;
  content?: string;
  imageSrcList?: string[];
  likesCount: number;
  commentsCount: number;
};

export type FollowingDataType = {
  buskerUuid: string;
  nickname: string;
  profileImageUrl: string;
};

export type FollowingsResponseDataType = {
  content: FollowingDataType[];
  nextCursor: string | null;
  hasNext: boolean;
  pageSize: number;
  page: number;
};

export type UserInfoDataType = {
  nickname: string;
  profileImageUrl: string;
  followingCount: number;
  subscribeCount: number;
  vticketCount: number;
}

export interface OtherUserDataType extends UserInfoDataType {
  buskerName: string;
  buskerProfileImage: string;
  createdAt: string;
}


export type PurchaseHistoryDataType = {
  id: string;
  date: string;
  vticketCount: number;
  amount: number;
}

export type UseHistoryDataType = {
  id: string;
  date: string;
  vticketCount: number;
  buskerName: string;
  buskerProfileImage: string;
  buskerUuid: string;
  message: string;
}

export type HistoryDataType = {
 type: 'purchase' | 'use';
 data: PurchaseHistoryDataType[] | UseHistoryDataType[];
 page: number;
 totalPages: number;
}

export type NotificationDataType = {
  id: string;
  date: string;
  buskerName: string;
  buskerProfileImage: string;
  buskerUuid: string;
  feedId: string;
  message: string;
}

export type ChatListType = {
  chatId: string;
  buskerName: string;
  buskerProfileImage: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export type ChatListDataType = {
 data: ChatListType[] | [];
 page: number;
 totalPages: number;
}

export type ChatMessageType = {
  id: string;
  senderUuid: string;
  messageType: 'TEXT' | 'VIDEO' | 'IMAGE';
  content: string;
  read: boolean;
  sentAt: string;
}

export type ChatMessageListType = {
  content: ChatMessageType[];
  nextCursor: string | null;
  hasNext: boolean;
  pageSize: number;
};