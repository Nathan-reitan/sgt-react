import React from 'react';

export default class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newGrade = {
      name: this.state.name,
      course: this.state.course,
      grade: this.state.grade
    };
    this.props.onSubmit(newGrade);
    this.setState({
      name: '',
      course: '',
      grade: ''
    });
  }

  handleReset(event) {
    event.preventDefault();
    this.setState({
      name: '',
      course: '',
      grade: ''
    });
  }

  render() {
    const name = this.state.name;
    const course = this.state.course;
    const grade = this.state.grade;
    return (
      <form className="input-group mb-4 shadow-sm" onSubmit={this.handleSubmit}>
        <label>
          <div className="fas fa-user"></div>
          <input
            className="mx-5"
            type="text"
            id="name"
            value={name}
            placeholder="Name"
            onChange={this.handleChange}/>
        </label>
        <label>
          <div className="far fa-list-alt"></div>
          <input
            className="mx-5"
            type="text"
            id="course"
            value={course}
            placeholder="Course"
            onChange={this.handleChange} />
        </label>
        <label>
          <div className="fas fa-graduation-cap"></div>
          <input
            className="mx-5"
            type="text"
            id="grade"
            value={grade}
            placeholder="Grade"
            onChange={this.handleChange} />
        </label>
        <div className="input-group-append buttonContainer">
          <button type="submit" className="btn btn-primary">Add</button>
          <button type="reset" className="mx-2" onClick={this.handleReset}>Cancel</button>
        </div>
      </form>
    );
  }
}
