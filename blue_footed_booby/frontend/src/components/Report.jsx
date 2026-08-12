import React from "react";
import { useNavigate, useParams } from "react-router";
import { useLocalAuth } from "../hooks/useLocalAuth";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import "../styles/Report.css";

export const Report = ({ classes, isTeacher }) => {
  const { user } = useLocalAuth();
  const [reports, setReports] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const gatherDates = async () => {
      if (!user || !user.id) return;
      if (reports.length != 0) return;
      const response = await fetch(
        "http://localhost:8000/api/assignments/?teacher=" + user.id,
      );
      const result = await response.json();
      let data = result.filter((obj) => {
        let temp = new Date(obj.commenting_deadline);
        return temp < currentDate;
      });
      let form = data.filter((obj) => {
        let condition = false;
        classes.forEach((cls) => {
          if (cls.id === obj.course) {
            condition = true;
          }
        });
        return condition;
      });
      setReports([...form]);
    };
    gatherDates();
  }, [currentDate, user, classes]);

  const handleFormat = () => {
    return reports.length != 0
      ? classes.map((next) => (
          <div key={next.id} className="list-of-reports">
            <h3>{next.name}</h3>
            <h5>
              {next.code} - {next.term} {next.year}
            </h5>
            <ul>
              {reports.map((obj, index) => {
                if (obj.course != next.id) return;
                return (
                  <div key={index}>
                    <li>
                      <Link to={`/instructors/reports/${obj.id}/${obj.name}`}>
                        {obj.name}
                      </Link>
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        ))
      : null;
  };

  return (
    <div className="Report-View-container">
      <div className="dividing-line"></div>
      <h2>
        <u>Reports</u>
      </h2>
      {handleFormat()}
    </div>
  );
};
