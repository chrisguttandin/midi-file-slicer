import { IMidiEvent, IMidiSetTempoEvent } from 'midi-json-parser-worker';

export const isIMidiSetTempoEvent = (event: IMidiSetTempoEvent | IMidiEvent): event is IMidiSetTempoEvent => {
    return ((<IMidiSetTempoEvent> event).setTempo !== undefined);
};
