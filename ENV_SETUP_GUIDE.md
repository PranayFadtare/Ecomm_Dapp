# Environment Variables Setup Guide

## Your Current `.env.local` File

```env
NEXT_PUBLIC_POLYGON_RPC_URL=http://127.0.0.1:8545
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddress
NEXT_PUBLIC_CONTRACT_OWNER_ADDRESS=0xDeployerAddress
NEXT_PUBLIC_PROJECT_ID=your_infura_project_id
NEXT_PUBLIC_PROJECT_SECRET=your_infura_project_secret
```

---

## 📋 What Each Variable Does

### 1. `NEXT_PUBLIC_POLYGON_RPC_URL`
**Purpose:** The blockchain network URL your app connects to

**Current Value:** `http://127.0.0.1:8545` ✅ (This is correct for local Hardhat)

**What it's used for:**
- Connecting to the blockchain to read product data
- Querying smart contract events
- Getting product information

**For different networks:**
- **Local Hardhat:** `http://127.0.0.1:8545` (what you have)
- **Polygon Mumbai Testnet:** `https://rpc-mumbai.maticvigil.com/`
- **Polygon Mainnet:** `https://polygon-rpc.com`

---

### 2. `NEXT_PUBLIC_CONTRACT_ADDRESS`
**Purpose:** The address where your smart contract is deployed

**Current Value:** `0xYourDeployedContractAddress` ❌ (Placeholder - needs to be replaced!)

**What it's used for:**
- Finding your deployed contract on the blockchain
- All contract interactions (buying, adding products, etc.)

**How to get it:**
1. Deploy your contract:
   ```powershell
   cd blockchain
   npx hardhat run scripts/deploy.js --network localhost
   ```
2. Copy the address from the output:
   ```
   contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
   ```
3. Replace `0xYourDeployedContractAddress` with the real address

**Example:** `NEXT_PUBLIC_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3`

---

### 3. `NEXT_PUBLIC_CONTRACT_OWNER_ADDRESS`
**Purpose:** The wallet address of the contract owner (admin)

**Current Value:** `0xDeployerAddress` ❌ (Placeholder - needs to be replaced!)

**What it's used for:**
- Determining if a user is the admin
- Allowing admin functions (add products, update quantities)

**How to get it:**
1. Look at your Hardhat node output (Terminal 1):
   ```
   Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
   ```
2. If you deploy with Account #0, that's your owner address
3. Replace `0xDeployerAddress` with Account #0's address

**Example:** `NEXT_PUBLIC_CONTRACT_OWNER_ADDRESS=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`

---

### 4. `NEXT_PUBLIC_PROJECT_ID`
**Purpose:** Infura IPFS Project ID for storing product images/metadata

**Current Value:** `your_infura_project_id` ❌ (Placeholder - optional for now)

**What it's used for:**
- Uploading product images to IPFS
- Storing product metadata (title, description, image URL)
- Only needed if you're adding products as admin

**How to get it (Optional - only if adding products):**
1. Go to [Infura.io](https://infura.io)
2. Sign up / Log in
3. Create a new project
4. Select "IPFS" as the service
5. Copy the Project ID

**Note:** You can skip this for now if you're just testing. The app will work for browsing/buying without it.

---

### 5. `NEXT_PUBLIC_PROJECT_SECRET`
**Purpose:** Infura IPFS Project Secret for authentication

**Current Value:** `your_infura_project_secret` ❌ (Placeholder - optional for now)

**What it's used for:**
- Authenticating with Infura IPFS
- Required along with PROJECT_ID to upload files
- Only needed if you're adding products as admin

**How to get it (Optional - only if adding products):**
1. Same Infura project from above
2. Copy the Project Secret
3. Keep it secure (don't commit to GitHub!)

**Note:** You can skip this for now if you're just testing.

---

## ✅ Complete Example `.env.local` File

After deploying your contract, your file should look like:

```env
# Blockchain Network (Local Hardhat)
NEXT_PUBLIC_POLYGON_RPC_URL=http://127.0.0.1:8545

# Smart Contract Address (from deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3

# Contract Owner/Admin Address (Account #0 from Hardhat node)
NEXT_PUBLIC_CONTRACT_OWNER_ADDRESS=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

# IPFS Credentials (Optional - only needed for adding products)
NEXT_PUBLIC_PROJECT_ID=your_actual_infura_project_id
NEXT_PUBLIC_PROJECT_SECRET=your_actual_infura_project_secret
```

---

## 🚀 Quick Setup Steps

### Step 1: Deploy Contract
```powershell
cd blockchain
npx hardhat run scripts/deploy.js --network localhost
```
Copy the contract address.

### Step 2: Get Owner Address
From Hardhat node output, copy Account #0 address.

### Step 3: Update `.env.local`
Replace the placeholder values with real addresses.

### Step 4: Restart Frontend
```powershell
cd frontend
npm run dev
```

---

## ⚠️ Important Notes

1. **All variables start with `NEXT_PUBLIC_`** - This makes them available in the browser
2. **Never commit `.env.local` to Git** - It contains sensitive information
3. **IPFS credentials are optional** - Only needed for admin to add products
4. **Contract address must be valid** - Must be a real deployed contract address
5. **Owner address must match deployer** - The account that deployed the contract

---

## 🔍 How to Verify Your Setup

After updating `.env.local`:

1. **Check contract address:**
   - Should be 42 characters (0x + 40 hex chars)
   - Example: `0x5FbDB2315678afecb367f032d93F642f64180aa3`

2. **Check owner address:**
   - Should be 42 characters
   - Should match Account #0 from Hardhat node

3. **Restart frontend:**
   - Changes to `.env.local` require restarting the Next.js server

---

## 📝 Summary

| Variable | Required? | Current Status | Action Needed |
|----------|-----------|----------------|---------------|
| `NEXT_PUBLIC_POLYGON_RPC_URL` | ✅ Yes | ✅ Correct | None |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | ✅ Yes | ❌ Placeholder | Deploy contract & update |
| `NEXT_PUBLIC_CONTRACT_OWNER_ADDRESS` | ✅ Yes | ❌ Placeholder | Copy Account #0 address |
| `NEXT_PUBLIC_PROJECT_ID` | ⚠️ Optional | ❌ Placeholder | Get from Infura (if adding products) |
| `NEXT_PUBLIC_PROJECT_SECRET` | ⚠️ Optional | ❌ Placeholder | Get from Infura (if adding products) |

---

## 🎯 Next Steps

1. ✅ Deploy your contract to get `NEXT_PUBLIC_CONTRACT_ADDRESS`
2. ✅ Copy Account #0 address for `NEXT_PUBLIC_CONTRACT_OWNER_ADDRESS`
3. ⚠️ Get Infura credentials (optional, only if you want to add products)
4. ✅ Update `.env.local` with real values
5. ✅ Restart frontend server

