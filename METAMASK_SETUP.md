# MetaMask Setup Guide - Step by Step

## ✅ Complete Setup Instructions

### Step 1: Install MetaMask Extension

1. **Go to Chrome Web Store:**
   - Open Chrome browser
   - Go to: https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn
   - OR search "MetaMask" in Chrome Web Store

2. **Install:**
   - Click "Add to Chrome"
   - Click "Add Extension" in popup
   - Wait for installation

3. **Verify Installation:**
   - Look for 🦊 icon in Chrome toolbar (top right)
   - If not visible, click puzzle icon (🧩) → Pin MetaMask

---

### Step 2: Set Up MetaMask Wallet

1. **Open MetaMask:**
   - Click the 🦊 icon in Chrome toolbar
   - OR click puzzle icon → MetaMask

2. **Create or Import Wallet:**
   - **Option A:** Create new wallet (for testing)
   - **Option B:** Import existing wallet

3. **Complete Setup:**
   - Set password
   - Save seed phrase (write it down!)
   - Confirm seed phrase

4. **Unlock MetaMask:**
   - Enter your password
   - Make sure MetaMask is unlocked (not locked icon)

---

### Step 3: Add Hardhat Network to MetaMask

1. **Open MetaMask:**
   - Click 🦊 icon
   - Make sure it's unlocked

2. **Add Network:**
   - Click network dropdown (top, shows "Ethereum Mainnet" or similar)
   - Scroll down → Click "Add Network"
   - Click "Add Network Manually"

3. **Enter Network Details:**
   ```
   Network Name: Hardhat Local
   RPC URL: http://127.0.0.1:8545
   Chain ID: 31337
   Currency Symbol: ETH
   Block Explorer URL: (leave empty)
   ```

4. **Save:**
   - Click "Save"
   - Network should switch to "Hardhat Local"

---

### Step 4: Import Test Account from Hardhat

1. **Start Hardhat Node:**
   ```powershell
   cd blockchain
   npx hardhat node
   ```

2. **Copy Private Key:**
   - From Hardhat output, find Account #0:
   ```
   Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
   Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```
   - Copy the Private Key (the long hex string)

3. **Import in MetaMask:**
   - Click account icon (top right, circle with account)
   - Click "Import Account"
   - Paste the private key
   - Click "Import"

4. **Verify:**
   - You should see the account with 10,000 ETH
   - Make sure this account is selected (highlighted)

---

### Step 5: Verify Everything is Ready

**Checklist:**
- [ ] MetaMask 🦊 icon visible in Chrome toolbar
- [ ] MetaMask is unlocked (not showing lock icon)
- [ ] Network shows "Hardhat Local" (not Mainnet)
- [ ] Test account imported (shows 10,000 ETH)
- [ ] Hardhat node is running (`npx hardhat node`)
- [ ] Frontend is running (`npm run dev`)

---

### Step 6: Connect Wallet in dApp

1. **Open dApp:**
   - Go to `http://localhost:3000`
   - Make sure page is fully loaded

2. **Refresh Page:**
   - Press `Ctrl + Shift + R` (hard refresh)
   - OR `Ctrl + F5`
   - This ensures MetaMask is detected

3. **Click "Connect Wallet":**
   - Click the "Connect Wallet" button
   - MetaMask popup should appear

4. **Approve Connection:**
   - In MetaMask popup, click "Next"
   - Click "Connect"
   - Wallet should connect!

---

## 🐛 Troubleshooting

### Problem: MetaMask icon not showing

**Solution:**
1. Click puzzle icon (🧩) in Chrome toolbar
2. Find MetaMask
3. Click pin icon (📌) to pin it
4. OR click MetaMask to open it

---

### Problem: "MetaMask not detected" error

**Solutions:**

1. **Refresh the page:**
   - Press `Ctrl + Shift + R` (hard refresh)
   - OR close and reopen the tab

2. **Check MetaMask is enabled:**
   - Go to `chrome://extensions/`
   - Find MetaMask
   - Make sure toggle is ON (blue)

