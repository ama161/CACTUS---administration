import React from 'react';
import './Input.css'

const Input = ({label, placeholder, type, value, onChange}) => (
    <div className="form-item">
        {(label) ? <label>{label}</label> : null}
        <input
            placeholder = {(placeholder) ? placeholder : null}
            type = {type}
            value = {value}
            onChange = {onChange}
        />
    </div>
)

export default Input;