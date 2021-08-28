const SpeechType = (props) => {
    if(!props.fileData.speechType) {
        return(<></>);
    }

    const speechType = props.fileData.speechType.find(id => id.startTime === props.id);

    if(speechType) {
        return(
            <h5 className="d-inline">
                <span>
                    Speech Type: <div className="badge badge-info">
                        {props.fileData.speechType.find(id => id.startTime === props.id).type}
                    </div>
                </span>
            </h5>
        )
    } else {
        return(<></>)
    }
}

export default SpeechType;