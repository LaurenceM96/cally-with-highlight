import { useProp, useMemo } from "atomico";
import { PlainDate, type PlainYearMonth } from "./temporal.js";
import { type DaysOfWeek } from "./date.js";

function safeFrom<T extends PlainDate | PlainYearMonth>(
  Ctr: { from(value: string): T },
  value: string | undefined
) {
  if (value) {
    try {
      return Ctr.from(value);
    } catch {}
  }
}

export function useDateProp<T extends PlainDate | undefined = PlainDate>(
  prop: string
) {
  const [value, setValue] = useProp<string>(prop);

  const date = useMemo(() => safeFrom(PlainDate, value), [value]);
  const setDate = (date: T) => setValue(date?.toString());

  return [date, setDate] as const;
}

export function useDateRangeProp(prop: string) {
  const [value = "", setValue] = useProp<string>(prop);

  const range = useMemo((): [PlainDate, PlainDate] | [] => {
    const [s, e] = value.split("/");
    const start = safeFrom(PlainDate, s);
    const end = safeFrom(PlainDate, e);
    return start && end ? [start, end] : [];
  }, [value]);

  const setRange = (range: [PlainDate, PlainDate]) =>
    setValue(`${range[0]}/${range[1]}`);

  return [range, setRange] as const;
}

export function useHighlightRangesProp(prop: string) {
  const [value = "", setValue] = useProp<string>(prop);

  // Parse the string into an array of [PlainDate, PlainDate]
  const ranges = useMemo((): [PlainDate, PlainDate][] => {
    if (!value) return [];

    return value
        .split("+")
        .map((segment: string) => {
          const [s, e] = segment.split("/");
          const start = safeFrom(PlainDate, s);
          const end = safeFrom(PlainDate, e);
          return start && end ? [start, end] as [PlainDate, PlainDate] : null;
        })
        .filter((r: any): r is [PlainDate, PlainDate] => r !== null);
  }, [value]);

  // Convert ranges back into the compact string format
  const setRanges = (ranges: [PlainDate, PlainDate][]) => {
    const stringValue = ranges
        .map(([s, e]) => `${s}/${e}`)
        .join("+");
    setValue(stringValue);
  };

  return [ranges, setRanges] as const;
}

export function useHighlightGroupsProp(prop: string) {
  const [value = ""] = useProp<string>(prop);

  return useMemo((): [PlainDate, PlainDate][][] => {
    if (!value) return [];

    // Parse format: "0:2024-11-01/2024-11-05+2024-11-10/2024-11-20|2:2024-12-01/2024-12-05"
    // Split by | to separate groups, each group can have an optional index prefix
    const groups: [PlainDate, PlainDate][][] = [];

    for (const groupStr of value.split("|")) {
      if (!groupStr.trim()) continue;

      // Check if group has an index prefix (e.g., "0:" or "2:")
      const colonIndex = groupStr.indexOf(":");
      let groupIndex: number | undefined;
      let rangesStr = groupStr;

      if (colonIndex > 0) {
        const indexPart = groupStr.substring(0, colonIndex);
        const parsedIndex = parseInt(indexPart, 10);
        if (!isNaN(parsedIndex) && parsedIndex >= 0) {
          groupIndex = parsedIndex;
          rangesStr = groupStr.substring(colonIndex + 1);
        }
      }

      const ranges = rangesStr
        .split("+")
        .map((segment: string) => {
          const [s, e] = segment.split("/");
          const start = safeFrom(PlainDate, s);
          const end = safeFrom(PlainDate, e);
          return start && end ? [start, end] as [PlainDate, PlainDate] : null;
        })
        .filter((r: any): r is [PlainDate, PlainDate] => r !== null);

      if (ranges.length > 0) {
        // If index is specified, place at that index; otherwise append
        if (groupIndex !== undefined) {
          groups[groupIndex] = ranges;
        } else {
          groups.push(ranges);
        }
      }
    }

    return groups;
  }, [value]);
}

export function useDateMultiProp(prop: string) {
  const [value = "", setValue] = useProp<string>(prop);

  const multi = useMemo(() => {
    const result = [];

    for (const date of value.trim().split(/\s+/)) {
      const parsed = safeFrom(PlainDate, date);

      if (parsed) {
        result.push(parsed);
      }
    }

    return result;
  }, [value]);

  const setMulti = (dates: PlainDate[]) => setValue(dates.join(" "));

  return [multi, setMulti] as const;
}

type DateFormatOptions = Pick<
  Intl.DateTimeFormatOptions,
  "year" | "month" | "day" | "weekday"
>;

export function useDateFormatter(options: DateFormatOptions, locale?: string) {
  return useMemo(
    () => new Intl.DateTimeFormat(locale, { timeZone: "UTC", ...options }),
    [locale, options]
  );
}

export type WeekdayOption = {
  weekday: NonNullable<Intl.DateTimeFormatOptions["weekday"]>;
};

export function useDayNames(
  options: WeekdayOption,
  firstDayOfWeek: DaysOfWeek,
  locale?: string
) {
  const formatter = useDateFormatter(options, locale);

  return useMemo(() => {
    const days = [];
    const day = new Date();

    for (var i = 0; i < 7; i++) {
      const index = (day.getUTCDay() - firstDayOfWeek + 7) % 7;
      days[index] = formatter.format(day);
      day.setUTCDate(day.getUTCDate() + 1);
    }

    return days;
  }, [firstDayOfWeek, formatter]);
}
