import MeetingPieChart from '../../../../charts/pieChart';

const MeetingEmotion = (props) => {
    const data = props.data.meetingInsights.meetingEmotion;
    if(!data) {
        return(<></>);
    }

    const emotionData = data.map(item => {
        return({
            name: item.emotion,
            value: item.value
        })
    })

    emotionData.sort((a, b) => b["value"] - a["value"]);  

    return(
        <div className="meeting-sentiment">
            <div className="header">
                <h5>Meeting Emotion</h5>
            </div>
            <div className="pie-char-container">
                <MeetingPieChart data={emotionData}/>
            </div>
        </div>
    )
}

export default MeetingEmotion;