3. **Restart Chrome:**
   - Close all Chrome windows
   - Reopen Chrome
   - Try again

4. **Check MetaMask is unlocked:**
   - Open MetaMask
   - Enter password if locked
   - Make sure it shows your account (not lock icon)

---

### Problem: MetaMask popup doesn't appear

**Solutions:**

1. **Check popup blocker:**
   - Chrome might be blocking popups
   - Click popup icon in address bar → Allow popups

2. **Check MetaMask permissions:**
   - Go to `chrome://extensions/`
   - Find MetaMask
   - Make sure "Allow access to file URLs" is ON (if needed)

3. **Try clicking button again:**
   - Sometimes first click doesn't work
   - Click "Connect Wallet" 2-3 times

---

### Problem: Wrong network error

**Solution:**
1. Open MetaMask
2. Click network dropdown
3. Select "Hardhat Local"
4. If not there, add it (see Step 3 above)
5. Refresh dApp page

---

### Problem: "Connection rejected" error

**Solution:**
1. Click "Connect Wallet" again
2. In MetaMask popup, click "Next" then "Connect"
3. Don't click "Cancel" or "Reject"

---

### Problem: Account shows 0 ETH

**Solution:**
1. Make sure you imported Account #0 from Hardhat
2. Check Hardhat node is running
3. Verify you're on "Hardhat Local" network
4. Account should show 10,000 ETH (from Hardhat)

---

## 🔍 Debug Steps

### Test 1: Check MetaMask is Detected

1. Open browser console (F12)
2. Type this and press Enter:
   ```javascript
   window.ethereum
   ```
3. **If you see an object** → MetaMask is detected ✅
4. **If you see `undefined`** → MetaMask not detected ❌

### Test 2: Check MetaMask is MetaMask

In console, type:
```javascript
window.ethereum.isMetaMask
```
- **If `true`** → MetaMask is working ✅
- **If `false` or `undefined`** → Not MetaMask or not installed ❌

### Test 3: Try Manual Connection

In console, type:
```javascript
window.ethereum.request({ method: 'eth_requestAccounts' })
```
- **If popup appears** → MetaMask works, issue is in dApp code
- **If error** → MetaMask issue, check installation

---

## ✅ Quick Fix Checklist

If wallet still not connecting:

1. [ ] MetaMask installed? (Check 🦊 icon)
2. [ ] MetaMask enabled? (`chrome://extensions/`)
3. [ ] MetaMask unlocked? (Enter password)
4. [ ] Hardhat network added? (Network dropdown)
5. [ ] On Hardhat network? (Should show "Hardhat Local")
6. [ ] Test account imported? (Shows 10,000 ETH)
7. [ ] Hardhat node running? (`npx hardhat node`)
8. [ ] Page refreshed? (Ctrl + Shift + R)
9. [ ] Browser console checked? (F12 → any errors?)

---

## 🚀 Still Not Working?

**Try this:**

1. **Clear browser cache:**
   - Press `Ctrl + Shift + Delete`
   - Select "Cached images and files"
   - Clear data
   - Refresh page

2. **Disable other extensions:**
   - Some extensions conflict with MetaMask
   - Try disabling other wallet extensions
   - Try incognito mode (Ctrl + Shift + N)

3. **Try different browser:**
   - Chrome might have issues
   - Try Firefox or Brave
   - Install MetaMask there too

4. **Reinstall MetaMask:**
   - Go to `chrome://extensions/`
   - Remove MetaMask
   - Reinstall from Chrome Web Store
   - Set up again

---

## 📞 Need More Help?

Provide these details:
1. What happens when you click "Connect Wallet"?
2. Do you see MetaMask popup? (Yes/No)
3. What error message appears? (if any)
4. Browser console errors? (F12 → Console)
5. Screenshot of the issue (if possible)

---

## 💡 Pro Tips

- **Always unlock MetaMask** before connecting
- **Keep Hardhat node running** while using dApp
- **Use same account** from Hardhat node
- **Refresh page** after installing MetaMask
- **Check network** before connecting (should be Hardhat Local)

