import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Body4, Body6 } from "@/styledMixins";

const ResetComponent = () => {
  return (
    <ResetBtn>
      <TextLabel>再転送</TextLabel>
    </ResetBtn>
  );
};

/**
 *
 * @param {number} countSec 타이머 설정할 제한시간 초
 * @returns
 */
const Timer = ({ countSec }) => {
  const [sec, setSec] = useState(countSec);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (sec > 0) {
        setSec(sec - 1);
      }
      if (sec === 0) {
        clearInterval(countdown);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [sec]);

  return (
    <TimerDiv>
      <SecondsDiv>残り{sec}秒</SecondsDiv>
      <ResetComponent />
    </TimerDiv>
  );
};

const TimerDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SecondsDiv = styled.div`
  ${Body6}
  min-height: 16px;
  min-width: 66px;
  color: var(--tiara);
  line-height: 16px;
  white-space: nowrap;
`;

const ResetBtn = styled.div`
  height: 32px;
  margin-left: 5px;
  display: flex;
  padding: 0 9px;
  justify-content: flex-end;
  align-items: center;
  min-width: 69px;
  background-color: var(--mercury);
  border-radius: 16px;
  opacity: 0.6;
`;

const TextLabel = styled.div`
  ${Body4}
  min-height: 16px;
  min-width: 48px;
  font-weight: 700;
  color: var(--manatee);
  line-height: 16px;
  white-space: nowrap;
`;

export default Timer;
