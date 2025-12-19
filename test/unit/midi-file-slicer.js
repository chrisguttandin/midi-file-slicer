import { describe, expect, it } from 'vitest';
import { MidiFileSlicer } from '../../src/midi-file-slicer';
import multipleSetTempoEventsOnASeparateTrack from '../fixtures/multiple-set-tempo-events-on-a-separate-track.json';
import multipleSetTempoEventsOnOneTrack from '../fixtures/multiple-set-tempo-events-on-one-track.json';
import noSetTempoEvent from '../fixtures/no-set-tempo-event.json';
import oneSetTempoEventOnASeparateTrack from '../fixtures/one-set-tempo-event-on-a-separate-track.json';
import oneSetTempoEventOnOneTrack from '../fixtures/one-set-tempo-event-on-one-track.json';

describe('MidiFileSlicer', () => {
    describe('slice()', () => {
        it('should slice a midi representation with no set tempo event', () => {
            const midiFileSlicer = new MidiFileSlicer({ json: noSetTempoEvent });

            expect(midiFileSlicer.slice(500, 1000)).to.deep.equal([
                {
                    event: {
                        delta: 240,
                        noteOn: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 0
                },
                {
                    event: {
                        delta: 240,
                        noteOff: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 250
                }
            ]);
        });

        it('should slice a midi representation with one set tempo event on one track', () => {
            const midiFileSlicer = new MidiFileSlicer({ json: oneSetTempoEventOnOneTrack });

            expect(midiFileSlicer.slice(500, 1000)).to.deep.equal([
                {
                    event: {
                        delta: 240,
                        noteOn: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 0
                },
                {
                    event: {
                        delta: 240,
                        noteOff: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 125
                },
                {
                    event: {
                        delta: 240,
                        noteOn: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 250
                },
                {
                    event: {
                        delta: 240,
                        noteOff: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 375
                }
            ]);
        });

        it('should slice a midi representation with one set tempo event on a separate track', () => {
            const midiFileSlicer = new MidiFileSlicer({ json: oneSetTempoEventOnASeparateTrack });

            expect(midiFileSlicer.slice(500, 1000)).to.deep.equal([
                {
                    event: {
                        delta: 240,
                        noteOn: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 0
                },
                {
                    event: {
                        delta: 240,
                        noteOff: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 125
                },
                {
                    event: {
                        delta: 240,
                        noteOn: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 250
                },
                {
                    event: {
                        delta: 240,
                        noteOff: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 375
                }
            ]);
        });

        it('should slice a midi representation with multiple set tempo events on one track', () => {
            const midiFileSlicer = new MidiFileSlicer({ json: multipleSetTempoEventsOnOneTrack });

            expect(midiFileSlicer.slice(500, 1000)).to.deep.equal([
                {
                    event: {
                        delta: 240,
                        noteOn: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 0
                },
                {
                    event: {
                        delta: 240,
                        noteOff: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 125
                },
                {
                    event: {
                        delta: 0,
                        setTempo: {
                            microsecondsPerQuarter: 500000
                        }
                    },
                    time: 125
                },
                {
                    event: {
                        delta: 240,
                        noteOn: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 375
                }
            ]);
        });

        it('should slice a midi representation with multiple set tempo events on a separate track', () => {
            const midiFileSlicer = new MidiFileSlicer({ json: multipleSetTempoEventsOnASeparateTrack });

            expect(midiFileSlicer.slice(500, 1000)).to.deep.equal([
                {
                    event: {
                        delta: 240,
                        noteOn: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 0
                },
                {
                    event: {
                        delta: 1200,
                        setTempo: {
                            microsecondsPerQuarter: 500000
                        }
                    },
                    time: 125
                },
                {
                    event: {
                        delta: 240,
                        noteOff: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 125
                },
                {
                    event: {
                        delta: 0,
                        endOfTrack: true
                    },
                    time: 125
                },
                {
                    event: {
                        delta: 240,
                        noteOn: {
                            noteNumber: 60,
                            velocity: 127
                        }
                    },
                    time: 375
                }
            ]);
        });
    });
});
