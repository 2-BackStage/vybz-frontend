'use client';

import Hls from 'hls.js';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLiveDetail, getCategoryList } from '../../api/liveServiceApi';
import type { Live, Category } from '../../api/liveServiceApi';

interface LiveVideoPlayerProps {
  streamKey: string;
  userUuid?: string;
  userAccessToken?: string;
  buskerUuid?: string;
  isHost?: boolean;
  className?: string;
  onStreamEnd?: () => void;
  onError?: (error: string) => void;
}

export default function LiveVideoPlayer({
  streamKey,
  userUuid,
  userAccessToken,
  buskerUuid,
  isHost = false,
  className = '',
  onStreamEnd,
  onError,
}: LiveVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const router = useRouter();

  const [isEnded, setIsEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [live, setLive] = useState<Live | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 라이브 정보 가져오기
  useEffect(() => {
    if (!streamKey) {
      console.warn('스트림 키가 없습니다');
      return;
    }
    
    if (!userUuid || !userAccessToken) {
      console.warn('사용자 인증 정보가 없습니다. 일부 기능이 제한될 수 있습니다.');
      // 인증 정보 없이도 비디오 플레이어 자체는 사용 가능
      return;
    }

    const fetchData = async () => {
      try {
        console.log('라이브 정보 가져오기 시도:', { streamKey, userUuid });
        
        // 각 API 호출을 개별적으로 처리하여 하나가 실패해도 다른 하나는 실행되게 함
        try {
          const liveDetail = await getLiveDetail(streamKey, userUuid, userAccessToken);
          setLive(liveDetail.live);
          console.log('라이브 정보 가져오기 성공:', liveDetail);
        } catch (liveError) {
          console.error('라이브 정보 가져오기 실패:', liveError);
        }
        
        try {
          const categoryList = await getCategoryList(userAccessToken, userUuid);
          setCategories(categoryList.result);
          console.log('카테고리 리스트 가져오기 성공:', categoryList.result.length);
        } catch (categoryError) {
          console.error('카테고리 리스트 가져오기 실패:', categoryError);
        }
      } catch (error) {
        console.error('라이브 정보 가져오기 실패:', error);
        const errorMessage = '라이브 정보를 가져올 수 없습니다. 하지만 스트림은 계속 재생됩니다.';
        setError(null); // 스트림은 계속 보여주기 위해 오류 표시 안 함
        onError?.(errorMessage);
      }
    };

    fetchData();
  }, [streamKey, userUuid, userAccessToken, onError]);

  // WebSocket 연결
  useEffect(() => {
    if (!streamKey) return;

    const connectWebSocket = () => {
      const token = userAccessToken;
      if (!token) {
        console.error('❌ WebSocket 연결 실패: 토큰이 없습니다');
        return;
      }

      const wsUrl = `wss://back.vybz.kr/ws-live/viewer?streamKey=${streamKey}&token=${token}`;
      console.log('WebSocket 연결 중:', wsUrl);

      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        console.log('✅ WebSocket 연결 성공!');
      };

      ws.onerror = (error) => {
        console.error('❌ WebSocket 연결 에러:', error);
      };

      ws.onclose = (event) => {
        console.log('🔌 WebSocket 연결 종료:', event.code, event.reason);
      };

      ws.onmessage = (e) => {
        console.log('📨 WebSocket 메시지 수신:', e.data);
        if (e.data === '스트림이 종료되었습니다.') {
          setIsEnded(true);
          onStreamEnd?.();
        }
      };
    };

    // 1초 지연 후 WebSocket 연결 시도
    const timeoutId = setTimeout(connectWebSocket, 1000);

    return () => {
      clearTimeout(timeoutId);
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [streamKey, userAccessToken, onStreamEnd]);

  // HLS 스트림 설정
  useEffect(() => {
    if (!streamKey || !videoRef.current) return;

    // 환경 변수에서 HLS 서버 URL을 가져오거나 기본값 사용
    const HLS_SERVER = process.env.NEXT_PUBLIC_HLS_SERVER || 'https://back.vybz.kr';
    const streamUrl = `${HLS_SERVER}/hls/${streamKey}.m3u8`;
    console.log('HLS 스트림 URL:', streamUrl);
    const video = videoRef.current;
    let hls: Hls;

    const setupHls = () => {
      if (Hls.isSupported()) {
        hls = new Hls({
          maxBufferLength: 30,
          maxMaxBufferLength: 60,
          fragLoadingTimeOut: 60000,
        });
        hls.loadSource(streamUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsLoading(false);
          video.play().catch((error) => {
            console.error('자동 재생 실패:', error);
          });
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
          console.error('HLS 에러:', data);
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.log('네트워크 에러, 재연결 시도 중...');
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log('미디어 에러, 복구 시도 중...');
                hls.recoverMediaError();
                break;
              default:
                console.error('복구 불가능한 에러, 플레이어를 초기화합니다.');
                hls.destroy();
                setupHls();
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // iOS Safari에서는 네이티브 HLS 재생 사용
        video.src = streamUrl;
        video.addEventListener('loadedmetadata', () => {
          setIsLoading(false);
          video.play().catch((error) => {
            console.error('자동 재생 실패:', error);
          });
        });
      }
    };

    // 재시도 횟수 확인을 위한 로컬 변수
    let retryCount = 0;
    const MAX_RETRIES = 5;
    
    const tryLoad = () => {
      if (retryCount >= MAX_RETRIES) {
        console.error(`최대 재시도 횟수(${MAX_RETRIES}회) 도달. 스트림 로드 실패`);
        setIsLoading(false);
        setError(`스트림을 로드할 수 없습니다. 재접속하거나 나중에 다시 시도해 주세요.`);
        return;
      }

      retryCount++;
      console.log(`스트림 로드 시도 ${retryCount}/${MAX_RETRIES}:`, streamUrl);

      fetch(streamUrl)
        .then((res) => {
          if (res.ok) {
            console.log('✅ 스트림 마니페스트 발견!');
            setupHls();
          } else {
            console.warn(`❌ 스트림 로드 실패 (${res.status}): ${res.statusText}, 재시도 중...`);
            setTimeout(tryLoad, 2000); // 더 긴 재시도 간격
          }
        })
        .catch((err) => {
          console.error(`❌ 스트림 서버 연결 실패:`, err.message || err);
          setTimeout(tryLoad, 2000); // 더 긴 재시도 간격
        });
    };

    tryLoad();

    return () => {
      if (hls) {
        hls.destroy();
      }
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
    };
  }, [streamKey]);

  // 스트림 종료 시 비디오 정리
  useEffect(() => {
    if (isEnded && videoRef.current) {
      const video = videoRef.current;
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
  }, [isEnded]);

  // 방송 종료 핸들러
  const handleEnd = async () => {
    if (!buskerUuid) return;

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_LIVE_API_URL}/end?streamKey=${streamKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Busker-Id': buskerUuid,
          },
        }
      );
      socketRef.current?.close();
      setIsEnded(true);
      onStreamEnd?.();
    } catch (error) {
      console.error('방송 종료 실패:', error);
      onError?.('방송 종료에 실패했습니다.');
    }
  };

  // 나가기 핸들러
  const handleExit = async () => {
    if (!userUuid) return;

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_LIVE_API_URL}/exit?streamKey=${streamKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-User-Id': userUuid,
          },
        }
      );
      socketRef.current?.close();
      router.push('/');
    } catch (error) {
      console.error('나가기 실패:', error);
      onError?.('나가기에 실패했습니다.');
    }
  };

  // 카테고리 이름 찾기
  const categoryName =
    live && categories.length > 0
      ? categories.find((cat) => cat.id === live.categoryId)?.name
      : undefined;

  if (error) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-black text-white ${className}`}
      >
        <div className="text-red-400 font-bold text-xl mb-4">⚠️ 오류 발생</div>
        <div className="text-gray-300">{error}</div>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col bg-black text-white ${className}`}>
      {/* 라이브 정보 헤더 */}
      <div className="p-4 bg-gray-900">
        <h2 className="text-xl mb-2">
          {isLoading
            ? '방송 정보 불러오는 중...'
            : live
              ? `📺 ${live.title} (시청자 ${live.viewerCount}명)`
              : '방송 정보를 찾을 수 없습니다.'}
        </h2>
        {live && (
          <div className="text-gray-300 text-sm">
            <span>호스트: {live.buskerUuid}</span>
            {categoryName && (
              <span className="ml-2">카테고리: {categoryName}</span>
            )}
          </div>
        )}
      </div>

      {/* 비디오 플레이어 */}
      <div className="relative flex-1">
        {isEnded ? (
          <div className="flex items-center justify-center h-64 bg-gray-800">
            <div className="text-red-400 font-bold text-2xl">
              🛑 방송이 종료되었습니다
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              controls
              autoPlay
              className="w-full h-full object-contain bg-black"
              playsInline
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-white text-lg">로딩 중...</div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 컨트롤 버튼 */}
      <div className="p-4 bg-gray-900 flex justify-between items-center">
        {isHost && !isLoading && !isEnded && (
          <button
            onClick={handleEnd}
            className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded text-white font-semibold transition-colors"
          >
            🛑 방송 종료
          </button>
        )}
        {!isHost && !isEnded && (
          <button
            onClick={handleExit}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors ml-auto"
          >
            ❌ 나가기
          </button>
        )}
      </div>
    </div>
  );
}
