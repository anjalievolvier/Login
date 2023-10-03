import React, { useEffect, useState } from 'react';
import { Box} from '@mui/material';
import BgImage from '../Components/BgImage';
import LoginBox from '../Components/LoginBox';
import Logo from '../Components/Logo';

const Login = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      sx={{ backgroundColor: '#180E95' }}
    >
      {isMobile ? (
        <>
          <BgImage isMobile={true} />
          <Logo isMobile={true} />
          <LoginBox isMobile={true} />
        </>
      ) : (
        <>
          <Logo />
          <LoginBox />
          <BgImage />
        </>
      )}
    </Box>
  );
};

export default Login;







