import { webSocketManager } from '@shared/lib/websocket/webSocket';
import {
  WebSocketMessage,
  WebSocketMessageType,
} from '@shared/lib/websocket/webSocket.type';
import { useCallback, useEffect, useRef } from 'react';

type WebSocketHandler<T extends WebSocketMessage> = (data: T['data']) => void;

export function useWebSocketHandler<T extends WebSocketMessage>() {
  const handlersRef = useRef<Map<WebSocketMessageType, () => void>>(new Map());

  const registerHandler = useCallback(
    (type: WebSocketMessageType, handler: WebSocketHandler<T>) => {
      const existingUnregister = handlersRef.current.get(type);
      if (existingUnregister) {
        existingUnregister();
      }

      const unregister = webSocketManager.registerHandler(type, handler);
      handlersRef.current.set(type, unregister);

      return unregister;
    },
    [],
  );

  useEffect(() => {
    return () => {
      handlersRef.current.forEach((unregister) => {
        unregister();
      });
      handlersRef.current.clear();
    };
  }, []);

  return { registerHandler };
}
