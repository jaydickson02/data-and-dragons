// pages/second.js
import { useRouter } from 'next/router';
import { HiOutlineChevronLeft } from 'react-icons/hi2';

export default function SecondPage() {
  const router = useRouter();

  function handleClick() {
    router.back();
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Second Page</h1>
      <button
        onClick={handleClick}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '10px',
          backgroundColor: '#0070f3',
          color: 'white',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <HiOutlineChevronLeft style={{ marginRight: '5px' }} />
        Go Back
      </button>
    </div>
  );
}