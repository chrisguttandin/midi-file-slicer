import { IMidiEvent } from 'midi-json-parser-worker';

export interface IExtendedMidiEvent extends IMidiEvent {

    time: number;

}
