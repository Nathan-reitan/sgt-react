import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
    this.getGrades = this.getGrades.bind(this);
  }

  componentDidMount() {
    this.getGrades();
  }

  getGrades() {
    fetch('/api/grades')
      .then(resp => { return resp.json(); })
      .then(data => {
        return this.setState(state => ({
          grades: data
        }));
      });
  }

  render() {
    return (
      <Header/>
    );
  }
}

class Header extends React.Component {
  render() {
    return <h1>Student Grade Table</h1>;
  }
}

export default App;
