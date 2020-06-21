import { MidiFileSlicer } from '../../src/midi-file-slicer';
import dflt from '../fixtures/default.json';
import twoFourZero from '../fixtures/240-bpm.json';

describe('MidiFileSlicer', () => {
    describe('slice()', () => {
        it('should slice the midi representation of default.json', () => {
            const midiFileSlicer = new MidiFileSlicer({ json: dflt });

            expect(midiFileSlicer.slice(500, 1000)).to.deep.equal([
                {
                    event: {
                        delta: 240,
                        noteOn: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 0.00000000000005921189464667502
                },
                {
                    event: {
                        delta: 240,
                        noteOff: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 250.00000000000009
                }
            ]);
        });

        it('should slice the midi representation of 240-bpm.json', () => {
            const midiFileSlicer = new MidiFileSlicer({ json: twoFourZero });

            expect(midiFileSlicer.slice(500, 1000)).to.deep.equal([
                {
                    event: {
                        delta: 240,
                        noteOn: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 0.00000000000005921189464667502
                },
                {
                    event: {
                        delta: 240,
                        noteOff: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 125.00000000000007
                },
                {
                    event: {
                        delta: 240,
                        noteOn: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 250.00000000000009
                },
                {
                    event: {
                        delta: 240,
                        noteOff: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 375.0000000000001
                }
            ]);
        });
    });
});
