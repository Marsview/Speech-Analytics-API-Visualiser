const QuestionResponse = (props) => {
    if(!props.fileData.questionResponse || props.fileData.questionResponse.length === 0) {
        return(<></>);
    }
    return(
        <div className="mv-questions-container">
            <div className="card">
                <div className="card-header">
                    <h4>Questions and Response</h4>
                </div>
                <div className="card-body">
                    {props.fileData.questionResponse.map((questions, idx) => {
                        return(
                            <div className="question-response-block">
                                <div className="questions mb-3">
                                    <h5>Question: 
                                        {questions.questionBlock.map((blocks, idx) => {
                                            return(
                                                <>{blocks.question}</>
                                            )
                                        })}
                                    </h5>
                                </div>
                                <div className="response mb-5">
                                    <p>Response: {questions.response || "none"}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default QuestionResponse;