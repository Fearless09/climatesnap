"use client";

import { getDate } from "@/utils/utils";
import { useMemo, useState } from "react";

const page = () => {
  const [data, setData] = useState({
    timeStamp: 0,
    timezoneOffset: 0,
  });

  const onChange = (key: keyof typeof data, val: string) => {
    setData((prev) => ({ ...prev, [key]: val }));
  };

  const result = useMemo(() => {
    const timestamp = parseInt(data.timeStamp.toString());
    const timeZone = parseInt(data.timezoneOffset.toString());

    // if (isNaN(timestamp) || isNaN(timeZone)) return "Not Valid";

    return getDate(timestamp | 0, timeZone | 0)
      .toISOString()
      .replace("T", " ")
      .slice(0, 19);
  }, [data]);

  return (
    <section className="space-y-5 p-8">
      <form className="space-y-3">
        <div>
          <label htmlFor="timestamp">Timestamp</label>
          <input
            id="timestamp"
            value={data.timeStamp}
            onChange={(e) => onChange("timeStamp", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="timezone">Timezone Offset</label>
          <input
            id="timezone"
            value={data.timezoneOffset}
            onChange={(e) => onChange("timezoneOffset", e.target.value)}
          />
        </div>

        <button>Convert</button>
      </form>

      <main>
        Result: <code>{result}</code>
      </main>
    </section>
  );
};

export default page;
