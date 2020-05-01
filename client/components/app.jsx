import React from 'react';
import Header from './header';
import GradeTable from './gradeTable';
import GradeForm from './gradeForm';
import ReviseForm from './reviseForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      grade: {},
      currentlyEditing: false
    };
    this.getGrades = this.getGrades.bind(this);
    this.addGrades = this.addGrades.bind(this);
    this.deleteGrades = this.deleteGrades.bind(this);
    this.reviseGrade = this.reviseGrade.bind(this);
    this.toggleTrue = this.toggleTrue.bind(this);
    this.toggleFalse = this.toggleFalse.bind(this);
    this.getOneGrade = this.getOneGrade.bind(this);
    this.modalRef = React.createRef();
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
      average = (average + parseInt(grades[i].grade));
    }
    if (!average) {
      return 'Calculating';
    }
    return parseInt(average / grades.length);
  }

  addGrades(newGrade) {
    fetch('/api/grades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGrade)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const newData = this.state.grades.concat(data);
        return this.setState(state => ({ grades: newData }));
      })
      .catch(error => console.error('Error:', error));
  }

  deleteGrades(gradeId) {
    const prevGrades = this.state.grades.slice();
    fetch(`/api/grades/${gradeId}`, {
      method: 'DELETE'
    })
      .then(response => { return response.json(); })
      .then(data => {
        for (let i = 0; i < prevGrades.length; i++) {
          if (prevGrades[i].id === gradeId) {
            prevGrades.splice(i);
            return prevGrades;
          }
        }
      })
      .then(newArray => {
        return this.setState(stat => ({ grades: newArray }));
      })
      .catch(error => console.error('Error:', error));
  }

  getOneGrade(gradeId) {
    fetch(`/api/grades/${gradeId}`)
      .then(resp => resp.json())
      .then(data => {
        return this.setState(grade => ({ grade: data }));
      })
      .catch(error => console.error('Error:', error));
    setTimeout(() => { this.toggleTrue(); }, 500);
  }

  reviseGrade(gradeId, updGrade) {
    const prevGrades = this.state.grades.slice();
    fetch(`/api/grades/${gradeId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updGrade)
    })
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < prevGrades.length; i++) {
          if (prevGrades[i].id === gradeId) {
            prevGrades[i] = data;
            return prevGrades;
          }
        }
      })
      .then(newArray => { return this.setState(state => ({ grades: newArray })); })
      .catch(error => console.error('Error:', error));
  }

  toggleTrue() {
    return this.setState(state => ({ currentlyEditing: true }));
  }

  toggleFalse() {
    return this.setState(state => ({ currentlyEditing: false }));
  }

  render() {
    return (
      <div className="container containerBackground shadow-sm">
        <div className="col pt-5">
          <Header average={this.getAverageGrade()}/>
          <div className="row">
            <div className="col-7">
              <GradeTable grades={this.state.grades} remove={this.deleteGrades} editing={this.toggleTrue} retrieve={this.getOneGrade}/>
            </div>
            <div className="col-5 form">
              {this.state.currentlyEditing === false
                ? <GradeForm onSubmit={this.addGrades} />
                : <ReviseForm editing={this.state.currentlyEditing} onSubmit={this.reviseGrade} notEditing={this.toggleFalse} retrieve={this.getOneGrade} grade={this.state.grade} />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
