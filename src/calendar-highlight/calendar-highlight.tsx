import { c, type Host } from "atomico";
import { PlainDate } from "../utils/temporal.js";
import { useDateProp, useHighlightGroupsProp, useDateRangeProp } from "../utils/hooks.js";
import { CalendarBase, styles, props as baseProps } from "../calendar-base/calendar-base.js";
import {
  useCalendarBase,
  type CalendarFocusOptions,
} from "../calendar-base/useCalendarBase.js";
import { clamp } from "../utils/date.js";

const inRange = (date: PlainDate, start: PlainDate, end: PlainDate) => {
  const clamped = clamp(date, start, end);
  return clamped === date;
};

export const CalendarHighlight = c(
  (
    props
  ): Host<{
    onChange: Event;
    onRangeStart: CustomEvent<Date>;
    onRangeEnd: CustomEvent<Date>;
    onFocusDay: CustomEvent<Date>;
    focus: (options?: CalendarFocusOptions) => void;
  }> => {
    const [value, setValue] = useDateRangeProp("value");
    const [focusedDate = value[0], setFocusedDate] = useDateProp("focusedDate");
    const highlightGroups = useHighlightGroupsProp("highlightRanges");

    const calendar = useCalendarBase({
      ...props,
      focusedDate,
      setFocusedDate,
    });

    // Helper to check if a date is in any highlight range
    function isDateHighlighted(date: PlainDate): boolean {
      for (const group of highlightGroups) {
        if (group) {
          for (const [start, end] of group) {
            if (inRange(date, start, end)) {
              return true;
            }
          }
        }
      }
      return false;
    }

    function getSelectedHighlightRange(date: PlainDate): [PlainDate, PlainDate] | []{
      for (const group of highlightGroups) {
        if (group) {
          for (const [start, end] of group) {
            if (inRange(date, start, end)) {
              return [start, end];
            }
          }
        }
      }
      return [];
    }

    function handleSelect(e: CustomEvent<PlainDate>) {
      const detail = e.detail;
      e.stopPropagation();

      // Only allow selection of highlighted dates
      if (!isDateHighlighted(detail)) {
        return;
      }

      const highlightedRange = getSelectedHighlightRange(detail);

      if (highlightedRange.length) {
        setValue(highlightedRange);
        calendar.dispatch();
      }
    }

    return (
      <host shadowDom focus={calendar.focus}>
        <CalendarBase
          {...props}
          {...calendar}
          type="highlight"
          value={value}
          highlightGroups={highlightGroups}
          onSelect={handleSelect}
        />
      </host>
    );
  },

  {
    props: {
      ...baseProps,
      tentative: {
        type: String,
        value: "",
      },
    },
    styles,
  }
);

customElements.define("calendar-highlight", CalendarHighlight);