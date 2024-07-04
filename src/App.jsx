import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { Button, Card, Image } from 'react-bootstrap'
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [address, setAddress] = useState("")
  const [solBalance, setSolBalance] = useState("0")

  const connectWallet = async () => {

    if (window.solana) {
      try {
        const resp = await window.solana.connect();
        setAddress(resp.publicKey.toString());
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('Phantom Wallet not found. Please install it.');
    }
  }

  const getBalance = async (addy) => {
    try {
      const connection = new Connection(import.meta.env.VITE_RPC);
      const publicKey = new PublicKey(addy);
      const balance = await connection.getBalance(publicKey);
      setSolBalance(balance / 1e9); // Convert lamports to SOL
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (address) {
      getBalance(address);
    }
  }, [address]);

  return (
    <>
      <div className="App container-fluid">
        <Card className="text-center w-full">
          <Card.Header>
            <strong>Address: </strong>
            {address}
          </Card.Header>
          <Card.Body>
            <Button
              onClick={connectWallet}
              variant="primary"
            >
              <Image src="/assets/solana.jfif" width={30} className='rounded rounded-circle' /> Connect to wallet
            </Button>
            <Card.Text>
            </Card.Text>
            {address && (

              <div className='d-flex gap-1 justify-content-center'>
                <Image src="/assets/solana.jfif" width={30} />
                {solBalance} SOL
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default App
