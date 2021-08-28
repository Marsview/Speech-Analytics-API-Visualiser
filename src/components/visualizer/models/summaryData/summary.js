const Summary = (props) => {
    if(!props.fileData.summaryData) {
        return(<></>);
    }
    return(
        <div className="mv-summary-container">
        <div className="card">
            <div className="card-header">
                <h4>Conversation Summary</h4>
            </div>
            <div className="card-body">
                {props.fileData.summaryData.map((summary, idx) => {
                    return(
                        <div className="summary mb-3">
                            <h4>Speaker: {summary.speaker}</h4>
                            <p>{summary.sentence}.</p>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
    )
}

export default Summary;