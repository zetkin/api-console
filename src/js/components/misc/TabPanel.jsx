import React from 'react/addons';


export default class TabPanel extends React.Component {
    constructor() {
        super();

        this.state = {
            selectedIndex: 0
        };
    }

    componentWillMount() {
        var i;

        for (i=0; i<this.props.children.length; i++) {
            if (this.props.children[i].props.selected) {
                this.setState({
                    selectedIndex: i
                });
                return;
            }
        }
    }

    render() {
        return (
            <div className="tabpanel">
                <ul className="tabpanel-tabs">
                {this.props.children.map(function(tab, index) {
                    var title = tab.props.tabTitle;
                    var panel = this;
                    var onClick = function() {
                        panel.select(index);
                    };

                    return <li key={ index } onClick={ onClick }>{ title }</li>;
                }, this)}
                </ul>

                <div className="tabpanel-content">
                {this.props.children.map(function(tab, index) {
                    if (index === this.state.selectedIndex) {
                        return (
                            <div key={ index }>
                                { tab.props.children }
                            </div>
                        );
                    }
                }, this)}
                </div>
            </div>
        );
    }

    select(index) {
        this.setState({
            selectedIndex: index
        });
    }
}

export class Tab extends React.Component {
}

Tab.propTypes = {
    selected: React.PropTypes.bool,
    tabTitle: React.PropTypes.string.isRequired
};
