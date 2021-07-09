import React, { Component } from 'react';

import './todo-status-filter.css';

export default class TodoStatusFilter extends Component {
    render() {
        return (
            <div className="btn-group">
                <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked />
                <label class="btn btn-outline-primary" for="btnradio1">Radio 1</label>
    
                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
                <label class="btn btn-outline-primary" for="btnradio2">Radio 2</label>
    
                <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" />
                <label class="btn btn-outline-primary" for="btnradio3">Radio 3</label>
            </div>
        )
    }
}
