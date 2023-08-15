import { Button } from '@mui/material';
import './styles.scss'
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate()
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <Button variant='contained' onClick={() => {
        navigate('/')
      }}>Go to home</Button>
    </div>
  );
}
