import React from 'react';

export default function Error404(): JSX.Element {
    return (
        <div className="error">
            <h1 className="error_title">Error: 404</h1>
            <div className="hr" />
            <h3>Nothing to see here, please turn back!</h3>
        </div>
    )
}