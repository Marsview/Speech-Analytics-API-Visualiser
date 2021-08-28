
import ModalServices from '../../visualizer.util';
import './screengrabs.css';

import React, { useState } from 'react';

const screenData = [{title:[], time:0}];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Screengrabs = (props) => {
    const [value, setValue] = useState({title: ['Screengrabs'], time: 0});

    if(!props.fileData.screengrabs || props.fileData.screengrabs.length === 0) {
        return(<></>);
    }

    // eslint-disable-next-line array-callback-return
    props.fileData.screengrabs.map(item => {
        const timeStamp = item.timeStamp;
        const index = item.title.length === 0;
        if(!index) {
            screenData.push({
                title: item.title,
                time: timeStamp
            })
        }
    })

    const timeLength = screenData[screenData.length-1].time;

    for(let i=0;i< screenData.length-1;i++) {
        // screenData[i].width = ((screenData[i+1].time - screenData[i].time)/timeLength)*100;
        screenData[i].x = ((screenData[i+1].time)/timeLength)*100;
    }

    let screenSelected = {title: screenData[0].title, time: screenData[0].time};

    const getScreenData = (e, idx) => {
        e.preventDefault();
        // console.log(idx)
        screenSelected = {
            title: screenData[idx].title, time: screenData[idx].time
        }
        setValue(screenSelected);
    }


    return (
        <div className="mv-screengrabs-container">
            <div className="card">
                <div className="card-header">
                    <h4>Screengrabs</h4>
                </div>
                <div className="card-body">
                    <div className="bg-light w-100 d-flex" style={{height:"5px"}}>
                    <svg className="w-100">
                        {screenData.map((data,idx) => {
                            return(
                            <>
                            <line 
                            key={`cell-${idx}`} 
                            className="circle" 
                            onClick={(e) => getScreenData(e, idx)} 
                            x1={data.x + '%'} 
                            y1="50%"  
                            x2={data.x + '%'} 
                            y2="50%"  
                            stroke={COLORS[idx%COLORS.length]}>
                                <title>{ModalServices.secsToTime(data.time)}</title>
                            </line>
                            </>
                            )
                        })}
                        </svg>
                    </div>
                    <div className="font-smaller mt-3">*Click a dot to get your screen activity</div>
                    <hr></hr>
                    <div className="screendata mt-5">
                        <h5>{ModalServices.secsToTime(value.time)}</h5>
                        <p><b>Title:</b> {value.title.join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default Screengrabs;