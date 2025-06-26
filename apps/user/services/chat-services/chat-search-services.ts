'use server';

import { FollowingDataType } from "@/types/ResponseDataTypes";
import { InitialChatSearchData } from "@/data/chatData";

export async function getSearchResults(query: string): Promise<FollowingDataType[] | []> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (!query) return InitialChatSearchData;
    return InitialChatSearchData.slice(0, 1);   
}