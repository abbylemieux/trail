import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="first">
      <Tabs.List justify="space-between">
        <Tabs.Tab value="first">Login Info</Tabs.Tab>
        <Tabs.Tab value="second">Trails Visited</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}

export default Demo;