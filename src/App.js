import styled from "styled-components";

const Container = styled.div`
  width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

function App() {
  return (
    <Container>
      <div>wallet button</div>
      <div>to write a item </div>
      <div>submit button</div>
      <div>search items</div>
      <div>to vote</div>
      <div>to show the result</div>
    </Container>
  );
}

export default App;
