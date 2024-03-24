import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";
import { useCountdown, useLocalStorage } from "usehooks-ts";

type TCountdownOptions = {
  /**
   * Countdown name that will be used to store countdown time in localStorage
   */
  name: string;
  /**
   * Countdown time in minutes
   * @default 2
   */
  minutes?: number;
  /**
   * Countdown interval in milliseconds
   * @default 1000
   */
  intervalMs?: number;
  /**
   * Skip countdown time stored in localStorage
   * @default false
   */
  skipStoredTime?: boolean;
};

type TCountdownReturn = {
  /**
   * Is countdown started
   */
  isCounting: boolean;
  /**
   * Is countdown initialized. This flag is used to prevent ssr hydration
   */
  isReady: boolean;
  /**
   * Countdown time in seconds
   */
  count: number;
  /**
   * Countdown time in format "mm:ss"
   */
  time: string;
  /**
   * Callback function to start countdown
   */
  startCountdown: () => void;
  /**
   * Callback function to reset countdown
   */
  resetCountdown: () => void;
};

export const useStorageCountdown = (
  options: TCountdownOptions
): TCountdownReturn => {
  const {
    name,
    minutes = 2,
    intervalMs = 1000,
    skipStoredTime = false,
  } = options;

  const [deadlineDate, setDeadlineDate] = useLocalStorage<number | null>(
    name,
    null
  );

  const [isCounting, setIsCounting] = useState<boolean>(true);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [countStart, setCountStart] = useState<number>(minutes * 60);

  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart,
    intervalMs,
  });

  const start = () => {
    const deadline = Date.now() + minutes * 60 * 1000;
    setDeadlineDate(deadline);
    setCountStart(minutes * 60);
    setIsCounting(true);
  };

  const reset = () => {
    setDeadlineDate(null);
    setCountStart(0);
    setIsCounting(false);
    resetCountdown();
  };

  /**
   * `useCountdown` hook is not detecting countStart change so we need to start countdown manually
   */
  useEffect(() => {
    if (isCounting && countStart > 0) {
      resetCountdown();
      startCountdown();
    }
  }, [countStart, isCounting, startCountdown]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (count === 0) {
      setCountStart(0);
      setDeadlineDate(null);
      setIsCounting(false);
      resetCountdown();
    }
  }, [count]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Start countdown if deadlineDate is exist and not expired
    if (deadlineDate && deadlineDate > Date.now() && !skipStoredTime) {
      setCountStart(differenceInSeconds(deadlineDate, Date.now()));
      setIsCounting(true);
    }
    // Remove deadlineDate if expired
    if (deadlineDate && deadlineDate < Date.now()) {
      setIsCounting(false);
      setDeadlineDate(null);
      setCountStart(0);
      resetCountdown();
    }
    if (!deadlineDate) {
      setIsCounting(false);
      setCountStart(0);
      resetCountdown();
    }
    setIsReady(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    isCounting,
    isReady,
    count,
    time: `${Math.floor(count / 60)}:${
      count % 60 < 10 ? `0${count % 60}` : count % 60
    }`,
    startCountdown: start,
    resetCountdown: reset,
  };
};
