//in case any dependencies weren't installed anutomatically, here is the list:
//npm install @mui/styles
//npm install @material-ui/core --save
//npm install @mui/material @emotion/react @emotion/styled
//npm install axios --save


import './App.css';
import Main from './Components/Main';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import Container from '@mui/material/Container';
import themeFile from './util/theme';

const theme = createTheme(themeFile);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      {/* if comment the line under - will cancel everything from middle to wider component */}
      <div className="App">
        <Container>
        <Main />
        </Container>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
