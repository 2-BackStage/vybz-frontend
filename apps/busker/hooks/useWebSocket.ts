'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Client, StompSubscription } from '@stomp/stompjs';

interface WebSocketMessage {
  senderUuid: string;
  content: string;
}

interface ReceivedMessage extends WebSocketMessage {
  id: string;
  timestamp: string;
}

interface UseWebSocketProps {
  liveId: string;
  userUuid: string;
  domain?: string;
  onMessageReceived?: (message: ReceivedMessage) => void;
}

interface UseWebSocketReturn {
  isConnected: boolean;
  isConnecting: boolean;
  sendMessage: (content: string) => void;
  messages: ReceivedMessage[];
}

export function useWebSocket({
  liveId,
  userUuid,
  domain = 'localhost:8080',
  onMessageReceived
}: UseWebSocketProps): UseWebSocketReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState<ReceivedMessage[]>([]);
  
  const clientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<StompSubscription | null>(null);
  const userUuidRef = useRef<string>(userUuid);

  useEffect(() => {
    userUuidRef.current = userUuid;
  }, [userUuid]);

  const connect = useCallback(() => {
    if (clientRef.current?.connected) return;

    setIsConnecting(true);
    
    const client = new Client({
      brokerURL: `ws://${domain}/chat-service/ws/live-chat?liveId=${liveId}`,
      connectHeaders: {
      },
      debug: (str) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('STOMP Debug:', str);
        }
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('WebSocket 연결됨');
        setIsConnected(true);
        setIsConnecting(false);
        
        if (client.connected) {
          subscriptionRef.current = client.subscribe(
            `/topic/live-chat/${liveId}`,
            (message) => {
              try {
                const receivedMessage: ReceivedMessage = JSON.parse(message.body);
                console.log('메시지 받음:', receivedMessage);
                
                setMessages(prev => [...prev, receivedMessage]);
                
                if (onMessageReceived) {
                  onMessageReceived(receivedMessage);
                }
              } catch (error) {
                console.error('메시지 파싱 오류:', error);
              }
            }
          );
        }
      },
      onStompError: (frame) => {
        console.error('STOMP 오류:', frame.headers['message']);
        console.error('상세:', frame.body);
        setIsConnected(false);
        setIsConnecting(false);
      },
      onWebSocketError: (error) => {
        console.error('WebSocket 오류:', error);
        setIsConnected(false);
        setIsConnecting(false);
      },
      onDisconnect: () => {
        console.log('WebSocket 연결 해제됨');
        setIsConnected(false);
        setIsConnecting(false);
      }
    });

    clientRef.current = client;
    client.activate();
  }, [liveId, domain, onMessageReceived]);

  // 연결 해제 함수
  const disconnect = useCallback(() => {
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }
    
    if (clientRef.current) {
      clientRef.current.deactivate();
      clientRef.current = null;
    }
    
    setIsConnected(false);
    setIsConnecting(false);
  }, []);

  // 메시지 전송 함수
  const sendMessage = useCallback((content: string) => {
    if (!clientRef.current?.connected || !content.trim()) {
      console.warn('WebSocket이 연결되지 않았거나 메시지가 비어있습니다');
      return;
    }

    const message: WebSocketMessage = {
      senderUuid: userUuidRef.current,
      content: content.trim()
    };

    try {
      clientRef.current.publish({
        destination: '/app/live-chat/sendMessage',
        body: JSON.stringify(message)
      });
      console.log('메시지 전송됨:', message);
    } catch (error) {
      console.error('메시지 전송 오류:', error);
    }
  }, []);

  // 컴포넌트 마운트 시 연결
  useEffect(() => {
    if (liveId && userUuid) {
      connect();
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      disconnect();
    };
  }, [liveId, userUuid, connect, disconnect]);

  return {
    isConnected,
    isConnecting,
    sendMessage,
    messages
  };
}