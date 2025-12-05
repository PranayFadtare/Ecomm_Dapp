// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

error Ecommerce__NotAdmin();
error Ecommerce__PriceNotMet(uint256 _price);

contract Ecommerce {
    /* State Variables */
    uint256 private productId;
    
    // 1. Define the admin variable
    address public admin;

    constructor() {
        // 2. HARDCODE YOUR ADDRESS HERE (This makes YOU the admin)
        admin = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    }

    /* structs */
    struct ProductStruct {
        uint256 price;
        uint32 quantity;
        string metadata;
    }

    /* Events */
    event productAdded(
        string indexed _category,
        uint256 indexed _timestamp,
        uint256 indexed _productId,
        uint256 _price,
        string _metadata
    );
    event productBought(
        address indexed buyer,
        uint256 indexed timestamp,
        uint256 _productId,
        uint256 price,
        string metadata
    );

    /* Modifiers */
    modifier onlyAdmin() {
        // 3. Check if the caller matches the hardcoded admin
        if (msg.sender != admin) {
            revert Ecommerce__NotAdmin();
        }
        _;
    }

    /* Logic */
    mapping(uint256 => ProductStruct) s_AllProducts;

    function addProduct(
        uint256 _price,
        uint32 _quantity,
        string memory _metadata,
        string memory _category
    ) external onlyAdmin {
        productId++;
        s_AllProducts[productId] = ProductStruct(_price, _quantity, _metadata);
        emit productAdded(
            _category,
            block.timestamp,
            productId,
            _price,
            _metadata
        );
    }

    function getProduct(uint256 _productId)
        external
        view
        returns (ProductStruct memory)
    {
        return s_AllProducts[_productId];
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function updateQuantity(uint32 _quantity, uint256 _productId) external onlyAdmin {
        s_AllProducts[_productId].quantity = _quantity;
    }

    function buyProduct(uint256 _productId) external payable {
        if (msg.value != s_AllProducts[_productId].price) {
            revert Ecommerce__PriceNotMet(msg.value);
        }
        string memory metadata = s_AllProducts[_productId].metadata;
        emit productBought(
            msg.sender,
            block.timestamp,
            _productId,
            msg.value,
            metadata
        );
    }

    function withdraw(address _to) external payable onlyAdmin {
        payable(_to).transfer(address(this).balance);
    }
}