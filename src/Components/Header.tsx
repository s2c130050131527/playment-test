import { useContext, useEffect, useState } from 'react';

import { Button, Stack } from '@chakra-ui/react';

import { TriggerContext } from '../Context/ButtonTriggerContext';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { trigger, setTrigger } = useContext(TriggerContext);
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const startTheme = localStorage.getItem('theme');
    console.log(startTheme);
    if (startTheme) {
      setTheme(theme);
    } else {
      localStorage.setItem('theme', 'light');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={styles.headerMain}
      style={{
        background: theme === 'light' ? '#fff' : '#101010',
      }}
    >
      <Stack align="center" direction="row" spacing={4}>
        <Button
          colorScheme={theme === 'light' ? 'teal' : 'whiteAlpha'}
          onClick={() => setTrigger('Download')}
          variant="ghost"
        >
          Save as a file
        </Button>
        <Button
          colorScheme={theme === 'light' ? 'teal' : 'whiteAlpha'}
          onClick={() => {
            if (theme === 'light') {
              localStorage.setItem('theme', 'dark');
              setTheme('dark');
            } else {
              localStorage.setItem('theme', 'light');
              setTheme('light');
            }
            setTrigger('Theme');
          }}
          variant="ghost"
        >
          Toggle Theme
        </Button>
        <Button
          colorScheme={theme === 'light' ? 'teal' : 'whiteAlpha'}
          onClick={() => setTrigger('Format')}
          variant="ghost"
        >
          Format
        </Button>
        <Button
          colorScheme={theme === 'light' ? 'teal' : 'whiteAlpha'}
          onClick={() => setTrigger('Run')}
          variant="solid"
        >
          Run &gt;
        </Button>
      </Stack>
    </div>
  );
};

export default Header;
