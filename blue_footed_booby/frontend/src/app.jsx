import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import "./app.css";
import { useState } from "react";

import { Login } from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { StudentHomepage } from "./components/StudentHomepage";
import { InstructorHomepage } from "./components/InstructorHomepage";
import { AssignmentView } from "./components/AssignmentView";
import { SubmissionView } from "./components/submission";
import { InstructorAddAssignmentView } from "./components/InstructorAddAssignmentView";
import { Layout } from "./components/Layout";
import { SubmitFile } from "./components/submitFile";
import { NotFound } from "./components/NotFound";
import { ReportView } from "./components/ReportView";
import { ReportFile } from "./components/ReportFile";
import { AddRemoveUserView } from "./components/AddRemoveUserView";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/students"
          element={
            <ProtectedRoute requiredRole="student">
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="homepage" replace />} />
          <Route path="homepage" element={<StudentHomepage />} />
          <Route
            path="assignments/:assignmentId"
            element={<AssignmentView />}
          />
          <Route
            path="assignments/:assignmentId/submissions/:submissionId"
            element={<SubmissionView />}
          />
          <Route
            path="assignments/:assignmentId/submissions/submit"
            element={<SubmitFile />}
          />
        </Route>

        <Route
          path="/instructors"
          element={
            <ProtectedRoute requiredRole="instructor">
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="homepage" replace />} />
          <Route path="homepage" element={<InstructorHomepage />} />
          <Route
            path="assignments/add"
            element={<InstructorAddAssignmentView />}
          />
          <Route
            path="assignments/:assignmentId"
            element={<AssignmentView isTeacher={true} />}
          />
          <Route
            path="assignments/:assignmentId/submissions/:submissionId"
            element={<SubmissionView isTeacher={true} />}
          />
          <Route
            path="reports/:assignmentId/:assignmentName"
            element={<ReportView isTeacher={true} />}
          ></Route>
          <Route
            path="assignments/:assignmentId/reportfile/:userId"
            element={<ReportFile />}
          ></Route>
          <Route
            path="assignments/addRemoveUser"
            element={<AddRemoveUserView />}
          ></Route>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
};
