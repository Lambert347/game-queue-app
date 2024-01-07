import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#263238',
        padding: theme.spacing(8, 0, 6),
        height: '1000%'
    },
    cardGrid: {
        padding: '20px 0',
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '710px'
    },
    card: {
        height: '100%',
        width: '120%',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '30px',
        justifyContent: 'center',
    },
    image: {
        paddingTop: '0.00%',
        flexGrow: 1,

    },
    cardContent: {
        flexGrow: 1,
        paddingBottom: '0px',
    },
    profCard: {
        height: '45%',
        marginBottom: '30px',
        width: '120%',
        paddingBottom: '0px',
        display: 'flex',
        flexDirection: 'column',
    },
    about: {
        backgroundColor: '#dd2c00',
        padding: '10px',
        color: '#263238',
        marginRight: '1000px',
        fontWeight: 'bold',
        border: '1px #DCDCDC',
        borderRadius: '10px',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '50%',
        backgroundColor: '#dd2c00',
        justify: 'center',
        fontWeight: 'bold',
        border: '1px #DCDCDC',
        borderRadius: '10px',
        padding: '10px',
        input: {
            "&::placeholder": {
                fontWeight: 'bold',
            },
        }
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
        marginBottom: '10px',
        display: 'grid'
    },
    lndHead: {
        backgroundColor: '#dd2c00',
        border: '1px #DCDCDC',
        borderRadius: '10px',
        fontWeight: 'bold',
    },
    
    drawer: {
        marginLeft: '50px',

    },
    noteButton: {
        marginRight: "5px",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    searchGrid: {
        padding: '20px 0',
        display: 'flex',
        margin: 'auto',
        maxWidth: '1300'
    },
    searchCard: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '30px',
        justifyContent: 'center',
    },
    searchItem: {
        // marginRight: '10px',
    },
    profButtons: {
        justifyContent: 'center',
        display: 'flex',
        margin: 'auto',
    },
    select: {
        minWidth: 120,
    },
    addHeader: {
        backgroundColor: '#dd2c00',
        border: '1px #DCDCDC',
        borderRadius: '10px',
        padding: '10px',
        color: '#263238',
        fontWeight: 'bold',
    },
    cardWrap: {
        justify: 'center',
        alignItems: 'center'
    },
    searchSelect: {
        backgroundColor: '#dd2c00',
        margin: theme.spacing(1),
        minWidth: 120,
        backgroundColor: '#dd2c00',
        justify: 'center',
        fontWeight: 'bold',
        border: '1px #DCDCDC',
        borderRadius: '10px',
        padding: '10px',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '50px',
    },
    detailsText: {
        paddingRight: '500px',
        marginLeft: '50px',
    },
}))

export default useStyles;