import React, { FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MTPaginationOptions } from './MTPaginationOptions';
import { appendMessageActionCreator } from '../../state/actions/actions';

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableFooter,
	TablePagination,
	Paper,
	makeStyles,
} from '@material-ui/core';

const useRowStyles = makeStyles({
	root: {
		'& > *': {
			borderBottom: 'unset',
		},
	},
	tableWrapper: {
		margin: 30,
	},
	tableHeaderRow: {
		backgroundColor: 'black',
	},
	tableHeaderText: {
		color: 'white',
		fontWeight: 'bold',
	},
});

interface MessageTableProps {
	messages: {}[];
	setMessages: React.Dispatch<React.SetStateAction<{}[]>>;
}

export const MessageTable: FC<MessageTableProps> = ({
	messages,
	setMessages,
}) => {
	const classes = useRowStyles();

	const flattenObj = (obj: any) => {
		const flatObj: any = {};
		Object.keys(obj).forEach(key => {
			if (typeof obj[key] === 'object')
				Object.assign(flatObj, flattenObj(obj[key]));
			else flatObj[key] = obj[key];
		});
		return flatObj;
	};

	messages = messages.map(el => flattenObj(el));

	const [pageSize, setPageSize] = useState(25);
	const [pageIndex, setPageIndex] = useState(
		Math.floor(messages.length / pageSize)
	);
	const [togglePause, setTogglePause] = useState(false);
	const start = pageIndex * pageSize;
	const end = Math.min(start + pageSize, messages.length);
	const showMessages = messages.slice(start, end);
	const numEmptyRows = pageSize - (end - start);
	const emptyRows = [];
	for (let i = 0; i < numEmptyRows; i++) {
		emptyRows.push(
			<TableRow key={'emptyRow' + i} style={{ height: 53 }}>
				<TableCell
					colSpan={messages[0] ? Object.keys(messages[0]).length : 0}
				/>
			</TableRow>
		);
	}

	const dispatch = useDispatch();

  useEffect(()=>{
    if (!togglePause) setPageIndex(Math.floor(messages.length / pageSize));
  }, [messages]) 

	const handleChangePage = (
		e: React.MouseEvent<HTMLButtonElement> | null,
		pageIndex: number
	) => {
		setPageIndex(pageIndex);
	};

	const handleChangePageSize = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const newPageIndex = Math.floor(start / parseInt(e.target.value));
		if (newPageIndex === Math.floor(messages.length / pageSize))
			setTogglePause(false);
		else setTogglePause(true);
		setPageSize(parseInt(e.target.value));
		setPageIndex(newPageIndex);
	};

	return (
		<div className={classes.root}>
			<TableContainer component={Paper} className={classes.tableWrapper}>
				<Table aria-label='custom pagination table'>
					<TableHead>
						<TableRow className={classes.tableHeaderRow}>
							{messages[0] &&
								Object.keys(messages[0]).map(key => (
									<TableCell style={{ color: 'white' }}>{key}</TableCell>
								))}
						</TableRow>
					</TableHead>

					<TableBody>
						{showMessages.map((el, index) => (
							<TableRow key={index} style={{ height: 53 }}>
								{Object.values(el).map((value: any) => (
									<TableCell>{value}</TableCell>
								))}
							</TableRow>
						))}
						{emptyRows}
					</TableBody>

					<TableFooter>
						<TableRow style={{ height: 53 }}>
							<TablePagination
								rowsPerPageOptions={[25, 50, 100]}
								count={messages.length}
								rowsPerPage={pageSize}
								page={pageIndex}
								SelectProps={{
									inputProps: { 'aria-label': 'rows per page' },
									native: true,
								}}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangePageSize}
								ActionsComponent={props => (
									<MTPaginationOptions
										{...props}
										togglePause={togglePause}
										setTogglePause={setTogglePause}
										pageIndex={pageIndex}
										pageSize={pageSize}
										totalMessages={messages.length}
									/>
								)}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</div>
	);
};
