import MeetingPieChart from '../../../../charts/pieChart';

const SpeakerSentiment = (props) => {
    const data = props.data.speakersSentiment[props.speaker];
    console.log("speaker meotion data",data)
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
        <div className="meeting-sentiment container">
            <hr></hr>
            <div className="header">
                <h5>Sentiment</h5>
            </div>
            <div className="pie-char-container">
                <MeetingPieChart data={sentimentData}/>
            </div>
        </div>
    )
}

export default SpeakerSentiment;