import React, {Component} from "react";

import "./short-table.scss";

const rowFields = {
    url: "Original Url",
    uniqueUrl: "Short Url",
    dateAdded: "Created Date",
    numClicks: "Number of Clicks"
}

const RowHeader = () => (<thead>
    <tr>
        {Object.keys(rowFields).map(field => <td key={`head-${field}`}>{rowFields[field]}</td>)}
    </tr>
</thead>);

const renderRow = (row, index) => (
    <tr key={`row-${index}`}>
        {Object.keys(rowFields).map(field => <td key={`${index}-${field}`}>{row[field]}</td>)}
    </tr>
);

class ShortUrlTable extends Component{
    constructor(props){
        super(props);
        console.log(props.urls);
    }

    render(){
        return (
            <div className="url-table">
                <table>
                    <RowHeader />
                    <tbody>
                        {this.props.urls.map(renderRow)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ShortUrlTable;