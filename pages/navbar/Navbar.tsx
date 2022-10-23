import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from "react"
import { createStyles, Header, Group, Burger, Container, Box, Text, Button, HoverCard, Center, useMantineTheme, SimpleGrid, UnstyledButton, Anchor, ScrollArea, Drawer, Collapse } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons';
import {CocktailDB} from '../cocktaildb/cocktaildb';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  header:
  {
    background: "rgba(0,0,0,0.8)",
    position: "fixed",
    top: 0,
    transition: "top 0.3s"
  }
  ,
  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    top: 0,
    lineHeight: 1,
    padding: '8px 12px',
    cursor: "pointer",
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.lg,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.orange[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.gray[7]
    },
  },

  linkLabel: {
    marginRight: 5,
  },
  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
  },
  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },
  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },


}));

const api = new CocktailDB()

function getGlasses(): Promise<{
  strGlass: string | null;
}[]> {
  const glasses = api.listOfGlasses().then(val => {
    return val.drinks
  })
  return glasses
}
function getCategories(): Promise<{
  strCategory: string | null;
}[]> {
  const categories = api.listOfCategories().then(val => {
    return val.drinks
  })
  return categories
}


export default function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [glassLinksOpened, { toggle: glassToggleLinks }] = useDisclosure(false);
  const [categorylinksOpened, { toggle: categoryToggleLinks }] = useDisclosure(false);
  const [activeGlass, setActiveGlass] = useState("Glasses")
  const [activeCategory, setActiveCategory] = useState("Categories")
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [categories, setCategories] = useState<{
    strCategory: string | null;
  }[]>([])
  const [glasses, setGlasses] = useState<{
    strGlass: string | null;
  }[]>([])
  const router = useRouter()


  useEffect(() => {
    getGlasses().then(glasses => setGlasses(glasses))
    getCategories().then(categories => setCategories(categories))
  }, [])
  const changeGlass = (glass: string) => {
    setActiveGlass(glass)
    setActiveCategory("Categories")
    router.push({
      pathname: "/drinks",
      query: {
        "glass": glass
      },
    })
    close()
  }
  const changeCategory = (category: string) => {
    setActiveCategory(category)
    setActiveGlass("Glasses")
    router.push({
      pathname: "/drinks",
      query: {
        "category": category
      }
    })
    close()
  }
  const clearGlass = () => {
    setActiveGlass("Glasses")
    router.push({
      pathname: "/drinks",
    })
    close()
  }
  const clearCategory = () => {
    setActiveCategory("Categories")
    router.push({
      pathname: "/drinks",
    })
    close()
  }

  const clearGlassAndCategory = () => {
    clearGlass()
    clearCategory()
    close()

  }

  const glassesLinks = glasses.map((item) => (
    <UnstyledButton onClick={() => {
      changeGlass(item.strGlass as string)
      glassToggleLinks()
    }} className={classes.subLink} key={item.strGlass}>
      <Group noWrap align="flex-start">
        <Box>
          <Text size="sm" weight={500}>
            {item.strGlass}
          </Text>
        </Box>
      </Group>
    </UnstyledButton>
  ));
  const categoriesLinks = categories.map((item) => (
    <UnstyledButton onClick={() => {
      changeCategory(item.strCategory as string)
      categoryToggleLinks()
    }} className={classes.subLink} key={item.strCategory}>
      <Group noWrap align="flex-start">
        <Box>
          <Text size="sm" weight={500}>
            {item.strCategory}
          </Text>
        </Box>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box>
      <Header height={56} mb={0} className={classes.header} >
        <Container>
          <Box className={classes.inner}>
            <Image priority src="/logo.png" alt='CocktailMash' height={36} width={162} />
            <Group spacing={5} className={classes.links}>

              <Link
                key={"home"}
                href={"/"}
              >
                <Box
                  onClick={clearGlassAndCategory}
                  className={classes.link}>
                  Home
                </Box>
              </Link>

              <Link
                key={"drinks"}
                href={"/drinks"}
              >
                <Box
                  onClick={clearGlassAndCategory}
                  className={classes.link}>
                  Drinks
                </Box>
              </Link>
              <Link
                href={"/ingredients"}
                key={"ingredients"}
              >
                <Box
                  onClick={clearGlassAndCategory}
                  className={classes.link}>

                  Ingredients
                </Box>
              </Link>
              <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                <HoverCard.Target>
                  <Box className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        {activeGlass}
                      </Box>
                      <IconChevronDown size={16} color={theme.colors.dark[2]} />
                    </Center>
                  </Box>
                </HoverCard.Target>

                <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                  <Group position="apart" px="md">
                    <Text weight={500}>Glasses</Text>
                    <Anchor onClick={clearGlass} size="xs">
                      Clear
                    </Anchor>
                  </Group>

                  <Box
                    my="sm"
                    mx="-md"
                    color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                  />

                  <SimpleGrid cols={2} spacing={0}>
                    {glassesLinks}
                  </SimpleGrid>
                </HoverCard.Dropdown>
              </HoverCard>
              <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                <HoverCard.Target>
                  <Box className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        {activeCategory}
                      </Box>
                      <IconChevronDown size={16} color={theme.colors.dark[2]} />
                    </Center>
                  </Box>
                </HoverCard.Target>

                <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                  <Group position="apart" px="md">
                    <Text weight={500}>Categories</Text>
                    <Anchor onClick={clearCategory} color={theme.colors.orange[6]} size="xs">
                      Clear
                    </Anchor>
                  </Group>

                  <Box
                    my="sm"
                    mx="-md"
                    color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                  />

                  <SimpleGrid cols={2} spacing={0}>
                    {categoriesLinks}
                  </SimpleGrid>
                </HoverCard.Dropdown>
              </HoverCard>
            </Group>
            <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
          </Box>
        </Container>
      </Header>
      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
          <Box my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Link
            key={"home"}
            href={"/"}
          >
            <Box
              onClick={clearGlassAndCategory}

              className={classes.link}>
              Home
            </Box>
          </Link>
          <Link
            key={"drinks"}
            href={"/drinks"}
          >
            <Box
              onClick={clearGlassAndCategory}

              className={classes.link}>
              Drinks
            </Box>
          </Link>

          <Link
            key={"ingredients"}
            href={"/ingredients"}
          >
            <Box
              onClick={clearGlassAndCategory}
              className={classes.link}>
              Ingredients
            </Box>
          </Link>
          <Group pr="md" >
            <UnstyledButton className={classes.link} onClick={glassToggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  {activeGlass}
                </Box>
                <IconChevronDown size={16} color={theme.colors.dark[2]} />
              </Center>
            </UnstyledButton>
            <Anchor onClick={clearGlass} color={theme.colors.orange[6]} size="xs">
              Clear
            </Anchor>
          </Group>

          <Collapse in={glassLinksOpened}>{glassesLinks}</Collapse>
          <Group>
            <UnstyledButton className={classes.link} onClick={categoryToggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  {activeCategory}
                </Box>
                <IconChevronDown size={16} color={theme.colors.dark[2]} />
              </Center>
            </UnstyledButton>
            <Anchor onClick={clearCategory} color={theme.colors.orange[6]} size="xs">
              Clear
            </Anchor>
          </Group>

          <Collapse in={categorylinksOpened}>{categoriesLinks}</Collapse>

          <Box my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

        </ScrollArea>
      </Drawer>
    </Box>
  );
}