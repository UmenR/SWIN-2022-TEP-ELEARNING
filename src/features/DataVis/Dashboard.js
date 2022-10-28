import React from "react";
import styled from "styled-components";

const Container = styled.div`
   display:flex;
   flex-direction: row;
   align-items:center;
   justify-content: center; 
`

function Dashboard() {
  return (
    <Container>
      <div>
        <iframe
          title="iframe1"
          width="1200"
          height="900"
          src="https://datastudio.google.com/embed/reporting/f57147e9-1ce4-4cd6-ae3e-3c27fe3a2a6f/page/tCF6C"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </Container>
  );
}

export default Dashboard