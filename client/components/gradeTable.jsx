import React from 'react';
// import Reviseform from './reviseForm';

function Grade(props) {
  const grade = props.grade;
  const idAttr = `${grade.id}`;
  return (
    <tr id={idAttr}>
      <th scope="row">{idAttr}</th>
      <td>{grade.name}</td>
      <td>{grade.course}</td>
      <td>{grade.grade}</td>
      <td>
        <button onClick={() => props.remove(grade.id)} className="btn btn-danger"><span className="fas fa-trash-alt"></span></button>
        <button onClick={() => props.editing()} className="btn btn-success"><span className="far fa-edit"></span></button>
      </td>
    </tr>
  );
}

function GradeTable(props) {
  return (
    <div>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope='col'>Student ID</th>
            <th scope='col'>Student Name</th>
            <th scope='col'>Course</th>
            <th scope='col'>Grade</th>
            <th scope='col'>Operations</th>
          </tr>
        </thead>
        <tbody>
          {
            props.grades.map(grade => {
              return (

                <Grade
                  key={grade.id}
                  grade={grade}
                  remove={props.remove}
                  editing = {props.editing}
                />
              );
            })
          }
        </tbody>
      </table>

    </div>
  );
}

export default GradeTable;
