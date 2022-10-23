import { Card, Image, Text, Group, Badge, createStyles, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
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
  img: {
    backgroundColor: "rgba(0,0,0,0.2)"
  }
}));

interface DrinkCardProps {
  id: string,
  image: string;
  name: string;
  height: number
}

export function DrinkCard({ image, name, height, id }: DrinkCardProps) {
  const { classes, theme } = useStyles();
   const router = useRouter()
  const onClick = ()=>{
    router.push({
      pathname:"/drinkDetails",
      query:{
        "id":id
      }
    })
  }
  return (
    <UnstyledButton onClick={onClick} >
      <Card withBorder radius="md" p="md" className={classes.card}>
        <Card.Section>
          <Image className={classes.img} src={image} alt={name} height={height} />
        </Card.Section>

        <Card.Section className={classes.section} mt="md">
          <Group position="apart">
            <Text size="lg" weight={500}>
              {name.substring(0, 20)}
            </Text>
          </Group>
        </Card.Section>

      </Card>
    </UnstyledButton>
  );
}