import React from 'react';

class QuizOptions extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.callParentCheckOptions = this.callParentCheckOptions.bind(this);
    }

    callParentCheckOptions() {
        this.props.checkResults(this.props.option);
    }
    render(){
        const {option} = this.props;
        return(
            <div className="fields" onClick={this.callParentCheckOptions}>
                <div className="field-block">{option}</div>
            </div>
        );
    }
}

export default QuizOptions;