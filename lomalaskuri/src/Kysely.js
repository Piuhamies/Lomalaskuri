import React from 'react';

export class Kysely extends React.Component {
    render() {
        return (
            <div className="kysely">
                <iframe title="kysely" id="kysely" src={this.props.src} width="640" height="589" frameborder="0" marginheight="0" marginwidth="0">Ladataan...</iframe>
            </div>
        )
    }
}