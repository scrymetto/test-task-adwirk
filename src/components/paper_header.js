import {withStyles} from '@material-ui/core/styles';
import {Paper} from '@material-ui/core';

export const PaperHeader = withStyles(({palette, spacing}) => ({
    root: {
        background: palette.secondary.main,
        padding: spacing(2),
        fontWeight: 400,
        fontSize: '1.1rem',
    }
}))(Paper);