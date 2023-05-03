import executeQuery from '../../lib/db';

export default function testDB({ characters }) {
  return (
    <div>
      <h1>Characters in Database:</h1>
      <ul>
        {characters.map((char) => (
          <li key={char.ID}>{char.Name}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const { error, results } = await executeQuery({
    query: 'SELECT * FROM characters',
    values: [],
  });

  if (error) {
    console.error(error);
    return { props: { characters: [] } };
  }

  return { props: { characters: results } };
}
