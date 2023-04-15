import { Button, CircularProgress, Grid, IconButton, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import * as services from '../Services/wakilni-services.proxy';

const LogIn = services.Login;

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const navigate = useNavigate();

    useEffect(() => {
        let apiTest = true;
        if (apiTest) {
            if (email === "" || password === "") setIsDisabled(true);
            else setIsDisabled(false);
        }
        return () => {
            apiTest = false;
        }
    }, [email, password])

    const data = {
        email: email,
        password: password
    }

    return (
        <Grid
            container
            direction='column' alignItems='center' justifyContent='center'
            bgcolor='#eaf0f5'
            height='100vh'
            padding={20} gap={2}>
            <Grid item sx={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'Muli' }}>Login</Grid>
            <Grid item container
                direction='column' alignItems='center' justifyContent='center'
                padding={5}
                gap={1}
                sx={{
                    boxShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.16)',
                    border: 'solid 1px #eaf0f5',
                    borderRadius: 5,
                    backgroundColor: '#fff',
                    width: '500px'
                }}>
                <Grid
                    item
                    container
                    direction="column"
                    alignItems='center'
                    justifyContent='center'
                    gap={1}
                >
                    <Grid item>Email</Grid>
                    <Grid item width="250px">
                        <TextField
                            fullWidth
                            value={email}
                            size="small"
                            InputProps={{
                                style: {
                                    backgroundColor: "#fff",
                                },
                            }}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    alignItems='center'
                    justifyContent='center'
                    gap={1}
                >
                    <Grid item>Password</Grid>
                    <Grid item>
                        <TextField
                            type={showPassword ? "text" : "password"}
                            size="small"
                            InputProps={{
                                style: {
                                    backgroundColor: "#fff",
                                },
                                endAdornment: (
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <Visibility htmlColor="rgba(6, 116, 185, 0.5)" />
                                        ) : (
                                            <VisibilityOff htmlColor="rgba(6, 116, 185, 0.5)" />
                                        )}
                                    </IconButton>
                                ),
                            }}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            value={password}
                        />
                    </Grid>
                </Grid>
                <Grid item width="250px">
                    <Button
                        variant="contained"
                        disabled={isDisabled || loadingProgress}
                        onClick={() => {
                            setLoadingProgress(true);
                            LogIn(data).then((res) => {
                                if (res.token) {
                                    localStorage.setItem("accessToken", res.token)
                                    navigate('/')
                                    setLoginError(false);
                                    setLoadingProgress(false);
                                }
                                else {
                                    setLoginError(true);
                                    setLoadingProgress(false);
                                }
                            })
                        }}
                        fullWidth
                    >
                        Log In &nbsp;
                        {loadingProgress && (
                            <CircularProgress
                                size={20}
                            />
                        )}
                    </Button>
                    {loginError ? "Incorrect email address and / or password." : ""}
                </Grid>
                <Grid item sx={{ fontWeight: 'bold', fontFamily: 'Muli' }}>Don't have an account?
                    <Link to='/signup'>Signup</Link>
                </Grid>
            </Grid>
        </Grid>
    )
}
