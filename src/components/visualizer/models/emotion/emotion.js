const Emotion = (props) => {
    if(!props.fileData.emotion) {
        return(<></>);
    }

    const emotionData = props.fileData.emotion.find(id => id.startTime === props.id);

    if(emotionData) {
        return(
            <h5 className="mr-4 d-inline">
            <span className="mr-4">
                Emotion: <div className="badge badge-primary">
                    {props.fileData.emotion.find(id => id.startTime === props.id).emotion.value}
                </div>
            </span>
            <span>
                Tone: <div className="badge badge-primary">
                    {props.fileData.emotion.find(id => id.startTime === props.id).tone.value}
                </div>
            </span>
            </h5>
        )
    } else {
        return(<></>)
    }
}

export default Emotion;