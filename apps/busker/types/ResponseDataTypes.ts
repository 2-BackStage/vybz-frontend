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

export type CategoryDataType = {
  id: number;
  name: string;
};

export type BuskerDataType = {
  name: string;
  genre: number[];
  description: string;
  profileImage: string;
};

export type BuskerInfoReadResponseType = {
  nickname: string;
  profileImageUrl: string;
  introduction: string;
  followerCount: number;
  displayFollowerCount: string;
  subscribedCount: number;
};

export type BuskerCategoryResponseType = {
  buskerUuid: string;
  categoryId: number;
}

export type BuskerSNSResponseType = {
  buskerUuid: string;
  snsUrl: string;
}

export type BuskerUpdateProfileRequestType = {
  buskerUuid: string;
  profileImageUrl?: string;
  nickname: string;
  introduction: string;
}

export type BuskerUpdateSNSRequestType = {
  buskerUuid: string;
  oldSnsUrl?: string;
  snsUrl: string;
}

export type BuskerUpdateProfileResponseType = {
  buskerUuid: string;
  profileImageUrl: string;
  nickname: string;
  introduction: string;
}

export type BuskerUpdateSNSResponseType = {
  buskerUuid: string;
  oldSnsUrl?: string;
  newSnsUrl: string;
}
