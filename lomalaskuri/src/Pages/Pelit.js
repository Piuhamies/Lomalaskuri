import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import peli from '../p5/empty-example/V2.js';

export default class Pelit extends React.Component {
    render() {
        return (
            <>
                <h1>Pelin tarjosi: pizzaworm.fi</h1>
                <div className="aspect-ratio">
                    <P5Wrapper sketch={peli}></P5Wrapper>
                </div>
            </>
        )
    }
}