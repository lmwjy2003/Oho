import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as peopleActions from '../../actions/index';

import RaisedButton from 'material-ui/RaisedButton';

function mapStateToProps(state, props) {
  return {
    people: state.people
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(peopleActions, dispatch)
  }
}

class PeopleContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };
    this.addPeople = this.addPeople.bind(this);
  }

  addPeople() {
    const people = this.state.input.trim();
    if (people !== '') {
      this.props.actions.addPeople(people);
      this.setState({
        input: '',
      });
    }
  }

  render() {
    const { people } = this.props;
    const { input } = this.state;
    const peopleList = people.map((p, index) => (
      <div key={index}>{p}</div> 
    ));
    return (
      <div>
        <p className="App-intro">
          请在下面输入框中输入试试
        </p>
        <input
          value={input}
          onChange={e => this.setState({ input: e.target.value })} 
        />
        <RaisedButton onClick={() => this.addPeople()}>提交</RaisedButton>
        {peopleList}
      </div>
    );
  }
}

PeopleContainer.propTypes = {
  people: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleContainer);