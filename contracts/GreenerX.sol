// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GreenX {
    address public owner;

    struct Product {
        uint256 id;
        string name;
        uint256 price;
        address seller;
        bool isAvailable;
    }

    mapping(uint256 => Product) public products;
    mapping(uint256 => address) public productBuyers;
    uint256 public productCount;

    event ProductAdded(uint256 productId, string name, uint256 price, address seller);
    event ProductBought(uint256 productId, address buyer);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Add a product to the marketplace
    function addProduct(string memory name, uint256 price) external onlyOwner {
        require(price > 0, "Price should be greater than 0");
        productCount++;
        products[productCount] = Product(productCount, name, price, msg.sender, true);
        emit ProductAdded(productCount, name, price, msg.sender);
    }

    // Buy a product by sending Ether equal to its price
    function buyProduct(uint256 productId) external payable {
        Product memory product = products[productId];
        require(product.isAvailable, "Product not available");
        require(msg.value == product.price, "Incorrect payment amount");
        require(product.seller != msg.sender, "Seller cannot buy their own product");

        // Mark the product as unavailable
        products[productId].isAvailable = false;

        // Transfer funds to the seller
        payable(product.seller).transfer(msg.value);

        // Store the buyer information
        productBuyers[productId] = msg.sender;

        emit ProductBought(productId, msg.sender);
    }

    // Allow the owner to withdraw funds (if any)
    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
