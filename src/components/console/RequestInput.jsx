import React from 'react/addons';


export default class RequestInput extends React.Component {
    render() {
        return (
            <div className="request-input">
                <select>
                    <option value="get">GET</option>
                    <option value="post">POST</option>
                    <option value="delete">DELETE</option>
                    <option value="patch">PATCH</option>
                </select>
                <input type="text" placeholder="Request path?and=params"/>
                <textarea placeholder="Request body"/>
            </div>
        );
    }
}
