import React from 'react';

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
                grade={grade} />
            );
          })
        }
      </tbody>
    </table>
  );
}

export default GradeTable;
