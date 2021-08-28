import {useState} from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from "reactstrap";
import SpeakerEmotion from './speakerEmotion';
import SpeakerSentiment from './speakerSentiment';
import ModalServices from "../../../visualizer.util";

const SpeakerInsights = (props) => {
    const data = props.data.speakerInsights;
    let speakers = data.speakers.length>0 ? data.speakers : [''];
    const [speaker, setSpeaker] = useState(speakers[0]);

    if(!data) {
        return(<></>)
    }

    return(
        <>
            <div className="speaker-insights-container d-flex justify-content-between align-items-center">
                <h4>Speaker Insights</h4>
                <UncontrolledDropdown>
                    <DropdownToggle caret>
                    Speaker: {speaker}
                    </DropdownToggle>
                    <DropdownMenu>
                        {speakers.map((speakerItem, idx) => {
                            return(
                                <DropdownItem key={idx}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSpeaker(speakerItem)
                                }}>
                                    {speakerItem}
                                </DropdownItem>
                            )
                        })}
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
            <hr></hr>
            <p>Average words/minute: <b>{Math.round(data.speakerAvgWpm[speaker])}</b></p>
            <p>Speaker Talktime: <b>{
                ModalServices.secsToTime(
                    data.speakersTalktime[speaker])
                    .split(':')[2]
            } minutes</b></p>
            <p>Longest Monologue: <b>{
                ModalServices.secsToTime(
                    data.speakersMonologue[speaker])
                    .split(':')[2]
            } minutes</b></p>
            <SpeakerEmotion data={data} speaker={speaker}/>
            <SpeakerSentiment data={data} speaker={speaker}/>
        </>
    )
}

export default SpeakerInsights;