import { Button } from "@repo/ui/components/ui/button";

export function SNSLinkBox() {
  return (
    <div>
      <h3 className="text-blue-300 font-semibold mb-3 text-lg">
        SNS
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <Button
          size="sm"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        >
          Instagram
        </Button>
        <Button
          size="sm"
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          YouTube
        </Button>
        <Button
          size="sm"
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          TikTok
        </Button>
        <Button
          size="sm"
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          SoundCloud
        </Button>
      </div>
    </div>
  );
}
