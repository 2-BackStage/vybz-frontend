"use client";

import React, { useState } from "react";
import Image from "next/image";
import PaymentButton from "./PaymentButton";

const TICKET_OPTIONS = [100, 500, 1000, 5000]; // 티켓 수량 옵션
const TICKET_UNIT_PRICE = 110; // 티켓당 가격 (원)

interface VticketChargeModalProps {
  onClose: () => void;
  userUuid: string;
}

export default function VticketChargeModal({ onClose, userUuid }: VticketChargeModalProps) {

    console.log("🧾 VticketChargeModal의 userUuid:", userUuid);

  const [selected, setSelected] = useState<number | null>(null);
  const [custom, setCustom] = useState<string>("");

  // 티켓 수 계산
  const ticketCount = selected !== null ? selected : Number(custom) > 0 ? Number(custom) : 0;

  // 최종 결제 금액 계산
  const finalAmount = ticketCount * TICKET_UNIT_PRICE;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-[95vw] max-w-md bg-[#1a2332] rounded-2xl p-0 flex flex-col items-center shadow-2xl">
        
        {/* 닫기 버튼 */}
        <button
          className="absolute right-4 top-4 text-white text-2xl focus:outline-none"
          onClick={onClose}
          aria-label="닫기"
        >
          ×
        </button>

        {/* 타이틀 */}
        <div className="w-full flex flex-col items-center pt-10 pb-2">
          <h2 className="text-2xl font-extrabold text-white mb-2">V-티켓 충전하기</h2>
        </div>

        {/* 내부 카드 */}
        <div className="w-[90%] bg-[#202b3c] rounded-xl border border-[#3a4660] px-4 py-6 flex flex-col items-center mb-6">
          
          {/* 충전할 V-티켓 */}
          <p className="text-lg text-gray-200 mb-3">충전할 V-티켓</p>
          <div className="flex items-center bg-[#232f45] rounded-lg px-8 py-2 mb-5 w-full justify-center">
            <Image src="/logo/vticket.png" alt="V티켓" width={32} height={32} />
            <span className="ml-3 text-2xl font-bold tracking-widest text-white">
              {ticketCount.toLocaleString()}
            </span>
          </div>

          {/* 티켓 수량 선택 */}
          <div className="grid grid-cols-2 gap-4 w-full mb-2">
            {TICKET_OPTIONS.map((option) => (
              <button
                key={option}
                className={`py-2 rounded-lg border text-lg font-semibold transition-all w-full ${
                  selected === option
                    ? "bg-[#232f45] border-blue-400 text-white"
                    : "bg-[#202b3c] border-[#3a4660] text-gray-200"
                }`}
                onClick={() => {
                  setSelected(option);
                  setCustom("");
                }}
              >
                {option.toLocaleString()}개
              </button>
            ))}
          </div>

          {/* 직접 입력 */}
          <input
            type="number"
            min={1}
            placeholder="원하는 티켓 수를 입력하세요"
            value={selected === null ? custom : ""}
            onChange={(e) => {
              setSelected(null);
              setCustom(e.target.value.replace(/^0+/, ""));
            }}
            className="w-full border border-[#3a4660] rounded-xl px-4 py-2 text-center text-sm mt-3 bg-[#232f45] text-white placeholder-gray-400"
          />
        </div>

        {/* 결제 금액 */}
        <div className="w-[90%] bg-[#202b3c] rounded-xl border border-[#3a4660] px-4 py-4 flex justify-between items-center mb-6">
          <span className="text-xl text-blue-400 font-semibold">최종 결제금액</span>
          <span className="text-2xl text-blue-400 font-bold">{finalAmount.toLocaleString()}원</span>
        </div>

        {/* 결제 버튼 */}
        <div className="w-[90%] mb-6">
          <PaymentButton
            amount={finalAmount}
            tickets={ticketCount}
            userUuid={userUuid}
          />
        </div>
      </div>
    </div>
  );
}
