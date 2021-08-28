import ModalServices from '../../visualizer.util';
import './transcript.css';

import Emotion from '../emotion/emotion';
import Sentiment from '../sentiment/sentiment';
import SpeechType from '../speechType/speech';
import Keywords from './keywords/keywords.component'

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Transcript = (props) => {
    // console.log(props)
    if(!props.fileData.transcript || props.fileData.transcript.length === 0) {
        return(<></>);
    }
    return(
    <div className="mv-transcript-container">
            <div className="card text-center">
                <div className="card-body">
                    <h1>Transcript</h1>
                </div>
            </div>
            {props.fileData.transcript.map((transcript, idx) => {
            return(
            <div id={transcript.startTime} key={idx} className="card">
                <div className="card-header">
                    <div className="d-flex justify-content-between">
                        <h4><span className="avatar">{transcript.speakers[0]}</span> Speaker: {transcript.speakers[0]}</h4>
                        <h4>{ModalServices.secsToTime(transcript.startTime)}</h4>
                    </div> 
                </div>
                <div className="card-body">
                    <div className="sentence-container">
                        <p>{transcript.sentence}.</p>
                    </div>
                    <Keywords keywords={transcript.keywords}/>
                </div>
                <div className="card-footer flex-wrap flex-start d-flex">
                    <Emotion fileData={props.fileData} id={transcript.startTime} />
                    <Sentiment fileData={props.fileData} id={transcript.startTime} />
                    <SpeechType fileData={props.fileData} id={transcript.startTime} />
                </div>
            </div>
            )
            })}
    </div>
    );
}

export default Transcript;