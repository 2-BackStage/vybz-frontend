'use server'

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { instance } from "@/utils/requestHandler";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData):Promise<void> {
  const userUuid = (await getServerSession(options))?.user?.userUuid || ''
  const nickname = formData.get('nickname') as string
  const profileImageUrl = formData.get('profileImageUrl') as string

  const res = await instance.put('/user-info-service/api/v1/user', {
    body: JSON.stringify({
      userUuid,
      profileImageUrl,
      nickname,
    }),
    requireAuth: true,
    revalidate: false,
    isMultipart: true,
  })

  if (!res.isSuccess) {
    throw new Error(`업데이트 실패: ${res.message}`)
  }

  redirect('/mypage')
}
