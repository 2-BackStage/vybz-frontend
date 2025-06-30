"use client";
import { CommonResponseType, PaymentResponseDataType } from "@/types/ResponseDataTypes";
import React from "react";

interface PaymentButtonProps {
  amount: number;
  tickets: number;
  userUuid: string;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ amount, tickets, userUuid }) => {

   console.log("✅ 전달된 userUuid:", userUuid); // 👉 확인용
   
  const handleClick = async () => {
    const res = await fetch("https://back.vybz.kr/payment-service/api/v1/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userUuid,
        orderName: `v-티켓 ${tickets.toLocaleString()}개`,
        amount,
        method: "카드",
        paymentType: "CHARGE", 
      }),
    });

    const data: CommonResponseType<PaymentResponseDataType> = await res.json();

    const checkoutUrl = data?.result?.checkoutUrl;

    if (!checkoutUrl) {
      alert("결제 페이지 이동에 실패했습니다.");
      return;
    }

    window.location.href = checkoutUrl;
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-[#56aaff] hover:bg-[#3996e6] text-white text-xl font-bold py-3 rounded-xl mb-8 transition-all"
    >
      결제하기
    </button>
  );
};

export default PaymentButton;