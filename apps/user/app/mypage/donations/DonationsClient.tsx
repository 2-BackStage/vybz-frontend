'use client';

import { useState, useEffect, useCallback } from 'react';
import TabButtonBox from '@/components/common/button/TabButtonBox';
import HistoryList from '@/components/donations/HistoryList';
import { fetchPaymentHistory } from '@/services/payment-services/payment-services';
import { fetchDonationHistory } from '@/services/support-services/support-services';
import { HistoryDataType } from '@/types/ResponseDataTypes';

interface DonationsClientProps {
  userUuid: string;
}

export default function DonationsClient({ userUuid }: DonationsClientProps) {
  const [activeTab, setActiveTab] = useState(0); 
  const [historyData, setHistoryData] = useState<HistoryDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useCallback(async (page: number = 1) => {
    if (!userUuid) return;
    
    setLoading(true);
    try {
      if (activeTab === 0) {
        // 사용 내역
        const response = await fetchDonationHistory(userUuid, page, 10);
        const formattedData: HistoryDataType = {
          type: 'use',
          data: response.dtoList,
          page: response.current,
          size: response.requestPageDTO.size,
          totalCount: response.totalCount,
          totalPages: response.totalPage,
          pageNumList: response.pageNumList,
          prev: response.prev,
          next: response.next,
          prevPage: response.prevPage,
          nextPage: response.nextPage,
          currentPage: response.current
        };
        setHistoryData(formattedData);
      } else {
        // 구매 내역
        const response = await fetchPaymentHistory(userUuid, page, 10);
        const formattedData: HistoryDataType = {
          type: 'purchase',
          data: response.dtoList,
          page: response.current,
          size: response.requestPageDTO.size,
          totalCount: response.totalCount,
          totalPages: response.totalPage,
          pageNumList: response.pageNumList,
          prev: response.prev,
          next: response.next,
          prevPage: response.prevPage,
          nextPage: response.nextPage,
          currentPage: response.current
        };
        setHistoryData(formattedData);
      }
    } catch (error) {
      console.error('데이터 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  }, [userUuid, activeTab]);

  useEffect(() => {
    if (userUuid) {
      fetchData(currentPage);
    }
  }, [userUuid, activeTab, currentPage, fetchData]);

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
    setCurrentPage(1); // 탭 변경 시 첫 페이지로 리셋
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <>
        <TabButtonBox labels={['사용 내역', '구매 내역']} />
        <div className="flex justify-center items-center h-40">
          <div className="text-lg">로딩 중...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <TabButtonBox 
        labels={['사용 내역', '구매 내역']} 
        activeTab={activeTab}
        onTabChange={(tab) => handleTabChange(typeof tab === 'number' ? tab : 0)}
      />
      {historyData && (
        <HistoryList 
          historyData={historyData}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
} 