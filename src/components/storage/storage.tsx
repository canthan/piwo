import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './storage.scss';

export class Storage extends React.Component<{}, {}> {
    // public state;

/*     constructor(props){
        super(props)
        this.state = {
            rendered: true
        }
        console.log('Storage init');
    }; */

    render() {
        return (
            <div className="storage row">
                <Item />
                <Item />
                <Item />
                <Item />
            </div>
        );
    }    
}

export class Item extends React.Component<{}, {}> {
    render() {
        return (
            <div className="item col-md-3">
                Item in storage
            </div>
        )
    }
}


export default Storage
ReactDOM.render(
    <Storage />,
    document.getElementById('root')
)