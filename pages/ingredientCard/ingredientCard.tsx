import { Card, Image, Text, Group, Badge, createStyles, UnstyledButton, Loader, useMantineTheme } from '@mantine/core';
import { useRouter } from 'next/router';
import {useRef} from "react"

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
  img:{
    backgroundColor:"rgba(0,0,0,0.2)"
  }
}));

interface IngredientCardProps {
  name: string;
  height?:number
}

export function IngredientCard({name,height }: IngredientCardProps) {
  const { classes } = useStyles();
  const router = useRouter()
  const imgSRC = `https://www.thecocktaildb.com/images/ingredients/${name}.png`
  return (
    <UnstyledButton onClick={()=>router.push({
        pathname:"/drinks",
        query:{
            "ingredient":name
        }
    })} >
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
     
        <img  className={classes.img} src={imgSRC} alt={name} style={{height:height&&height||300}} />
      
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text size="lg" weight={500}>
            {name.length>20?`${name.substring(0,20)}...`:name}
          </Text>
        </Group>
      </Card.Section>

    </Card>
    </UnstyledButton>
  );
}