import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem('searchValue'));
    if (storage) this.setState({ value: storage.value });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.value !== this.state.value && this.state.value !== '')
      localStorage.setItem('searchValue', JSON.stringify(this.state));
  }

  submitHandler = e => {
    e.preventDefault();
    this.props.query(this.state.value);
    localStorage.removeItem('searchValue');
    this.setState({ value: '' });
  };

  onChangeHandler = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.submitHandler}>
          <button
            type="submit"
            className={css.SearchForm_button}
            disabled={this.state.value === ''}
          >
            <span className={css.SearchForm_button_label}>Search</span>
          </button>
          <input
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChangeHandler}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  query: PropTypes.func,
};