import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@repo/ui/components/ui/accordion';

export default function VticketInstructions() {
  return (
    <Accordion type="single" collapsible className="w-full px-2">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-base font-semibold [&>svg]:h-7 [&>svg]:w-7">
          <p className="my-auto">V티켓 이용안내</p>
        </AccordionTrigger>
        <AccordionContent className="px-2">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              충전한 V티켓을 사용하여 라이브 방송 중 버스커에게 후원할 수
              있습니다.
            </li>
            <li>V티켓 구매 시 10%의 부가가치세가 부과됩니다.</li>
            <li>V티켓의 유효기간은 구매일로부터 5년입니다.</li>
            <li>결제 내역은 결제내역 메뉴에서 확인 가능합니다.</li>
            <li>
              1일 V티켓 결제 한도는 결제 수단별 정책에 따라 상이하며, 충전된
              V티켓을 활용한 1회 후원 한도는 300만 원입니다.
            </li>
            <li>
              V티켓 충전 및 사용내역은 V티켓 이용내역에서 확인할 수 있습니다.
            </li>
            <li>기타 V티켓 관련 문의는 고객센터를 이용해 주세요.</li>
            <li>후원에 이미 사용한 V티켓은 구매 취소 및 환불이 불가합니다.</li>
            <li>
              웹을 통해 결제한 V티켓은 구매 후 7일 이내에 전액을 사용하지 않은
              경우 내 페이지에서 직접 취소가 가능하며, 이외의 경우 고객센터를
              통해 환불이 가능합니다.
            </li>
            <li>
              단, 잔여 수량이 1,000개 이하이거나 서비스에서 탈퇴한 경우, 환불은
              불가합니다.
            </li>
            <li>
              인앱결제를 통해 구매한 V티켓에 대한 환불은 구매한 앱 마켓의 환불
              정책에 따릅니다.
            </li>
            <li>
              이미 후원에 사용한 V티켓을 앱 마켓을 통해 환불받을 경우, 사용한
              V티켓후원이 회수될 수 있습니다. 단, 후원 후 환불이 반복적이거나
              과도한 경우 치지직 서비스 이용이 일부 또는 전부 제한될 수
              있습니다.
            </li>
            <li>
              미성년자가 법정대리인 동의 없이 계약을 체결한 경우, 미성년자 또는
              법정대리인이 이를 취소할 수 있습니다.
            </li>
            <li>
              네이버 회원 탈퇴 시 보유한 잔여 V티켓에 대하여 환불을 신청할 수
              있고, 환불 신청 없이 탈퇴한 경우 회원 탈퇴가 완료된 이후에는
              V티켓의 복구 또는 환불이 불가능합니다.
            </li>
            <li>
              유료서비스 구매에 따른 자세한 내용은 Vybz 이용약관을 따릅니다.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
