import MeetingPieChart from '../../../../charts/pieChart';

const MeetingSentiment = (props) => {
    const data = props.data.meetingInsights.meetingSentiment;
    if(!data) {
        return(<></>);
    }

    const sentimentData = data.map(item => {
        return({
            name: item.sentiment,
            value: item.value
        })
    })

    sentimentData.sort((a, b) => b["value"] - a["value"]);  

    return(
        <div className="meeting-sentiment">
            <div className="header">
                <h5>Meeting Sentiment</h5>
            </div>
            <div className="pie-char-container">
                <MeetingPieChart data={sentimentData}/>
            </div>
        </div>
    )
}

export default MeetingSentiment;