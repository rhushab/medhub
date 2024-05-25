import * as React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {IconButton} from "@mui/material";
import {changePassword} from "../../services/PharmacyProfileService";
import SideNavBarPharmacy from "../../components/SideNavBarPharmacy";
import AlertMessage from "../../components/AlertMessage";

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


export default function ChangePasswordPharmacy() {
    const [isAlert, setIsAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertStatus, setAlertStatus] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [helperText,setHelperText]=useState("Password is required and must contain one letter, one special character and one digit, and must be be at least 8 characters long.");


    const handleSubmit = () => {
        if (!password)
        {
            setHelperText("Password is required and must contain one letter, one special character and one digit, and must be be at least 8 characters long.");
            setPasswordError(true);
            return;// Set error message
        }
        if (!confirmPassword)
        {
            setHelperText("Password is required and must contain one letter, one special character and one digit, and must be be at least 8 characters long.");
            setConfirmPasswordError(true);
            return;// Set error message
        }
        if (password !== confirmPassword) {
            setPasswordError(false);
            setHelperText("Passwords do not match");
            setConfirmPasswordError(true); // Set error message
            return; // Exit function early
        }
        const data = new FormData();
        data.append("new_password",confirmPassword)
        changePassword(data)
            .then((res) => {
                setIsAlert(true);
                setAlertMessage(res["message"]);
                setAlertStatus(res["status"]);
            })
            .catch((err) => {
                console.log(err);
            });

        // Reset error message if passwords match
        setConfirmPasswordError("");
        // Continue with form submission or other actions
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleToggleChangePasswordVisibility = () => {
        setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
    };


    useEffect(() => {
        // call this function to fetch data
        //fetchData();
    }, []);
    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{display: "flex"}}>
            {isAlert && <AlertMessage message={alertMessage} status={alertStatus} />}
            <SideNavBarPharmacy/>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <DrawerHeader/>
                <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper sx={{p: 2, display: "flex", flexDirection: "column"}}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" gutterBottom>
                                        Change Password
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        helperText={
                                            passwordError
                                                ? helperText
                                                : ""
                                        }
                                        error={passwordError}
                                        InputProps={{
                                            endAdornment: (
                                                <VisibilityIconButton
                                                    onClick={handleTogglePasswordVisibility}
                                                    showPassword={showPassword}
                                                />
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="ConfirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        autoComplete="current-password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        helperText={
                                            confirmPasswordError
                                                ? helperText
                                                : ""
                                        }
                                        error={confirmPasswordError}
                                        InputProps={{
                                            endAdornment: (
                                                <VisibilityIconButton
                                                    onClick={handleToggleChangePasswordVisibility}
                                                    showPassword={showConfirmPassword}
                                                />
                                            ),
                                        }}
                                    />
                                </Grid>
                                <br/>
                                <Grid item md={2} sx={4}>
                                    <Button variant="contained" onClick={handleSubmit}>Change Password</Button>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}


function VisibilityIconButton({ onClick, showPassword }) {
    return (
        <IconButton
            aria-label="toggle password visibility"
            onClick={onClick}
            edge="end"
        >
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
    );
}