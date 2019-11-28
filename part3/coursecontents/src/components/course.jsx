import React, {
  Fragment
} from 'react';

const Header = ({
  course
}) => {
  return <h2 className = "header" > {
    course.name
  } < /h2>;
};

const Part = ({
  name,
  exercises
}) => {
  return ( <
    div className = "contentBox" >
    <
    p > {
      name
    } < /p> <p className="exer">{exercises}</p >
    <
    /div>
  );
};

const Content = ({
  course
}) => {
  const data = course.parts;

  let result = data.map(element => {
    return <Part name = {
      element.name
    }
    exercises = {
      element.exercises
    }
    /> 
  });

  return ( <
    Fragment > {
      /* <Part name={data[0].name} exercises={data[0].exercises} /> */ } {
      result
    } <
    /Fragment>
  );
};

const Total = ({
  course
}) => {
  const parts = course.parts;
  let total = parts.reduce((a, b) => {
    return a + b.exercises
  }, 0);
  return <div className = "totalBox" > total of {
    total
  }
  exercises < /div>; 
};

const Course = ({
  course
}) => {
  return ( <
    >
    <
    Header course = {
      course
    }
    /> <
    Content course = {
      course
    }
    /> <
    Total course = {
      course
    }
    /> <
    />
  );
};


export default Course;