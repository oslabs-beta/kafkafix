import React, { FC } from 'react';
import {
	Button,
	List,
	Divider,
	ListItem,
	ListItemText,
	Typography,
	ButtonGroup,
} from '@material-ui/core';
import {
	Assessment,
	BugReport,
	Brightness4,
	Description,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import GroupIcon from '@material-ui/icons/Group';
import TableChartIcon from '@material-ui/icons/TableChart';

export const LeftSidePanel: FC = () => {
	return (
		<>
			<div role='presentation' className='list'>
				<List className='topHalfList'>
					<Typography
						variant='h4'
						component='h2'
						className='logoOnMenu'
					>
						KafkaFix
					</Typography>
					<Divider />

					<Link to='metrics' style={{ textDecoration: 'none', color: 'black' }}>
						<ListItem button key='Metrics' className='listItem'>
							<Assessment></Assessment>
							<ListItemText
								primary='Metrics'
								className='listItemText'
							/>
						</ListItem>
					</Link>

					{/* list item 2 */}
					<Link
						to='failureReports'
						style={{ textDecoration: 'none', color: 'black' }}
					>
						<ListItem button key='Failure Reports' className='listItem'>
							<BugReport></BugReport>
							<ListItemText
								primary='Failure Reports'
								className='listItemText'
							/>
						</ListItem>
					</Link>

					<Link
						to='partition/topic1/part1'
						style={{ textDecoration: 'none', color: 'black' }}
					>
						<ListItem button key='Visualize Streams' className='listItem'>
							<TableChartIcon />
							<ListItemText
								primary='Visualize Streams'
								className='listItemText'
							>
								Message Streams
							</ListItemText>
						</ListItem>
					</Link>

					{/* New Item - Groups */}
					{/* <Link to='Groups' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button key='Groups' className={classes.listItem}>
              <GroupIcon></GroupIcon>
              <ListItemText
                primary='Consumer Groups'
                className={classes.listItemText}
              />
            </ListItem>
          </Link>
          <Divider />
       */}
				</List>

				<List className='bottomHalfList'>
					{/* list item 3 */}
					<Divider />
					<ListItem button key='Dark Mode' className='listItem'>
						<Brightness4></Brightness4>
						<ListItemText
							primary='Dark Mode'
							className='listItemText'
						/>
					</ListItem>

					{/* list item 4  -- need to add a link to our documentation */}

					<ListItem button key='Documentation' className='listItem'>
						<Description></Description>
						<ListItemText primary='Documentation' className='listItemText' />
					</ListItem>

					{/* List item 5 -- need to add a link to our privacy policies and need to add a link to our Terms and conditions */}

					<ListItem key='ButtonGroup' className='listItem'>
						<ButtonGroup className='buttonGroup'>
							<Button>Privacy</Button>
							<Button>Terms</Button>
						</ButtonGroup>
					</ListItem>
				</List>
			</div>
		</>
	);
};
