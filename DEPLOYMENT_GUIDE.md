# Deployment Guide - dApp E-commerce

## Why Deploy Smart Contracts?

**Smart contracts are like websites** - they need to be "hosted" on the blockchain before your frontend can use them.

### Without Deployment:
- ❌ Frontend can't find the contract (no address)
- ❌ Can't load products
- ❌ Can't add products  
- ❌ Can't process orders
- ❌ Everything breaks!

### With Deployment:
- ✅ Contract gets an address (like `0x5FbDB2315678afecb367f032d93F642f64180aa3`)
- ✅ Frontend connects to that address
- ✅ All features work!

---

## Step-by-Step Deployment Process

### 1. Start Hardhat Node (Terminal 1)
```powershell
cd blockchain
npx hardhat node
```
**Keep this running!** This is your local blockchain.

### 2. Deploy Contracts (Terminal 2)
```powershell
cd blockchain
npx hardhat run scripts/deploy.js --network localhost
```

**You'll see output like:**
```
contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

**IMPORTANT:** Copy this address! You'll need it for the frontend.

### 3. Get the Deployer Address (Owner)

The account that deploys becomes the **owner** (admin). From Terminal 1 (Hardhat node), you'll see:
```
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
```

If you deploy with Account #0, that address is your `CONTRACT_OWNER_ADDRESS`.

### 4. Set Up Frontend Environment Variables

Create `frontend/.env.local` file:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
NEXT_PUBLIC_CONTRACT_OWNER_ADDRESS=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
NEXT_PUBLIC_POLYGON_RPC_URL=http://127.0.0.1:8545
NEXT_PUBLIC_PROJECT_ID=your_ipfs_project_id
NEXT_PUBLIC_PROJECT_SECRET=your_ipfs_secret
```

**Replace:**
- `0x5FbDB2315678afecb367f032d93F642f64180aa3` with your actual deployed contract address
- `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266` with the deployer account address

### 5. Run Frontend (Terminal 3)
```powershell
cd frontend
npm run dev
```

---

## What Happens During Deployment?

1. **Hardhat compiles** your Solidity contract
2. **Sends a transaction** to the blockchain (Hardhat node)
3. **Creates the contract** on-chain
4. **Returns the address** where it lives

Think of it like:
- **Before deployment:** Contract code exists only in your files
- **After deployment:** Contract lives on the blockchain at a specific address
- **Frontend connects:** Uses that address to talk to the contract

---

## Quick Reference

| Component | Purpose |
|-----------|---------|
| **Hardhat Node** | Local blockchain (like a test server) |
| **Deploy Script** | Puts your contract on the blockchain |
| **Contract Address** | Where your contract lives (needed by frontend) |
| **Owner Address** | Admin account (can add products) |

---

## Troubleshooting

**"Contract not found" error?**
- Make sure you deployed the contract
- Check that `.env.local` has the correct `NEXT_PUBLIC_CONTRACT_ADDRESS`
- Restart the frontend after changing `.env.local`

**"You are not owner" error?**
- Make sure `NEXT_PUBLIC_CONTRACT_OWNER_ADDRESS` matches the deployer account
- Import the deployer account into MetaMask

