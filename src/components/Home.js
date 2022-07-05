import React from "react";
import Note from "./note";
const Home = (props) => {
  return (
    <>

       
      <Note  showAlert={props.showAlert} />
    </>
  );
};

export default Home;
