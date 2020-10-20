import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'antd';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
    return (
        !isAuthenticated ? (
            <Button onClick={() => loginWithRedirect()}>
                Log In
            </Button>
        ) : (
                <Button onClick={() => logout({ returnTo: window.location.origin })}>
                    Log Out
                </Button>
            )
    );
}

export default LoginButton;