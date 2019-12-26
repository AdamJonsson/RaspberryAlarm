// @ts-check

import React from 'react';
import './sunrise.css';

class ColorStop {
    /**
     * @param {Number} time 
     * @param {number} red 
     * @param {number} green 
     * @param {number} blue 
     */
    constructor (time, red, green, blue) {
        this.time = time;
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
}

class Sunrise extends React.Component {

    skyColors = [
        new ColorStop(0, 0, 0, 0),
        new ColorStop(0.25, 70, 40, 0),
        new ColorStop(0.5, 250, 140, 0),
        new ColorStop(1, 131, 210, 250),
    ]

    sunColors = [
        new ColorStop(0, 0, 0, 0),
        new ColorStop(0.1, 126, 0, 0),
        new ColorStop(0.25, 190, 125, 0),
        new ColorStop(0.5, 240, 240, 0),
        new ColorStop(1, 255, 255, 255),
    ]

    constructor(props) {
        super(props);
        this.state = {
            time: 0.0
        };
        this.startSunrise();
    }

    startSunrise() {
        setInterval(() => this.updateSunriseColor(), 500);
    }

    updateSunriseColor() {
        var updateSpeed = 0.001;
        if (this.state.time + updateSpeed > 1) {
            return;
        }

        this.setState((state) => ({
            time: state.time + updateSpeed
        }));
    }

    /**
     * Get current rgb color from given colors stops and time
     * @param {ColorStop[]} colorStops
     * @param {Number} time 
     */
    getRGBFromStop(colorStops, time) {
        var index = 0;
        for (var colorStopIndex in colorStops) {
            var colorStop = colorStops[colorStopIndex];
            if (colorStop.time > time) {
                index = parseInt(colorStopIndex);
                break;
            }
        }

        let oldColorStop = colorStops[index - 1];
        let newColorStop = colorStops[index];

        return 'rgb(' + 
            this.getNumberInterpolation(
                oldColorStop.red, 
                newColorStop.red, 
                oldColorStop.time, 
                newColorStop.time,
                time
            ) + ', ' +
            this.getNumberInterpolation(
                oldColorStop.green, 
                newColorStop.green, 
                oldColorStop.time, 
                newColorStop.time,
                time
            ) + ', ' +
            this.getNumberInterpolation(
                oldColorStop.blue, 
                newColorStop.blue, 
                oldColorStop.time, 
                newColorStop.time,
                time
            ) +
        ')'
    }

    /**
     * @param {Number} startValue 
     * @param {Number} endValue 
     * @param {Number} startTime 
     * @param {Number} endTime 
     * @param {Number} time 
     */
    getNumberInterpolation(startValue, endValue, startTime, endTime, time) {
        var timeValue = (endTime - time) / (endTime - startTime)
        return Math.floor(startValue * timeValue + (1 - timeValue) * endValue);
    }
    
    generateSunriseStyle() {
        var style = {
            background: 
                'radial-gradient(ellipse at bottom,' +
                    this.getRGBFromStop(this.sunColors, this.state.time) + ', ' + 
                    this.getRGBFromStop(this.skyColors, this.state.time) +
                ')'
        };
        return style;
    }

    render() {
        return (
            <div 
                className="sunrise-background"
                style={this.generateSunriseStyle()}></div>
        );
    }
}
export default Sunrise;