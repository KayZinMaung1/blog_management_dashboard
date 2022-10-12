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
    height: "80vh",
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
    elevation: 1
}));


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();


    const handleLogin = () => {
        const data = {
            email: email,
            password: password
        }
        dispatch(login(data));
    }

    return (
        <Container sx={{ maxWidth: "70%", mt: "5%" }}>
            <StyledPaper >
                <Grid container>
                    <Grid item lg={6} xs={0}>
                        <Image />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <Container
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "90%",
                                mt: "20%",
                            }}
                        >
                            <Stack spacing={2} sx={{ alignItems: "center", alignContent: "center" }}>
                                <Avatar
                                    alt="Second Tap Root"
                                    src={logo}
                                    sx={{ width: 56, height: 56, border: "0px solid var(--medium-grey)", p: "10px" }}
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
                                    name="email"
                                    type="email"
                                    placeholder="johndoe@email.com"
                                    label="Email"
                                    sx={{ width: "100%" }}
                                    onChange={(e) => setEmail(e.target.value)}
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



    );
}
export default Login;