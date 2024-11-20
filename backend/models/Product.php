<?php

class Product {
    private const TABLE = 'products';

    private int $product_id;
    private int $category_id;
    private int $sub_category_id;
    private int $brand_id;
    private string $product_name;
    private ?string $description;
    private float $price;
    private int $stock_quantity;
    private ?string $image_url;
    private string $created_at;

    // Constructor
//    public function __construct(int $category_id, string $product_name, float $price, int $stock_quantity, ?string $description = null, ?string $image_url = null) {
//        $this->category_id = $category_id;
//        $this->product_name = $product_name;
//        $this->price = $price;
//        $this->stock_quantity = $stock_quantity;
//        $this->description = $description;
//        $this->image_url = $image_url;
//    }

    public function __construct(array $data) {
        $this->product_id = $data['product_id'];
        $this->category_id = $data['category_id'];
        $this->sub_category_id = $data['sub_category_id'];
        $this->brand_id = $data['brand_id'];
        $this->product_name = $data['product_name'];
        $this->description = $data['description'] ?? null;
        $this->price = $data['price'];
        $this->stock_quantity = $data['stock_quantity'];
        $this->image_url = $data['image_url'] ?? null;
        $this->created_at = $data['created_at'];
    }

    public static function getTableName(): string {
        return self::TABLE;
    }

    public function getProductDetails(): array {
        return [
            'product_id' => $this->getProductId(),
            'category_id' => $this->getCategoryId(),
            'sub_category_id' => $this->getSubCategoryId(),
            'brand_id' => $this->getBrandId(),
            'product_name' => $this->getProductName(),
            'description' => $this->getDescription(),
            'price' => $this->getPrice(),
            'stock_quantity' => $this->getStockQuantity(),
            'image_url' => $this->getImageUrl(),
            'created_at' => $this->getCreatedAt(),
        ];
    }

    // Getters and Setters
    public function getProductId(): int {
        return $this->product_id;
    }

    public function getCategoryId(): int {
        return $this->category_id;
    }

    public function setCategoryId(int $category_id): void {
        $this->category_id = $category_id;
    }

    public function getBrandId(): int {
        return $this->brand_id;
    }

    public function setBrandId(int $brand_id): void {
        $this->brand_id = $brand_id;
    }

    public function getSubCategoryId(): int {
        return $this->sub_category_id;
    }

    public function setSubCategoryId(int $sub_category_id): void {
        $this->sub_category_id = $sub_category_id;
    }

    public function getProductName(): string {
        return $this->product_name;
    }

    public function setProductName(string $product_name): void {
        $this->product_name = $product_name;
    }

    public function getDescription(): ?string {
        return $this->description;
    }

    public function setDescription(?string $description): void {
        $this->description = $description;
    }

    public function getPrice(): float {
        return $this->price;
    }

    public function setPrice(float $price): void {
        $this->price = $price;
    }

    public function getStockQuantity(): int {
        return $this->stock_quantity;
    }

    public function setStockQuantity(int $stock_quantity): void {
        $this->stock_quantity = $stock_quantity;
    }

    public function getImageUrl(): ?string {
        return $this->image_url;
    }

    public function setImageUrl(?string $image_url): void {
        $this->image_url = $image_url;
    }

    public function getCreatedAt(): string {
        return $this->created_at;
    }
}

?>
