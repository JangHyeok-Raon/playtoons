import React, { useState, useCallback, useEffect } from "react";
import { getTimeline as getTimelineAPI } from "@API/timelineService";
import TimelineItems from "@COMPONENTS/timeline/TimelineItems";

const Timeline = () => {
  const [timelines, setTimelines] = useState([]);

  const getTimeline = useCallback(async () => {
    const response = await getTimelineAPI();
    if (response?.status === 200) {
      setTimelines(response.data?.timeline);
    }
  }, []);

  useEffect(() => {
    getTimeline();
  }, []);

  return (
    <div className="contents">
      <div className="wrap_timeline">
        <TimelineItems items={timelines.reverse()} />
      </div>
    </div>
  );
};

export default Timeline;
