import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        background: "rgba(0, 0, 0, 0.1)",
        boxShadow: "0 8px 32px 0 rgba(38, 38, 38, 0.5)",
        border: "1px solid rgba( 255, 255, 255, 0.18)",
        backdropFilter: "blur(2px)",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center"
    },
    active: {
        background: "rgba(255, 255, 255, 0.25)",
        boxShadow: "0 20px 32px 0 rgba(135, 135, 135, 0.2)",
        border: "1px solid rgba( 255, 255, 255, 0.18)",
        backdropFilter: "blur(8px)",
    },
    avatar: {
        margin: "10px auto",
        width: "96px",
        height: "96px",
        [theme.breakpoints.down('sm')]: {
            width: "64px",
            height: "64px",
        }
    },
    cardactions: {
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            float: "right"
        }
    },
    cardcontent: {
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            float: "left"
        }
    },
    h2: {
        [theme.breakpoints.down('sm')]: {
            fontSize: "1rem"
        }
    }

}));

export default function ContactCard(props) {
  const active = props.active;
  const classes = useStyles();

    const handleSelect = (e) => {
        props.onSelect(e);
    }
  return (
      <Card className={clsx(
          classes.root,
          {
              [classes.active]: active === true
          })}>
          <CardActionArea component="div">
              
              <CardContent className={classes.cardcontent}>
                    <Avatar
                        className={classes.avatar}
                        alt={props.name}
                        src={props.src}
                    />
                  <Typography gutterBottom variant="h5" component="h2" align="center" className={classes.h2}>
                                {props.name}
                    </Typography>
         
              </CardContent>
              <CardActions className={classes.cardactions}>
                  <Button size="small" variant={active ? "outlined" :"contained"} color="secondary" onClick={(e) => handleSelect(props.id)}>
                      {active ? "SELECTED" : "SELECT"}
                </Button>
              </CardActions>
          </CardActionArea>

      
    </Card>
  );
}
