import { useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export const useNetwork = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const [netInfo, setNetInfo] = useState<NetInfoState | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setNetInfo(state);
    });

    // Fetch initial state
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
      setNetInfo(state);
    });

    return () => unsubscribe();
  }, []);

  return {
    isConnected,
    isWifi: netInfo?.type === 'wifi',
    isCellular: netInfo?.type === 'cellular',
    netInfo,
  };
};