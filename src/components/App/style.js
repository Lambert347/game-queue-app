import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#263238',
        padding: theme.spacing(8, 0, 6),
    },
    cardGrid: {
        padding: '20px 0',
        display: 'grid',
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '0px',
        marginRight: '0px',
        
    },
    image: {
        paddingTop: '20.00%'
    },
    cardContent: {
        flexGrow: 1,
        paddingBottom: '0px',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        backgroundColor: '#dd2c00',
        justify: 'center',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    addForm: {
        padding: theme.spacing(8, 0, 6),
    },
    landingImage: {
        backgroundImage: 'url(https://i.imgur.com/YPJbVJ5.png)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    gridItem: {
        marginRight: '0px',
        marginBottom: '10px',
        display: 'grid'
    }
    
   
}))

export default useStyles;