import React from 'react'

export default function FormErrors({ errors }: any): JSX.Element {
    return (
        <div>
            {errors.length > 0 ? (
                <ul>
                    {errors.map((error: string) => (
                        <li>{error}</li>
                    ))}
                </ul>
            ) : (
                <span>{errors[0]}</span>
            )}
        </div>
    )
}
