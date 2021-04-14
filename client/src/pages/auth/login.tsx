import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import FormErrors from '../../components/errors/formErrors';
import { AppContext } from '../../context/AppContext';

export default function Login(): JSX.Element {
    const history = useHistory();
    const { user } = useContext<any>(AppContext);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors([]);
        let _errors: string[] = [];

        // const format = /^(?=.{3,25}$)(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9_-]+([^._-])$/gm;
        // const pwFormat = /^(?=.*\d)(?!.*["'`])(?=.*[A-Z])(?=.*[a-z])(?=.*[$&+,:;=?@#|<>.-^*()%!])(?=.*[^\w\d\s:])([^\s]){8,120}$/gm;

        if (!email) _errors.push('You must enter an email address.');
        if (!password) _errors.push('You must enter an email password.');

        if (_errors.length > 0) return setErrors(_errors);


        try {
            const data = {
                email,
                password
            };

            const response = await axios.post('/api/user/login', data);
            console.log(response)
            user(response.data.user);
            localStorage.setItem("val_token", response.data.val_token);
            history.push('/');
        } catch (err) {
            // setErrors([err.response.data.message]);
            // setErrors(err)
        }
    }

    return (
        <div className="page">
            <h1 className="page_title">Login</h1>
            <form onSubmit={onSubmit}>
                {!!errors.length && <FormErrors errors={errors} />}
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
                <button type="submit" className="btn btn-secondary">Submit</button>
            </form>
        </div>
    )
}
