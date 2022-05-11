import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import MeetupEditing from "./MeetupEditing";
import MeetupLayout from "./MeetupLayout";
import "./style.scss";

const MeetupPage = observer(() => {
  return (
    <Routes>
      <Route path="/" element={<MeetupLayout />} />
      <Route path="/edit/*" element={<MeetupEditing />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
});

export default MeetupPage;
