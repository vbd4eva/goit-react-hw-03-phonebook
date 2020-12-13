import React, { Component } from 'react'
import s from './ContactAddingForm.module.css';

export class ContactAddingForm extends Component {

    state = {
        name: '',
        number: ''
    }

    handleChange = (e) => {
        const { name, value } = e.currentTarget;
        this.setState({[name]:value});
    }

    handleSubmit = (e) => { 
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.reset();
    }
    reset = () => {
        this.setState({ name: '', number: ''});
    };

    render() {
        return (
            <form className={s.form} onSubmit={this.handleSubmit}>
                <div className={s.labelContainer}>
                    {Object.keys(this.state).map(
                        (labelName) => { 
                            return (

                                <label key={labelName} className={s.label}>
                                    <span className={s.labelText}>{labelName}</span>
                                    <input
                                        className={s.inputText}
                                        type="text"
                                        name={labelName}
                                        value={this.state[labelName]}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </label>
                            );
                        }
                    )}
                </div>
      
                <button className={s.submitBtn} type="submit">
                    <span className={s.submitBtn__text}>Add contact</span>
                </button>
            </form>
        )
    }

}

export default ContactAddingForm

