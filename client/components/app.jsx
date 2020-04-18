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
      })
      .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col pt-5">
            <Header/>
            <GradeTable grades={this.state.grades}/>
          </div>
        </div>
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return <h1>Student Grade Table</h1>;
  }
}

function Grade(props) {
  const grade = props.grade;
  const idAttr = `${grade.id}`;
  return (
    <tr id={idAttr}>
      <th scope="row">{idAttr}</th>
      <td>{grade.name}</td>
      <td>{grade.course}</td>
      <td>{grade.grade}</td>
    </tr>
  );
}

function GradeTable(props) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope='col'>Student ID</th>
          <th scope='col'>Student Name</th>
          <th scope='col'>Course</th>
          <th scope='col'>Grade</th>
        </tr>
      </thead>
      <tbody>
        {
          props.grades.map(grade => {
            return (
              <Grade
                key={grade.id}
                grade={grade}/>
            );
          })
        }
      </tbody>
    </table>
  );
}

export default App;
