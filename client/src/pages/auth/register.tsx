import React, { useState } from 'react';
import validator from 'validator';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import FormErrors from '../../components/errors/formErrors';

export default function Register(): JSX.Element {
    const history = useHistory();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordAgain, setPasswordAgain] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors([]);
        let _errors: string[] = [];

        const format = /^(?=.{3,25}$)(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9_-]+([^._-])$/gm;
        const pwFormat = /^(?=.*\d)(?!.*["'`])(?=.*[A-Z])(?=.*[a-z])(?=.*[$&+,:;=?@#|<>.-^*()%!])(?=.*[^\w\d\s:])([^\s]){8,120}$/gm;

        if (!name) _errors.push('You must provide a username.');
        else if (!name.match(format)) _errors.push('Your username does not follow the username rule pattern.');
        if (!validator.isEmail(email)) _errors.push('A valid email is required.');
        if (!password) _errors.push('You must provide a password.');
        else if (!password.match(pwFormat)) _errors.push('Your password must follow the password rule pattern.');
        if (!passwordAgain) _errors.push('You must retype your password.');
        else if (passwordAgain !== password) _errors.push('Both passwords must match.');

        if (_errors.length > 0) return setErrors(_errors);

        const data = {
            name,
            email,
            password
        };

        try {
            await axios.post('/api/user/register', data);
            history.push('/auth/login')
        } catch (err) {
            setErrors([err.response.data.message]);
        }
    }

    return (
        <div className="page">
            <h1 className="page_title">Register</h1>
            <form onSubmit={onSubmit}>
                {!!errors.length && <FormErrors errors={errors} />}
                <div className="mb-3 row">
                    <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control"
                            placeholder="Username..." id="username"
                            value={name} onChange={e => setName(e.target.value)} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control"
                            placeholder="email..." id="email"
                            value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control"
                            placeholder="Password..." id="password"
                            value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="passwordAgain" className="col-sm-2 col-form-label">Repeat Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control"
                            placeholder="Password..." id="passwordAgain"
                            value={passwordAgain} onChange={e => setPasswordAgain(e.target.value)} />
                    </div>
                </div>
                <button type="submit" className="btn btn-secondary">Submit</button>
            </form>
        </div>
    )
}
