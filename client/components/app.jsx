import React from 'react';
import Header from './header';
import GradeTable from './gradeTable';

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
      })
      .catch(error => console.error('Error:', error));
  }

  getAverageGrade() {
    const grades = this.state.grades;
    let average = 0;
    for (let i = 0; i < grades.length; i++) {
      average += grades[i].grade;
    }
    return average / grades.length;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col pt-5">
            <Header average={this.getAverageGrade()}/>
            <GradeTable grades={this.state.grades}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
