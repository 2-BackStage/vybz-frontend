import InputBox from '@/components/common/InputBox';
import { BuskerSNSResponseType } from '@/types/ResponseDataTypes';

export default function SNSBox({
  SNSData,
}: {
  SNSData: BuskerSNSResponseType[] | [];
}) {
  const getSNSUrl = (snsType: string) => {
    const snsItem = SNSData.find(
      (item) =>
        item.snsUrl && item.snsUrl.toLowerCase().includes(snsType.toLowerCase())
    );
    return snsItem?.snsUrl || '';
  };

  return (
    <section className="space-y-4">
      <h3 className="block text-blue-300 text-lg font-semibold mb-2">
        SNS 링크
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {['instagram', 'youtube', 'tiktok', 'soundcloud'].map((snsType) => (
          <div key={snsType}>
            <InputBox
              id={snsType}
              label={snsType.charAt(0).toUpperCase() + snsType.slice(1)}
              placeholder={`${snsType.charAt(0).toUpperCase() + snsType.slice(1)} URL`}
              defaultValue={getSNSUrl(snsType)}
            />
            {SNSData.find((item) =>
              item.snsUrl.toLowerCase().includes(snsType.toLowerCase())
            ) && (
              <input
                type="hidden"
                name={`old_${snsType}`}
                value={
                  SNSData.find((item) =>
                    item.snsUrl.toLowerCase().includes(snsType.toLowerCase())
                  )?.snsUrl
                }
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
