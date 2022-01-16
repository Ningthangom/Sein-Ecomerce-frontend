import React from "react";


const Footnote = () => {

    var style = {
        backgroundColor: "grey",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        padding: "20px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%",
        backgroundAattachment: "fixed",
        overflow: "hidden"
    }
    
  return (
     <div>
            <div style={style}>
           Contact: Ph:087525412 or Address: 123 admin road, city, sa, postcode
            </div>
        </div>
  );
};

export default Footnote;


var phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
  }