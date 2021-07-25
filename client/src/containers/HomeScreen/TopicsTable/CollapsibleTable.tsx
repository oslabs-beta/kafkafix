import React, { FC, useState } from 'react';
import { CollapsibleTableHeaders } from './CollapsibleTableHeaders';
import {
	DataEntries,
	partitionDataEntries,
} from '../../../state/reducers/kafkaDataReducer';
import {
	Button,
	Box,
	Collapse,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from '@material-ui/core';
import { CreatePartitionModal } from './CreatePartitionModal';

interface CollapsibleTableProps {
	openTable: boolean;
	dataEntries: DataEntries;
}

export const CollapsibleTable: FC<CollapsibleTableProps> = ({
	openTable,
	dataEntries,
}) => {
	const [openPartitionModal, setOpenPartitionModal] = useState<boolean>(false);
	return (
		<Collapse in={openTable} timeout='auto' unmountOnExit>
			<Box margin={3}>
				<div className='innerTableTitle'>
					<Typography
						style={{ fontWeight: 'bold' }}
						align='left'
						variant='h6'
						gutterBottom
						component='div'
					>
						Partitions
					</Typography>
					<Button
						onClick={() => setOpenPartitionModal(true)}
						variant='text'
						className='primaryButtons'
					>
						Create Partition
					</Button>
				</div>

				<Table size='small' aria-label='partitions'>
					{/* Table headers for Partitions */}
					<CollapsibleTableHeaders />

					{/* Table Body */}
					<TableBody>
						{dataEntries.partitionData.map((data: partitionDataEntries) => (
							<TableRow hover={true} key={data.id}>
								<TableCell>{data.id}</TableCell>
								<TableCell>{data.leader.toString()}</TableCell>
								<TableCell>{data.partitionErrorCode}</TableCell>
								<TableCell>{data.isr}</TableCell>
								<TableCell>{data.replicas}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<CreatePartitionModal
					modalStatus={openPartitionModal}
					setModalStatus={setOpenPartitionModal}
					topic={dataEntries.topicName}
					currPartitionNumber={dataEntries.partitions}
				/>
			</Box>
		</Collapse>
	);
};
