'use strict';

var MidiFileSlicer = require('../../src/midi-file-slicer.js').MidiFileSlicer;

describe('MidiFileSlicer', function () {

    describe('slice()', function () {

        it('should slice the midi representation of default.json', function () {
            var json,
                midiFileSlicer;

            json = require('../fixtures/default.json');

            midiFileSlicer = new MidiFileSlicer({
                json: json
            });

            expect(midiFileSlicer.slice(0.5, 1)).to.deep.equal([
                {
                    delta: 240,
                    noteOn: {
                        noteNumber: 60,
                        velocity: 127
                    },
                    time: 0
                }, {
                    delta: 240,
                    noteOff: {
                        noteNumber: 60,
                        velocity: 127
                    },
                    time: 0.25
                }
            ]);
        });

        it('should slice the midi representation of 240-bpm.json', function () {
            var json,
                midiFileSlicer;

            json = require('../fixtures/240-bpm.json');

            midiFileSlicer = new MidiFileSlicer({
                json: json
            });

            expect(midiFileSlicer.slice(0.5, 1)).to.deep.equal([
                {
                    delta: 240,
                    noteOn: {
                        noteNumber: 60,
                        velocity: 127
                    },
                    time: 0
                }, {
                    delta: 240,
                    noteOff: {
                        noteNumber: 60,
                        velocity: 127
                    },
                    time: 0.125
                }, {
                    delta: 240,
                    noteOn: {
                        noteNumber: 60,
                        velocity: 127
                    },
                    time: 0.25
                }, {
                    delta: 240,
                    noteOff: {
                        noteNumber: 60,
                        velocity: 127
                    },
                    time: 0.375
                }
            ]);
        });

    });

});
