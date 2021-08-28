import MeetingSentiment from './meetingInsights/meetingSentiment';
import MeetingEmotion from './meetingInsights/meetingEmotion';
import SpeakerInsights from './speakerInsights/index';
import MeetingBarChart from '../../../charts/barChart';

import './dataInsights.css'

const DataInsights = (props) => {
    const data = props.fileData.dataInsights;
    if(!data) {
        return(<></>);
    }

    const engagement = Math.round((data.meetingInsights.engagementRatio || 0) * 100);
    const deadAir = Math.round((data.meetingInsights.deadAir || 0) * 100);
    const engagementData = [
        {name : "Meeting Insights", 
        engagement: engagement,
        deadair: deadAir
    }
    ]
    return(
        <div className="card">
            <div className="card-header">
                <h4>Speech Insights</h4>
            </div>
            <div className="card-body">
                <MeetingSentiment data={data}/>
                <hr></hr>
                <MeetingEmotion data={data}/>
                <MeetingBarChart data={engagementData}/>
                <hr></hr>
                <SpeakerInsights data={data}/>
            </div>
        </div>
    )
}

export default DataInsights;