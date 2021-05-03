import { createMuiTheme } from '@material-ui/core/styles';
import content from './components/content';
import palette from './components/palette';
import main from './components/main';
import paper from './components/paper';

const theme = createMuiTheme({
    palette,
    content,
    main,
    paper,
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: '64px',
        minWidth: 400
    }
});

export default theme;