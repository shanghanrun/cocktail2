import { Box, Grid, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";

function SelectList({ data, selected, setSelected, setLevel, correctNumber }) {
	const handlerselecte = (index) => {
		let newSelected = [...selected];
		newSelected[index] = 1;
		setSelected(newSelected);
		if (index !== correctNumber) {
			setLevel((prev) => prev - 1);
		}
	};

	return (
		<Box>
			<Grid container spacing={2}>
				{data?.drinks.slice(0, 6).map((item, index) => (
					<Grid item xs={6} key={index}>
						<ListItem>
							<ListItemButton
								onClick={() => handlerselecte(index)}
								disabled={selected[index] === 1}
							>
								<ListItemText primary={item.strDrink} />
							</ListItemButton>
						</ListItem>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default SelectList;
