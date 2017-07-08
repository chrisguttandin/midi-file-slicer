import { IMidiSetTempoEvent, TMidiEvent } from 'midi-json-parser-worker';

export const isIMidiSetTempoEvent = (event: TMidiEvent): event is IMidiSetTempoEvent => {
    return ((<IMidiSetTempoEvent> event).setTempo !== undefined);
};
