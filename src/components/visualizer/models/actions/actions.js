
import React from 'react';
import './actions.css';


const priorityClasses = [
    {
        priority:"high",
        class:"badge badge-danger"
    },
    {
        priority:"medium",
        class:"badge badge-success"
    },
    {
        priority:"low",
        class:"badge badge-dark"
    }
]

const formatDate = (date) => {
    const temp = new Date(date);
    // console.log(temp)
    if(isNaN(temp)) {
        return false;
    }
    return temp;
}

const Actions = (props) => {
    if(!props.fileData.actionsData || props.fileData.actionsData.length === 0) {
        return(<></>);
    }
    return(
        <div className="mv-actions-container">
            <div className="card">
                <div className="card-header">
                    <h4>Actions Items {'&'} Follow-ups</h4>
                </div>
                <div className="card-body">
                    {props.fileData.actionsData.map((actionsArr, idx) => {
                        return(
                        <React.Fragment key={idx}>
                            <div className="row">
                                <div className="col-12">
                                    <p className="bold">{actionsArr.actions}</p>
                                </div>
                                <div className="col-3">
                                    <h6>Priority</h6>
                                    <div className={priorityClasses.find((x) => x.priority === actionsArr.priority).class}>
                                        {actionsArr.priority}
                                    </div>
                                </div>
                                {formatDate(actionsArr.completionDate) && 
                                    <div className="col-9">
                                        <h6>Completion date</h6>
                                        <p>{formatDate(actionsArr.completionDate).toLocaleDateString()}</p>
                                    </div>
                                }
                            </div>
                            <hr></hr>
                        </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Actions;