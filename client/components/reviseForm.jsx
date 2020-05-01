import React from 'react';

export default class ReviseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.grade.id,
      name: props.grade.name,
      course: props.grade.course,
      grade: props.grade.grade
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.editing = this.props.currentlyEditing;
  }

  componentDidMount() {
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const gradeId = this.state.id;
    const updGrade = {
      name: this.state.name,
      course: this.state.course,
      grade: this.state.grade
    };
    this.props.onSubmit(gradeId, updGrade);
    this.setState({
      name: '',
      course: '',
      grade: ''
    });
    this.props.notEditing();
  }

  handleReset(event) {
    event.preventDefault();
    this.setState({
      name: '',
      course: '',
      grade: ''
    });
    this.props.notEditing();
  }

  render() {
    const name = this.state.name;
    const course = this.state.course;
    const grade = this.state.grade;
    return (
      <form className="input-group mb-4" onSubmit={this.handleSubmit}>
        <label>
          <div className="fas fa-user"></div>
          <input
            className="mx-4"
            type="text"
            id="name"
            value={name}
            placeholder="Name"
            onChange={this.handleChange} />
        </label>
        <label>
          <div className="far fa-list-alt"></div>
          <input
            className="mx-4"
            type="text"
            id="course"
            value={course}
            placeholder="Course"
            onChange={this.handleChange} />
        </label>
        <label>
          <div className="fas fa-graduation-cap"></div>
          <input
            className="mx-4"
            type="text"
            id="grade"
            value={grade}
            placeholder="Grade"
            onChange={this.handleChange} />
        </label>
        <button type="submit" className="btn btn-primary">Submit Revision</button>
        <button type="reset" className="mx-2 btn btn-secondary" onClick={this.handleReset}>Cancel</button>
      </form>
    );
  }
}
