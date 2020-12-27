import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactAddingForm.module.css';

export class ContactAddingForm extends Component {

    state = {
        name: '',
        number: ''
    }
    
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };


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
        const { name, number } = this.state;
        return (
            <form className={s.form} onSubmit={this.handleSubmit}>
                <div className={s.labelContainer}>
                        <label className={s.label}>
                            <span className={s.labelText}>Name</span>
                            <input
                                className={s.inputText}
                                type="text"
                                name="name"
                                value={name}
                                onChange={this.handleChange}
                                required
                            />
                        </label>
                        <label className={s.label}>
                            <span className={s.labelText}>Phone</span>
                            <input
                                className={s.inputText}
                            type="tel"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                name="number"
                                value={number}
                            onChange={this.handleChange}
                            placeholder="067-333-4444"
                                required
                            />
                        </label>
                </div>
      
                <button className={s.submitBtn} type="submit">
                    <span className={s.submitBtn__text}>Add contact</span>
                </button>
            </form>
        )
    }

}

export default ContactAddingForm

