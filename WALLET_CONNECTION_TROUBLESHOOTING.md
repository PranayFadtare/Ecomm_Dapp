# Wallet Connection Troubleshooting Guide

## ✅ What I Fixed

1. **Better error handling** - More specific error messages
2. **Improved balance display** - Handles edge cases better
3. **Event listener cleanup** - Prevents memory leaks
4. **Loading state** - Shows "Connecting..." while processing
5. **Success notification** - Shows toast when connected successfully

---

## 🔍 Step-by-Step Debugging

### Step 1: Check MetaMask Installation

1. Open your browser
2. Look for the MetaMask extension icon (🦊) in the toolbar
3. If not installed:
   - Go to [metamask.io](https://metamask.io)
   - Install the extension
   - Create a new wallet or import existing one

### Step 2: Check Hardhat Node is Running

Open PowerShell and check:
```powershell
# Make sure Hardhat node is running
cd blockchain
npx hardhat node
```

You should see:
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
```

**Keep this terminal open!**

### Step 3: Add Hardhat Network to MetaMask

1. Open MetaMask
2. Click the network dropdown (top center)
3. Click "Add Network" → "Add Network Manually"
4. Enter these details:
   - **Network Name:** `Hardhat Local`
   - **RPC URL:** `http://127.0.0.1:8545`
   - **Chain ID:** `31337`
   - **Currency Symbol:** `ETH`
   - **Block Explorer URL:** (leave empty)
5. Click "Save"

### Step 4: Import Test Account

1. From your Hardhat node output, copy a private key:
   ```
   Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
   Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

2. In MetaMask:
   - Click the account icon (top right)
   - Click "Import Account"
   - Paste the private key
   - Click "Import"

### Step 5: Switch to Hardhat Network

1. In MetaMask, click the network dropdown
2. Select "Hardhat Local"
3. Make sure it shows "Hardhat Local" at the top

### Step 6: Connect Wallet in dApp

1. Open your dApp in browser (`http://localhost:3000`)
2. Click "Connect Wallet" button
3. MetaMask popup should appear
4. Click "Connect" or "Next" → "Connect"
5. Approve the connection

---

## 🐛 Common Errors & Solutions

### Error: "MetaMask is not installed"
**Solution:**
- Install MetaMask extension
- Refresh the page
- Make sure MetaMask is enabled in your browser

### Error: "Connection rejected"
**Solution:**
- Click "Connect Wallet" again
- In MetaMask popup, click "Connect" (don't click "Cancel")
- Check if MetaMask is unlocked (enter password if needed)

### Error: "Connection request already pending"
**Solution:**
- Open MetaMask
- Check for pending connection requests
- Approve or reject the pending request
- Try connecting again

### Error: "Could not switch network"
**Solution:**
- Manually switch to "Hardhat Local" in MetaMask
- Make sure Hardhat node is running
- Check RPC URL is correct: `http://127.0.0.1:8545`

### Error: "Invalid contract address"
**Solution:**
- Deploy your contract first:
  ```powershell
  cd blockchain
  npx hardhat run scripts/deploy.js --network localhost
  ```
- Update `.env.local` with the real contract address

### Wallet connects but shows "0.0 ETH"
**Solution:**
- This is normal if you haven't sent ETH to that account
- Hardhat test accounts start with 10,000 ETH
- Make sure you imported the correct account from Hardhat node

---

## 🔧 Browser Console Debugging

1. Open browser console (F12 or Right-click → Inspect → Console)
2. Look for error messages
3. Common errors to check:
   - `window.ethereum is undefined` → MetaMask not installed
   - `Network error` → Hardhat node not running
   - `Invalid address` → Contract not deployed

---

## ✅ Checklist

Before connecting wallet, make sure:

- [ ] MetaMask is installed
- [ ] MetaMask is unlocked
- [ ] Hardhat node is running (`npx hardhat node`)
- [ ] Hardhat network is added to MetaMask
- [ ] Switched to "Hardhat Local" network in MetaMask
- [ ] Test account is imported in MetaMask
- [ ] Contract is deployed (if buying products)
- [ ] `.env.local` has correct contract address

---

## 🚀 Quick Test

1. **Open browser console** (F12)
2. **Type this command:**
   ```javascript
   window.ethereum.request({ method: 'eth_requestAccounts' })
   ```
3. **If it works:**
   - MetaMask popup should appear
   - You can connect
   - The issue is in the dApp code

4. **If it fails:**
   - MetaMask is not installed or not working
   - Check MetaMask extension status

---

## 📝 Still Not Working?

1. **Clear browser cache:**
   - Ctrl + Shift + Delete
   - Clear cache and cookies
   - Refresh page

2. **Restart everything:**
   - Stop Hardhat node (Ctrl+C)
   - Restart Hardhat node
   - Restart frontend (`npm run dev`)
   - Refresh browser

3. **Check MetaMask logs:**
   - Open MetaMask
   - Settings → Advanced → Show Advanced Gas Controls
   - Check for any error messages

4. **Try different browser:**
   - Sometimes browser extensions conflict
   - Try Chrome, Firefox, or Brave

---

## 💡 Pro Tips

- **Always keep Hardhat node running** while using the dApp
- **Use the same account** that you imported from Hardhat
- **Check network** before connecting (should be "Hardhat Local")
- **Clear localStorage** if stuck: `localStorage.clear()` in console

---

## 🆘 Need More Help?

If still not working, provide:
1. Browser console errors (F12 → Console)
2. MetaMask error messages
3. Which step fails (installation, connection, network switch, etc.)
4. Screenshot of the error (if possible)

