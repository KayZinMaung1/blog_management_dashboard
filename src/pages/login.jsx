import styled from "@emotion/styled";
import { Avatar, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useState } from "react";
import ContainedButton from "../components/ContainedButton";
import loginImage from "../utils/images/login.jpg";
import logo from "../utils/images/logo.jpg";
import { useDispatch } from "react-redux";
import { login } from "../store/actions";

const Image = styled(Box)(({ theme }) => ({
    height: "70vh",
    position: "relative",
    backgroundImage: `url(${loginImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderTopLeftRadius: "50px",
    borderBottomLeftRadius: "50px"
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    borderRadius: "50px",
    maxWidth: "100%",
    elevation: 1,
}));


const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();


    const handleLogin = () => {
        const data = {
            userName: userName,
            password: password
        }
        dispatch(login(data));
    }

    return (
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ p: "15vh" }}>
            <Container sx={{ minWidth: "70vw", height: "70vh" }} >
                <StyledPaper>
                    <Grid container alignItems="center">
                        <Grid item lg={6} xs={0}>
                            <Image />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <Container
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "90%",
                                }}
                            >
                                <Stack spacing={2} sx={{ alignItems: "center", alignContent: "center" }}>
                                    <Avatar
                                        alt="Second Tap Root"
                                        src={logo}
                                        sx={{ width: 80, height: 80, border: "0px solid var(--medium-grey)", p: "10px" }}
                                    />
                                    <Typography
                                        variant="h4"
                                        component="h1"
                                    >
                                        <b>Welcome!</b>
                                    </Typography>
                                    <Typography variant="body2" fontSize={14} fontWeight={200}>
                                        Sign in here to get started!
                                    </Typography>
                                    <TextField
                                        required
                                        name="userName"
                                        placeholder="Username"
                                        label="Username"
                                        sx={{ width: "100%" }}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                    <TextField
                                        required
                                        name="password"
                                        type="password"
                                        placeholder="password"
                                        label="Password"
                                        sx={{ width: "100%" }}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <ContainedButton text="Login" onClick={handleLogin} />

                                </Stack>

                            </Container>
                        </Grid>
                    </Grid>
                </StyledPaper>
            </Container>
        </Box>




    );
}
export default Login;