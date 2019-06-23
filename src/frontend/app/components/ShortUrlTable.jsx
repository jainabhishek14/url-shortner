import React, {Component} from "react";

import "./short-table.scss";

const rowFields = {
    url: {
        name: "Original Url",
        formattor: v => <a href={`${v}`} target="_blank">{`${v}`}</a>
    },
    uniqueUrl: {
        name: "Short Url",
        formattor: v => <a href={`${v}`} target="_blank">{`${v}`}</a>
    },
    dateAdded: {
        name: "Created Date",
        formattor: v => v.toString()
    },
    numClicks: {
        name: "Clicks",
        formattor: v => typeof v === "Number" ? Number.parseInt(v, 10) : 0
    },
}

const RowHeader = () => (<thead>
    <tr>
        {Object.keys(rowFields).map(field => <td key={`head-${field}`}>{rowFields[field].name}</td>)}
    </tr>
</thead>);

const renderRow = (row, index) => (
    <tr key={`row-${index}`}>
        {Object.keys(rowFields).map(field => <td key={`${index}-${field}`}>{rowFields[field].formattor(row[field])}</td>)}
    </tr>
);

class ShortUrlTable extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="url-table">
                <table>
                    <RowHeader />
                    <tbody>
                        {this.props.urls.sort((a,b) => b.dateAdded - a.dateAdded).map(renderRow)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ShortUrlTable;