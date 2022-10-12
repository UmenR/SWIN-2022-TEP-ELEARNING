import styled from 'styled-components';

/**
 * TOD: remove once done
 * We use a CSS in JS approach to maintain components via 'styeld components'
 * refer to https://styled-components.com/docs/basics#getting-started
 */
const Header = styled.h1`
  color:red
`

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Header>
        Styled Component Test
       </Header>
      </header>
    </div>
  );
}

export default App;
