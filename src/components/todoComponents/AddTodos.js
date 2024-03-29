import React, { Component } from 'react'
import PropTypes from 'prop-types'


export class AddTodos extends Component {

    state = {
        title: ''
    }

    onChange = (e) => {
        this.setState({
            title: e.target.value,
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.addTodos(this.state.title)
        this.setState({ title: ''})
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} style={{display: 'flex'}}>
                <input type="text" name="title" placeholder="Add to do.."
                style={{flex: '10', padding: '5px'}}
                value={this.state.title}
                onChange={this.onChange}/>

                <input type="submit" value="submit" className="btn"
                style={{flex: '1'}}/>
            </form>
        )
    }
}

// proptypes
AddTodos.propTypes = {
    addTodos: PropTypes.func.isRequired,
}

export default AddTodos
