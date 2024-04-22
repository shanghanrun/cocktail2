import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Typography, Link, GlobalStyles, Box, Stack } from "@mui/material";

function Copyright(props) {
	return (
		<Typography variant="body2" sx={{ color: "#000", mb: 1 }} align="center" {...props}>
			{"Copyright © "}
			<Link color="inherit" href="/">
				EasyCode
			</Link>
			{new Date().getFullYear()}
		</Typography>
	);
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Footer() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }} />
			<CssBaseline />
			{/* Footer */}
			<div maxWidth="lg" component="footer">
				<Box
					sx={{
						bgcolor: "#FD4926",
						p: 3,
						pb: 2,
					}}
				>
					<Stack gap={2}>
						<Typography
							component="div"
							variant="h6"
							noWrap
							flexGrow="1"
							sx={{ textAlign: "center" }}
						>
							<Link href="/search" underline="none" sx={{ color: "#000", fontWeight: 900 }}>
								SEARCH
							</Link>
						</Typography>
						<Typography
							component="div"
							variant="h6"
							noWrap
							flexGrow="1"
							sx={{ textAlign: "center" }}
						>
							<Link href="/customlist" underline="none" sx={{ color: "#000", fontWeight: 900 }}>
								COMMUNITY
							</Link>
						</Typography>
						<Typography
							component="div"
							variant="h6"
							noWrap
							flexGrow="1"
							sx={{ textAlign: "center" }}
						>
							<Link href="/game" underline="none" sx={{ color: "#000", fontWeight: 900 }}>
								GAME
							</Link>
						</Typography>
					</Stack>
					<Typography
						component="div"
						variant="h3"
						noWrap
						flexGrow="1"
						sx={{ textAlign: "center", mt: 3, mb: 4 }}
					>
						<Link
							href="/"
							underline="none"
							sx={{ color: "#000", fontWeight: 900, WebkitTextStroke: "2px black" }}
						>
							Shake & Drink
						</Link>
					</Typography>
					<Copyright />
				</Box>
			</div>
			{/* End footer */}
		</ThemeProvider>
	);
}
