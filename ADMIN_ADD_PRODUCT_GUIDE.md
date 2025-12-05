# 📦 How to Add Products as Admin - Complete Guide

## ✅ Prerequisites

Before adding products, make sure you have:

1. **✅ Wallet Connected**
   - Connect MetaMask wallet
   - Must be the **owner/admin** account (the one that deployed the contract)

2. **✅ IPFS Credentials** (for uploading images)
   - `NEXT_PUBLIC_PROJECT_ID` in `.env.local`
   - `NEXT_PUBLIC_PROJECT_SECRET` in `.env.local`
   - Get these from [Infura.io](https://infura.io)

3. **✅ Contract Deployed**
   - Smart contract must be deployed
   - Contract address in `.env.local`

4. **✅ Hardhat Node Running**
   - `npx hardhat node` must be running

---

## 🚀 Step-by-Step: Adding a Product

### Step 1: Access Admin Page

1. **Open your dApp:**
   - Go to `http://localhost:3000`

2. **Connect Wallet:**
   - Click "Connect Wallet" button
   - Approve in MetaMask
   - Make sure you're using the **owner account** (the one that deployed the contract)

3. **Go to Admin Page:**
   - Navigate to `/admin` in your browser
   - OR look for admin link in navigation
   - URL: `http://localhost:3000/admin`

4. **Verify Admin Access:**
   - If you see "You are Not The Owner" → You're using wrong account
   - If you see "Connect Wallet First" → Connect wallet first
   - If you see the admin form → ✅ You're good to go!

---

### Step 2: Fill Out Product Form

The admin page has a form with these fields:

#### **1. Product Title** (Required)
- Enter the product name
- Example: `"iPhone 15 Pro"`, `"Nike Air Max"`, `"Sony Headphones"`

#### **2. Product Description** (Required)
- Describe the product
- Example: `"Latest iPhone with A17 Pro chip, 48MP camera, and titanium design"`

#### **3. Product Image** (Required)
- Click "Select Image"
- Choose an image file (JPG, PNG, etc.)
- Image will upload to IPFS automatically
- Wait for "Product Image Uploaded!" message
- Preview will appear below

#### **4. Product Price** (Required)
- Enter price in **ETH** (not dollars)
- Example: `0.01` = 0.01 ETH
- Example: `0.5` = 0.5 ETH
- **Note:** Use decimal format (e.g., `0.01`, not `1`)

#### **5. Total Quantity** (Required)
- Enter how many units available
- Example: `100`, `50`, `10`
- Must be a whole number

#### **6. Product Category** (Required)
- Select from dropdown:
  - `mobile` - Mobile phones
  - `fashion` - Clothing, accessories
  - `electronics` - Electronic devices
  - `laptop` - Laptops, computers
  - `camera` - Cameras, photography
  - `toys` - Toys, games

---

### Step 3: Create Product

1. **Review all fields:**
   - Make sure everything is filled
   - Check image preview looks correct
   - Verify price is correct

2. **Click "Create Product" button:**
   - Button shows loading state ("Wait...")
   - Two transactions happen:
     a. Upload metadata to IPFS
     b. Add product to blockchain

3. **Approve MetaMask Transactions:**
   - MetaMask popup will appear
   - Click "Confirm" or "Approve"
   - Wait for transaction to complete

4. **Success!**
   - You'll see "Product Successfully Added👌"
   - Form will clear automatically
   - Product is now live on your dApp!

---

## 📋 Complete Example

Here's a complete example of adding a product:

**Product Title:** `iPhone 15 Pro`  
**Description:** `Latest iPhone with A17 Pro chip, 48MP camera, titanium design, and ProMotion display`  
**Image:** Upload `iphone15.jpg`  
**Price:** `0.5` (0.5 ETH)  
**Quantity:** `50`  
**Category:** `mobile`

**Steps:**
1. Fill all fields
2. Upload image (wait for success message)
3. Click "Create Product"
4. Approve MetaMask transaction
5. Wait for "Product Successfully Added👌"
6. Done! ✅

---

## ⚠️ Common Issues & Solutions

### Issue: "You are Not The Owner"

**Problem:** You're using the wrong wallet account.

**Solution:**
1. Check which account deployed the contract
2. That account address should match `NEXT_PUBLIC_CONTRACT_OWNER_ADDRESS` in `.env.local`
3. Switch to that account in MetaMask
4. Refresh the page

---

### Issue: "Some Fields Are Missing"

**Problem:** One or more required fields are empty.

**Solution:**
- Check all fields are filled:
  - ✅ Title
  - ✅ Description
  - ✅ Image (uploaded)
  - ✅ Price
  - ✅ Quantity
  - ✅ Category

---

### Issue: "Error While uploading Image"

**Problem:** IPFS upload failed.

**Solutions:**
1. **Check IPFS credentials:**
   - Verify `NEXT_PUBLIC_PROJECT_ID` is set in `.env.local`
   - Verify `NEXT_PUBLIC_PROJECT_SECRET` is set in `.env.local`
   - Get credentials from [Infura.io](https://infura.io)

2. **Check image file:**
   - Make sure file is not too large
   - Try a smaller image (under 5MB)
   - Use common formats (JPG, PNG)

3. **Check internet connection:**
   - IPFS requires internet connection
   - Make sure you're online

---

### Issue: "Error occured. Please try Again."

**Problem:** Transaction failed.

**Solutions:**
1. **Check Hardhat node is running:**
   ```powershell
   cd blockchain
   npx hardhat node
   ```

2. **Check you have ETH:**
   - Even on local network, you need some ETH for gas
   - Hardhat accounts start with 10,000 ETH, so this shouldn't be an issue

3. **Check network:**
   - Make sure you're on "Hardhat Local" network in MetaMask
   - Chain ID should be 31337

4. **Check contract is deployed:**
   - Verify contract address in `.env.local` is correct
   - Make sure contract was deployed to localhost

---

### Issue: Image doesn't show after upload

**Problem:** IPFS URL might be incorrect.

**Solution:**
1. Check `IPFS_URL` in `constants/index.js`
2. Default is: `https://crowdfunding1.infura-ipfs.io/ipfs/`
3. Make sure this matches your Infura IPFS gateway

---

## 🔧 Setting Up IPFS (If Not Done)

### Step 1: Create Infura Account

1. Go to [Infura.io](https://infura.io)
2. Sign up / Log in
3. Create a new project

### Step 2: Enable IPFS

1. In your Infura project
2. Go to "IPFS" section
3. Enable IPFS service
4. Copy your **Project ID** and **Project Secret**

### Step 3: Update `.env.local`

Add to `frontend/.env.local`:

```env
NEXT_PUBLIC_PROJECT_ID=your_infura_project_id_here
NEXT_PUBLIC_PROJECT_SECRET=your_infura_project_secret_here
```

### Step 4: Restart Frontend

```powershell
# Stop frontend (Ctrl+C)
# Restart it
npm run dev
```

---

## 📝 Product Categories Available

Your dApp supports these categories:

| Category | Value | Description |
|----------|-------|-------------|
| Mobile | `mobile` | Mobile phones, smartphones |
| Fashion | `fashion` | Clothing, accessories, shoes |
| Electronics | `electronics` | Electronic devices, gadgets |
| Laptop | `laptop` | Laptops, computers, tablets |
| Camera | `camera` | Cameras, photography equipment |
| Toys | `toys` | Toys, games, collectibles |

---

## ✅ Checklist Before Adding Product

- [ ] Wallet connected
- [ ] Using owner/admin account
- [ ] Hardhat node running
- [ ] Contract deployed
- [ ] IPFS credentials set in `.env.local`
- [ ] Frontend restarted after adding IPFS credentials
- [ ] On correct network (Hardhat Local)
- [ ] All form fields ready

---

## 🎯 Quick Reference

**Admin Page URL:** `http://localhost:3000/admin`

**Required Fields:**
1. Product Title
2. Product Description
3. Product Image (upload to IPFS)
4. Product Price (in ETH)
5. Total Quantity
6. Product Category

**Process:**
1. Fill form → 2. Upload image → 3. Click "Create Product" → 4. Approve transaction → 5. Done!

---

## 💡 Tips

1. **Price in ETH:** Remember prices are in ETH, not dollars
   - 0.01 ETH ≈ $20-30 (depending on ETH price)
   - Use small values for testing (0.001, 0.01, 0.1)

2. **Image Size:** Keep images reasonable size
   - Recommended: Under 2MB
   - Format: JPG or PNG

3. **Quantity:** Start with small quantities for testing
   - Example: 10, 20, 50 units

4. **Categories:** Choose the most appropriate category
   - Products appear in category pages
   - Helps users find products

5. **Test First:** Add one product first to test
   - Make sure everything works
   - Then add more products

---

## 🚨 Important Notes

- **Only the owner account** can add products
- **IPFS is required** for image uploads
- **Transactions cost gas** (even on local network)
- **Products are permanent** once added (can't delete, only update quantity)
- **Refresh homepage** to see new products

---

## 📞 Need Help?

If you encounter issues:
1. Check browser console (F12) for errors
2. Check MetaMask for transaction errors
3. Verify all prerequisites are met
4. Check Hardhat node is running
5. Verify IPFS credentials are correct

---

**Happy Adding Products! 🎉**

