import { useContext } from 'react';

import { Button, Stack } from '@chakra-ui/react';

import { TriggerContext } from '../Context/ButtonTriggerContext';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { setTrigger } = useContext(TriggerContext);
  return (
    <div className={styles.headerMain}>
      <Stack align="center" direction="row" spacing={4}>
        <Button colorScheme="teal" variant="ghost">
          Save
        </Button>
        <Button colorScheme="teal" variant="ghost">
          Toggle Theme
        </Button>
        <Button
          colorScheme="teal"
          onClick={() => setTrigger('Format')}
          variant="ghost"
        >
          Format
        </Button>
        <Button
          colorScheme="teal"
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
