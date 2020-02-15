import React from "react";
import

export class StarRating extends React.Component {
    constructor() {
        super();
        this.state = {starElems: []};
    }
    createStars() {
        let maxStars = this.props.maxStars;
        var tempStarElems = [];
        for(let i = 0; i<this.props.rating; i++) {
            maxStars = maxStars - 1; 
            tempStarElems.push(<img alt="Täytetty arvostelutähti" img={}  key={`Review star key ${maxStars} ${this.props.keyUnique}`}> </img>)
        }
        for(let i = 0; i< maxStars; i++) {
            tempStarElems.push(<img key={`Review star key ${maxStars} ${this.props.keyUnique}`}> </img>)
        }
    }
    render() {
        return (
            <div class="starRating">

            </div>
        )
    }
}