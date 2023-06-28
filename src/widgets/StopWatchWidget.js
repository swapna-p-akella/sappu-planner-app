import React, { useState, useEffect } from 'react';

export default function StopWatchWidget() {
    const [stopwatchData, setStopwatchData] = useState([
        { id: 0, time: 0, isRunning: false, time_started: 0, pause: [] },
      ])

    const [selectedRow, setSelectedRow] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setStopwatchData(stopwatchData.map((stopwatch) => {
                if (stopwatch.isRunning) {
                    return { ...stopwatch, time: new Date() - stopwatch.time_started - stopwatch.pause.reduce((a, b) => a + b, 0) }
                }
                return stopwatch
            }))
        }, 10)
        return () => clearInterval(interval)
    }, [stopwatchData])

    const handleStart = (id) => {
        setStopwatchData(stopwatchData.map((stopwatch) => {
            if (stopwatch.id === id) {
                return { ...stopwatch, isRunning: true, time_started: new Date() - stopwatch.time - stopwatch.pause.reduce((a, b) => a + b, 0) }
            }
            return stopwatch
        }))
    }

    const handleStop = (id) => {
        setStopwatchData(stopwatchData.map((stopwatch) => {
            if (stopwatch.id === id) {
                return { ...stopwatch, isRunning: false, pause: [...stopwatch.pause, new Date() - stopwatch.time_started - stopwatch.pause.reduce((a, b) => a + b, 0)] }
            }
            return stopwatch
        }))
    }

    const handleReset = (id) => {
        setStopwatchData(stopwatchData.map((stopwatch) => {
            if (stopwatch.id === id) {
                return { ...stopwatch, time: 0, isRunning: false, lap: [] }
            }
            return stopwatch
        }))
    }

    return (
        <div>
            <p className='main-time-label'>{stopwatchData[selectedRow]?.time > 0 ? new Date(stopwatchData[selectedRow]?.time).toISOString().slice(11, -1) : "00:00:00.000"}</p>
            <div className="main-button-controls">
                <button className={"control-buttons"} onClick={() => handleStart(stopwatchData[selectedRow].id)}>Start</button>
                <button className={"control-buttons"} onClick={() => handleStop(stopwatchData[selectedRow].id)}>Stop</button>
                <button className={"control-buttons"} onClick={() => handleReset(stopwatchData[selectedRow].id)}>Reset</button>
            </div>
        </div>
    )
}

