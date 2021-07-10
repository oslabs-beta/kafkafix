import React, { FC } from 'React';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);

interface TablePaginationActionsProp {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
  togglePause: boolean;
  setTogglePause: React.Dispatch<React.SetStateAction<boolean>>;
  pageIndex: number;
  pageSize: number;
  totalMessages: number;
}

export const MTPaginationOptions: FC<TablePaginationActionsProp> = (props) => {
  const classes = useStyles1();
  const theme = useTheme();

  const { count, page, rowsPerPage, onPageChange, togglePause, setTogglePause, pageIndex, pageSize, totalMessages } = props;

  const handleFirstPageButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(e, 0);
  };

  const handleBackButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(e, pageIndex - 1);
  };

  const handleNextButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(e, pageIndex + 1);
  };

  const handleLastPageButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(e, Math.floor(totalMessages / pageSize));
  };

  const handlePauseButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTogglePause(!togglePause);
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton onClick={handlePauseButtonClick}>
        {togglePause ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};
