import React from 'react';
import { AppShell, Burger, TextInput} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Header() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell.Header>
      <Burger
        opened={opened}
        onClick={toggle}
        hiddenFrom="sm"
        size="sm"
      />
      <div>Logo</div>
    </AppShell.Header>
  );
}

export default Header;